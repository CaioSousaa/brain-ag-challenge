export function isValidCPFOrCNPJ(legalId: string): boolean {
  return /^(\d{3}\.){2}\d{3}-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(
    legalId,
  );
}
