import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { CarImage } from './CarImage';

@Entity({ schema: 'car-agency', name: 'cars' }) 
export class Car {
  @PrimaryColumn()
  car_id!: string;

  @Column()
  company!: string;

  @Column()
  model!: string;

  @Column()
  year!: number;

  @Column()
  hand!: number;

  @Column()
  kilometers!: number;

  @Column('numeric', { precision: 10, scale: 2 })
  price!: number;

  @Column({ nullable: true, type: 'numeric' })
  old_price?: number | null;


  @OneToMany(() => CarImage, (carImage) => carImage.car, { cascade: true })
  images!: CarImage[];
}
