import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Car } from './entities/Car';
import { CarImage } from './entities/CarImage';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'adir2004',
  database: 'postgres', // שם מסד הנתונים שלך
  synchronize: true, // ב-development יכול לעזור ליצור טבלאות אוטומטית
  logging: false,
  entities: [Car, CarImage, User],
  schema: 'car-agency',
});
