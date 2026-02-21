function toDubaiDate(dateInput) {
  return new Date(
    new Date(dateInput).toLocaleString('en-US', {
      timeZone: 'Asia/Dubai',
    })
  );
}

export function convertToDubaiDate(dateInput, format = 'short') {
  const dubaiDate = toDubaiDate(dateInput);
  const day = dubaiDate.getDate();
  const month = dubaiDate.toLocaleString('en-US', {
    month: format === 'long' ? 'long' : 'short',
  });
  const year = dubaiDate.getFullYear();

  return format === 'long' ? `${day} ${month}, ${year}` : `${day} ${month}`;
}

export function convertToDubaiTime(dateInput) {
  const dubaiDate = toDubaiDate(dateInput);
  const hours24 = dubaiDate.getHours();
  const hour12 = hours24 % 12 || 12;
  const amOrPm = hours24 >= 12 ? 'PM' : 'AM';
  const minutes = String(dubaiDate.getMinutes()).padStart(2, '0');

  return `${hour12}:${minutes} ${amOrPm}`;
}

export function formatMongoDBDate(dateInput) {
  return `${convertToDubaiTime(dateInput)} (${convertToDubaiDate(dateInput, 'long')})`;
}
