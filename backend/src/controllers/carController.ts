import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Car } from '../entities/Car';
import { CarImage } from '../entities/CarImage';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';




// CREATE Car
export const createCar = async (req: Request, res: Response) => {
  try {


    const carRepo = AppDataSource.getRepository(Car);

    const { car_id, company, model, year, hand, kilometers, price, oldPrice } = req.body;

    const car = new Car();
    car.car_id = car_id;
    car.company = company;
    car.model = model;
    car.year = Number(year);
    car.hand = Number(hand);
    car.kilometers = Number(kilometers);
    car.price = Number(price);
    car.old_price = oldPrice ? Number(oldPrice) : null;

    // תמונות
    if (req.files) {
      const files = req.files as Express.Multer.File[];
      car.images = files.map(file => {
        const img = new CarImage();
        img.data = file.buffer;
        img.car = car;
        return img;
      });
    }

    await carRepo.save(car);
    res.json({ message: 'Car created', car });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// GET ALL Cars
// GET ALL Cars
export const getAllCars = async (req: Request, res: Response) => {
  try {
    const carRepo = AppDataSource.getRepository(Car);
    const cars = await carRepo.find({ relations: ['images'] });

    // ממירים את ה-Buffer ל-base64
    const carsWithImages = cars.map(car => ({
      ...car,
      images: car.images.map(img => ({
        id: img.id,
        data: img.data.toString('base64') // <-- המרה ל-base64
      }))
    }));

    res.json(carsWithImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};


// DELETE Car
export const deleteCar = async (req: Request, res: Response) => {
  try {

    const car_id = req.params.car_id;
    const carRepo = AppDataSource.getRepository(Car);
    const car = await carRepo.findOne({ where: { car_id } });

    if (!car) return res.status(404).json({ message: 'Car not found' });

    await carRepo.remove(car);
    res.json({ message: `Car ${car_id} deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// UPDATE Car
export const updateCar = async (req: Request, res: Response) => {
  try {

    const car_id = req.params.car_id;
    const carRepo = AppDataSource.getRepository(Car);
    const car = await carRepo.findOne({ where: { car_id }, relations: ['images'] });

    if (!car) return res.status(404).json({ message: 'Car not found' });

    const { company, model, year, hand, kilometers, price, oldPrice } = req.body;

    car.company = company ?? car.company;
    car.model = model ?? car.model;
    car.year = year ? Number(year) : car.year;
    car.hand = hand ? Number(hand) : car.hand;
    car.kilometers = kilometers ? Number(kilometers) : car.kilometers;
    car.price = price ? Number(price) : car.price;
    car.old_price = oldPrice ? Number(oldPrice) : car.old_price;

    if (req.files) {
      const files = req.files as Express.Multer.File[];
      const newImages = files.map(file => {
        const img = new CarImage();
        img.data = file.buffer;
        img.car = car;
        return img;
      });
      car.images.push(...newImages);
    }

    await carRepo.save(car);
    res.json({ message: `Car ${car_id} updated`, car });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};
