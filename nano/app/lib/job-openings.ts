export const availableJobTitles = [
  "Vaga Analista da Qualidade",
  "Vaga Analista de Logística",
] as const;

export function isAvailableJobTitle(value: string): boolean {
  return availableJobTitles.includes(value as (typeof availableJobTitles)[number]);
}
