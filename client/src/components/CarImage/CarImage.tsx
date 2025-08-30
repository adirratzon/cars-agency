interface CarImage {
  id: number;
  data: string; // base64 או url של התמונה
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

const CarItem: React.FC<{ car: Car }> = ({ car }) => {
  return (
    <div style={{ border: '1px solid gray', padding: 10, marginBottom: 20 }}>
      <h3>{car.company} {car.model} ({car.year})</h3>
      <p>Hand: {car.hand}</p>
      <p>Kilometers: {car.kilometers}</p>
      <p>Price: ${car.price}</p>

      {car.images && car.images.length > 0 ? (
        <div style={{ display: 'flex', gap: 10 }}>
          {car.images.map(image => (
            // הנחה שהתמונה היא base64 או URL, אם לא תצטרך להמיר
            <img
              key={image.id}
              src={`data:image/jpeg;base64,${image.data}`}
              alt={`${car.company} ${car.model}`}
              style={{ width: 150, height: 100, objectFit: 'cover' }}
            />
          ))}
        </div>
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};
