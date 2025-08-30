import express from 'express';
import cors from 'cors';
import path from 'path';
import carRoutes from './routes/carRoutes';
import authRoutes from './routes/adminCarsRoutes';
import { AppDataSource } from './data-source';
import 'reflect-metadata';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(cors());
app.use(express.json());

// --- API ROUTES ---
app.use('/api', carRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);

// --- STATIC FRONTEND ---
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, 'build')));

// כל route אחר שלא מתחיל ב-/api יחזיר את React index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname1, 'build', 'index.html'));
});

// --- DB + SERVER START ---
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

// import express from 'express';
// import cors from 'cors';
// import carRoutes from './routes/carRoutes';
// import authRoutes from './routes/adminCarsRoutes'
// import { AppDataSource } from './data-source';
// import 'reflect-metadata';
// import userRoutes from './routes/userRoutes';

// const app = express();
// app.use(cors());
// app.use(express.json());

// AppDataSource.initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!');

//     app.use('/api', carRoutes);
//     app.use('/api', authRoutes);
//     app.use('/api', userRoutes);

//     app.listen(4000, () => {
//       console.log('Server running on http://localhost:4000');
//     });
//   })
//   .catch((err) => {
//     console.error('Error during Data Source initialization', err);
//   });
