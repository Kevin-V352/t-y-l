import { useState } from 'react';

interface HookResponse {
  quantity: number;
  addItem: () => void;
  removeItem: () => void;
};

const useQuantity = (maxQuantity: number, initialValue: number = 1): HookResponse => {

  const [quantity, setQuantity] = useState<number>(initialValue);

  const addItem = (): void => {

    if ((quantity + 1) > maxQuantity) {

      alert('No se pueden agregar mas productos');
      return;

    };
    setQuantity((prevState) => (prevState + 1));

  };

  const removeItem = (): void => {

    if ((quantity - 1) < 1) {

      alert('No se pueden remover mas productos');
      return;

    };

    setQuantity((prevState) => (prevState - 1));

  };

  return {
    quantity,
    addItem,
    removeItem
  };

};

export default useQuantity;
