export function formatISOTime(isoString) {
  const dateObj = new Date(isoString);

  // const year = dateObj.getFullYear();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = String(monthNames[dateObj.getMonth()]).padStart(1, '3');
  const day = String(dateObj.getDate()).padStart(1, '0');

  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  const date = `${month} ${day}`;
  const time = `${hours}:${minutes}`;

  return { date, time };
}
