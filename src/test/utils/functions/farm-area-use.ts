export function checkingPercentage(
  underlyingArea: number,
  ttlArea: number,
): number {
  return (underlyingArea / ttlArea) * 100;
}
