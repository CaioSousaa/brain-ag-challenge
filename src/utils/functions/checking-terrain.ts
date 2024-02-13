export function checkingTerrain(
  ttl_hectares: number,
  plantable_area: number,
  vegetation_area: number,
): boolean {
  return plantable_area + vegetation_area <= ttl_hectares;
}
