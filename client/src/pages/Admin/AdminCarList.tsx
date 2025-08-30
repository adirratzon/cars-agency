import React, { useEffect, useState } from 'react';
import AdminUpdateCar from './AdminUpdateCar.tsx';
import AdminAddCar from './AdminAddCar.tsx';
import './AdminCarList.css';

type Car = {
  car_id: string;
  company: string;
  model: string;
  year: number;
  hand: number;
  kilometers: number;
  price: number;
  oldPrice?: number | null;
  images: { id: number; data: string }[];
};

const AdminCarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [carToEdit, setCarToEdit] = useState<Car | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

const fetchCars = async () => {
  try {
    const email = localStorage.getItem('userEmail');
    const res = await fetch('http://localhost:4000/api/cars', {
      headers: {
        'x-user-email': email || ''
      }
    });
    const data = await res.json();

    if (!Array.isArray(data)) {
      setMessage(data.message || '❌ שגיאה');
      setCars([]);
      return;
    }

    setCars(data);
  } catch (err) {
    console.error('שגיאה בטעינת רכבים:', err);
    setMessage('❌ שגיאה בטעינת רכבים');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (car_id: string) => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק את הרכב הזה?')) return;

    try {
      const res = await fetch(`http://localhost:4000/api/cars/${car_id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage('✅ הרכב נמחק בהצלחה');
        setCars(prev => prev.filter(car => car.car_id !== car_id));
      } else {
        setMessage('❌ שגיאה במחיקה');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ שגיאה בשרת');
    }
  };

  const handleUpdateSuccess = () => {
    setMessage('✅ הרכב עודכן בהצלחה');
    setCarToEdit(null);
    fetchCars();
  };

  const handleAddSuccess = () => {
    setMessage('✅ רכב נוסף בהצלחה');
    setShowAddForm(false);
    fetchCars();
  };

  return (
    <div className="admin-car-list">
      <h2>ניהול רכבים</h2>

      <div className="top-buttons">
        <button onClick={() => setShowAddForm(prev => !prev)}>
          {showAddForm ? '❌ סגור הוספה' : '➕ הוסף רכב'}
        </button>
      </div>

      {message && <p className="message">{message}</p>}

      {showAddForm && (
        <div className="add-form-wrapper">
          <AdminAddCar onAddSuccess={handleAddSuccess} />
        </div>
      )}

      {carToEdit && (
        <div className="update-form-wrapper">
          <button onClick={() => setCarToEdit(null)}>❌ ביטול עדכון</button>
          <AdminUpdateCar car={carToEdit} onUpdateSuccess={handleUpdateSuccess} />
        </div>
      )}

      {loading ? (
        <p>טוען...</p>
      ) : cars.length === 0 ? (
        <p>אין רכבים להצגה</p>
      ) : (
        <div className="admin-gallery">
          {cars.map(car => (
            <div key={car.car_id} className="admin-car-card">
              {car.images?.[0] && (
                <img
                  src={`data:image/jpeg;base64,${car.images[0].data}`}
                  alt={`${car.company} ${car.model}`}
                />
              )}
              <h3>{car.company} {car.model}</h3>
              <p>שנה: {car.year}</p>
              <p>מחיר: ₪{car.price.toLocaleString()}</p>
              <div className="admin-buttons">
                <button onClick={() => handleDelete(car.car_id)} className="delete-button">🗑️ מחק</button>
                <button onClick={() => setCarToEdit(car)} className="edit-button">✏️ עדכן</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCarList;
