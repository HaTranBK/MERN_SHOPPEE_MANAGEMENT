export const ConvertNumber = (price) => {
  return price.replace(" VND", "").replace(/\./g, "").replace(",", ".");
};

export const formatNumber = (price) => {
  return price.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
