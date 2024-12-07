import { useState } from "react";

export const useLibroCalificacion = (initialRating = 0) => {
  const [rating, setRating] = useState(initialRating);

  const handleSetRating = (newRating) => {
    setRating(newRating);
  };

  return {
    rating,
    setRating: handleSetRating,
  };
};
