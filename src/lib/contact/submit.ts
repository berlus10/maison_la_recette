export type SubmitResult = 'success' | 'error' | 'network';

export async function submitForm(
  url: string,
  data: Record<string, unknown>,
): Promise<SubmitResult> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.ok ? 'success' : 'error';
  } catch {
    return 'network';
  }
}

/** Convertit un formulaire en objet, sans les champs vides. */
export function formToObject(form: HTMLFormElement): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  new FormData(form).forEach((value, key) => {
    if (typeof value === 'string' && value.trim() !== '')
      data[key] = value.trim();
  });
  return data;
}
