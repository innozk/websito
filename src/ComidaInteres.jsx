import { useEffect, useState } from "react";

function ComidaInteres() {
  const [platoApi, setPlatoApi] = useState(null);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(res => res.json())
      .then(data => {
        if (data.meals && data.meals.length > 0) {
          setPlatoApi(data.meals[0]);
        }
      });
  }, []);

  return (
    <div className="api-recomendacion">
      <h2>Comida que te podría interesar</h2>
      {platoApi ? (
        <>
          <img src={platoApi.strMealThumb} alt={platoApi.strMeal} style={{width: 120, borderRadius: 8}} />
          <p style={{margin: "10px 0 0 0"}}><strong>{platoApi.strMeal}</strong></p>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default ComidaInteres;