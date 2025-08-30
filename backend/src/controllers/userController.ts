import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const role = 'user';

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'חסרים פרטים' });
  }

  try {
    const userRepo = AppDataSource.getRepository(User);

    // בדיקה אם המשתמש כבר קיים
    const existingUser = await userRepo.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'משתמש כבר קיים' });

    const newUser = new User();
    newUser.email = email;
    newUser.password = password; // hash יתבצע אוטומטית לפי @BeforeInsert
    newUser.role = role;

    await userRepo.save(newUser);

    res.status(201).json({ message: 'משתמש נוצר בהצלחה' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'שגיאה בשרת' });
  }
};
