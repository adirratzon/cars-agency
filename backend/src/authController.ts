import { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { User } from './entities/User';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { email } });

  if (!user) return res.status(401).json({ message: 'משתמש לא קיים' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ message: 'סיסמה שגויה' });

  // מחזירים רק מידע נחוץ, לא password
  res.json({ email: user.email, role: user.role });
};
