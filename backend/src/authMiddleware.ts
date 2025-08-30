import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from './data-source';
import { User } from './entities/User';

export const adminOnly = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.headers['x-user-email'] as string; // שולחים רק email
  if (!email) return res.status(401).json({ message: 'לא מחובר' });

  const user = await AppDataSource.getRepository(User).findOne({ where: { email } });
  if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Unauthorized: Admin only' });

  next();
};
