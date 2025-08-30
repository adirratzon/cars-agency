import React, { useState } from 'react';
import './CarCard.css';

type CarImage = {
    id: number;
    data: string;
};

type Car = {
    car_id: string;
    company: string;
    model: string;
    year: number;
    hand: number;
    kilometers: number;
    price: number;
    oldPrice?: number | null;
    images: CarImage[];
};

interface CarCardProps {
  car: Car;
  onContactClick: (car: Car) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onContactClick }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const oldPrice = car.oldPrice ?? (car as any).old_price ? Number((car as any).old_price) : null;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
    };

    return (
        <div className="car-card">
            <div className="car-header">
                <h2>
                    <span style={{ fontWeight: 'bold', fontSize: '1.3em' }}>{car.company} </span>
                    <span style={{ fontWeight: 'normal', fontSize: '1em' }}>{car.model}</span>
                </h2>
                <span className="car-year">שנת {car.year}</span>
            </div>

            {car.images && car.images.length > 0 && (
                <div className="image-gallery">
                    <button className="gallery-button" onClick={prevImage}>◀</button>
                    <img
                        src={`data:image/jpeg;base64,${car.images[currentImageIndex].data}`}
                        alt={`${car.company} ${car.model}`}
                        draggable={false}
                    />
                    <button className="gallery-button" onClick={nextImage}>▶</button>
                </div>
            )}

            <div className="car-info">
                <p><strong>יד:</strong> {car.hand}</p>
                <p><strong>ק״מ:</strong> {car.kilometers.toLocaleString()}</p>
            </div>

            <div className="car-price">
                {oldPrice !== null && (
                    <span className="old-price">
                        ₪{Math.round(oldPrice).toLocaleString()}
                    </span>
                )}
                <span className="new-price">
                    ₪{Math.round(car.price).toLocaleString()}
                </span>
            </div>

      <button className="contact-button" onClick={() => onContactClick(car)}>
        יצירת קשר
      </button>
        </div>
    );
};

export default CarCard;
