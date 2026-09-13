/**
 * Le backend renvoie systématiquement { code, message, ... } sur les erreurs
 * (voir api/utils/errors.py côté Django) — on affiche ce message directement
 * plutôt qu'un message générique, sauf si l'appelant préfère le surcharger.
 */
export function getApiErrorMessage(error: unknown, fallback: string): string {
  const data = (error as { data?: { message?: string } } | undefined)?.data
  return data?.message || fallback
}
