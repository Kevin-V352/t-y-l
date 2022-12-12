import { useState, useEffect } from 'react';

interface IHookState {
  quantity: number;
  disableAdd: boolean;
  disableRemove: boolean;
};

interface IHookResponse extends IHookState {
  addItem: () => void;
  removeItem: () => void;
};

const useQuantity = (maxQuantity: number, initialValue: number = 1): IHookResponse => {

  const [state, setState] = useState<IHookState>({
    quantity:      initialValue,
    disableAdd:    (initialValue >= maxQuantity),
    disableRemove: (initialValue <= 1)
  });

  useEffect(() => {

    validateButtons();

  }, [state.quantity]);

  const validateButtons = (): void => {

    setState((prevState) => ({
      ...prevState,
      disableAdd:    (prevState.quantity >= maxQuantity),
      disableRemove: (prevState.quantity <= 1)
    }));

  };

  const addItem = (): void => {

    if ((state.quantity + 1) > maxQuantity) {

      setState((prevState) => ({ ...prevState, disableAdd: true }));
      return;

    };

    setState((prevState) => ({ ...prevState, quantity: (prevState.quantity + 1) }));

  };

  const removeItem = (): void => {

    if ((state.quantity - 1) < 1) {

      setState((prevState) => ({ ...prevState, disableRemove: true }));
      return;

    };

    setState((prevState) => ({ ...prevState, quantity: (prevState.quantity - 1) }));

  };

  return {
    ...state,
    addItem,
    removeItem
  };

};

export default useQuantity;
