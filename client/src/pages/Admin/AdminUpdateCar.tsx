import React, { useState, useEffect } from 'react';
import './AdminUpdateCar.css';

type Car = {
  car_id: string;
  company: string;
  model: string;
  year: number;
  hand: number;
  kilometers: number;
  price: number;
  oldPrice?: number | null;
  // אפשר להוסיף כאן שדות נוספים במידת הצורך
};

interface AdminUpdateCarProps {
  car: Car;
  onUpdateSuccess: () => void;
}

const AdminUpdateCar: React.FC<AdminUpdateCarProps> = ({ car, onUpdateSuccess }) => {
  const email = localStorage.getItem('userEmail');
    console.log("car = ",car)
    console.log("car.oldPrice = ", car.oldPrice)
    console.log("oldPrice: car.oldPrice ? car.oldPrice.toString() : '' = ", car.oldPrice ? car.oldPrice.toString() : '')

  const [formData, setFormData] = useState({
    company: '',
    model: '',
    year: '',
    hand: '',
    kilometers: '',
    price: '',
    oldPrice: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    // לאתחל את הטופס עם נתוני הרכב שנשלחו
    setFormData({
      company: car.company,
      model: car.model,
      year: car.year.toString(),
      hand: car.hand.toString(),
      kilometers: car.kilometers.toString(),
      price: car.price.toString(),
      oldPrice: (car as any).old_price ? (car as any).old_price.toString() : '',
    });
  }, [car]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:4000/api/cars/${car.car_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': email || ''
        },
        body: JSON.stringify({
          company: formData.company,
          model: formData.model,
          year: Number(formData.year),
          hand: Number(formData.hand),
          kilometers: Number(formData.kilometers),
          price: Number(formData.price),
          oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
        }),
      });

      if (res.ok) {
        setMessage('✅ הרכב עודכן בהצלחה');
        onUpdateSuccess();
      } else {
        setMessage('❌ שגיאה בעדכון הרכב');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ שגיאה בשרת');
    }
  };

  return (
    <div className="admin-update-car">
      <h3>עדכון רכב: {car.company} {car.model}</h3>
      <form onSubmit={handleSubmit} className="update-car-form">
        <input
          type="text"
          name="company"
          placeholder="יצרן"
          value={formData.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="model"
          placeholder="דגם"
          value={formData.model}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="שנה"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="hand"
          placeholder="יד"
          value={formData.hand}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="kilometers"
          placeholder="קילומטרז׳"
          value={formData.kilometers}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="מחיר"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="oldPrice"
          placeholder="מחיר קודם (לא חובה)"
          value={formData.oldPrice}
          onChange={handleChange}
        />

        <button type="submit">💾 שמור עדכון</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AdminUpdateCar;
