// formatMoney.js

export default function formatMoney(amount = 0) {
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };

  // Remove cents if amount is a whole dollar
  if (amount % 100 === 0) options.minimumFractionDigits = 0;

  const formatter = new Intl.NumberFormat("en-US", options);
  return formatter.format(amount / 100);
}
