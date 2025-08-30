import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Car } from './Car';

@Entity({ schema: 'car-agency', name: 'car_images' })
export class CarImage {
  @PrimaryGeneratedColumn()
  id!: number;  // <-- הוספתי !

  @Column('bytea')
  data!: Buffer;  // <-- הוספתי !

  @ManyToOne(() => Car, (car) => car.images)
  car!: Car;  // <-- הוספתי !
}
