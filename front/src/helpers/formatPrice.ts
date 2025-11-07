export const formatPrice = (price: number) => {
  const precioRedondeado = Math.round(price);
  return precioRedondeado.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0, // No mostrar decimales
    maximumFractionDigits: 0, // No mostrar decimales
  });
};
