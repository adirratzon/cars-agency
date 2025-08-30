import React, { useState } from 'react';
import './AdminAddCar.css';

interface AdminAddCarProps {
  onAddSuccess: () => void;
}

const AdminAddCar: React.FC<AdminAddCarProps> = ({ onAddSuccess }) => {
  const [formData, setFormData] = useState({
    car_id: '',
    company: '',
    model: '',
    year: '',
    hand: '',
    kilometers: '',
    price: '',
    oldPrice: '',
  });

  const [images, setImages] = useState<FileList | null>(null);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
        console.log("key = ", key , "\nvalue = ", value)
      form.append(key, value);
    });

    if (images) {
      Array.from(images).forEach((file, index) => {
        form.append('images', file);
      });
    }

    try {
      const res = await fetch('http://localhost:4000/api/cars', {
        method: 'POST',
        body: form,
      });

      if (res.ok) {
        setMessage('✅ רכב נוסף בהצלחה');
        setFormData({
          car_id: '',
          company: '',
          model: '',
          year: '',
          hand: '',
          kilometers: '',
          price: '',
          oldPrice: '',
        });
        setImages(null);
        onAddSuccess();
      } else {
        setMessage('❌ שגיאה בהוספת רכב');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ שגיאה בשרת');
    }
  };

  return (
    <div className="admin-add-car">
      <h2>הוספת רכב חדש</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="car_id" placeholder="מספר רכב" value={formData.car_id} onChange={handleChange} required />
        <input type="text" name="company" placeholder="יצרן" value={formData.company} onChange={handleChange} required />
        <input type="text" name="model" placeholder="דגם" value={formData.model} onChange={handleChange} required />
        <input type="number" name="year" placeholder="שנה" value={formData.year} onChange={handleChange} required />
        <input type="number" name="hand" placeholder="יד" value={formData.hand} onChange={handleChange} required />
        <input type="number" name="kilometers" placeholder="קילומטרז׳" value={formData.kilometers} onChange={handleChange} required />
        <input type="number" name="price" placeholder="מחיר" value={formData.price} onChange={handleChange} required />
        <input type="number" name="oldPrice" placeholder="מחיר קודם (לא חובה)" value={formData.oldPrice} onChange={handleChange} />
        <input type="file" multiple accept="image/*" onChange={handleImageChange} />

        <button type="submit">📤 הוסף רכב</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AdminAddCar;
