import React, { useEffect, useState } from 'react';
import './home.css';
import Navbar from '../components/Navbar/Navbar.tsx';
import CarCard from '../components/CarCard/CarCard.tsx'; // תעדכן את הנתיב לפי מיקום הקובץ שלך

interface CarImage {
  id: number;
  data: string;
}

interface Car {
  car_id: string;
  company: string;
  model: string;
  year: number;
  hand: number;
  kilometers: number;
  price: number;
  images: CarImage[];
}

const Home: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactCar, setContactCar] = useState<Car | null>(null); // 👈

  useEffect(() => {
    fetch('http://localhost:4000/api/cars')
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch cars:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <Navbar />
      <h1>קטלוג רכבים</h1>
      {loading ? (
        <p>Loading cars...</p>
      ) : (
        cars.length > 0 ? (
          <div className="car-grid">
            {cars.map(car => (
              <CarCard
                key={car.car_id}
                car={car}
                onContactClick={(car) => setContactCar(car)}
              />
            ))}
          </div>
        ) : (
          <p>No cars available</p>
        )
      )}


      {contactCar && (
        <div className="popup-overlay" onClick={() => setContactCar(null)}>
          <div className="contact-popup" onClick={e => e.stopPropagation()}>
            <h3>צור קשר לגבי הרכב</h3>
            <p>📞 <strong>052-6630307</strong></p>
            <a
              href={`https://wa.me/972526630307?text=שלום, ראיתי את הרכב ${contactCar.company} ${contactCar.model} באתר ואני מעוניין בפרטים נוספים.`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link"
            >
              💬 שלח הודעה בוואטסאפ
            </a>
            <button onClick={() => setContactCar(null)} className="close-popup">סגור</button>
          </div>
        </div>
      )}
    </div>
  );
};


export default Home;
