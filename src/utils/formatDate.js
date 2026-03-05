import { dateOnlyFromInput, dateOnlyToLocalDate, isDateOnlyString } from './dateOnly';

export function formatDate(dateString) {
  if (!dateString) return '';

  const date = isDateOnlyString(dateString)
    ? dateOnlyToLocalDate(dateString)
    : new Date(dateOnlyFromInput(dateString) || dateString);

  if (!date || Number.isNaN(date.getTime())) return String(dateString);

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
