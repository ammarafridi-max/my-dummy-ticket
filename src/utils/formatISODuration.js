export function formatISODuration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?/);
  if (!match) {
    return 'Invalid duration format';
  }
  const hours = match[1] ? match[1].slice(0, -1) : '0';
  const minutes = match[2] ? match[2].slice(0, -1) : '0';
  return `${hours}h ${minutes}m`;
}
