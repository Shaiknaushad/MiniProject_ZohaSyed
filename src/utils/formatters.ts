export const formatPrice = (price: number): string => {
  // Format price in Indian Rupees
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

export const formatArea = (size: number): string => {
  return `${size} sq.m.`;
};