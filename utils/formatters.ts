export const currencyFormat = (value: number | null): string | null => {

  if (!value) return null;

  const formatter = new Intl.NumberFormat('en-US', {
    style:    'currency',
    currency: 'USD'
  });

  return formatter.format(value);

};
