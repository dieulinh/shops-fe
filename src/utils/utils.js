export const formDataToJson = (formData) => {
  return JSON.stringify(Object.fromEntries(formData.entries()));
};

// Formats a numeric value into a currency string (default CAD)
// Usage: formatPrice(12.5) -> CA$12.50
export function formatPrice(v, currency = "CAD") {
  if (v == null || isNaN(Number(v))) return "";
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(Number(v));
  } catch {
    return `CA$ ${v}`;
  }
}