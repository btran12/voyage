export function formatClock(timeZone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone
  }).format(new Date());
}

export function convertCurrency(
  amount: number,
  originRate: number,
  destinationRate: number
): number {
  if (originRate <= 0 || destinationRate <= 0) return 0;
  return (amount / originRate) * destinationRate;
}
