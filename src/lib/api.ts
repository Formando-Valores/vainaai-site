export async function submitForm<TPayload extends Record<string, unknown>>(
  endpoint: string,
  payload: TPayload,
) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data: { success?: boolean; error?: string } | null = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok || data?.success === false) {
    throw new Error(data?.error || "Não foi possível enviar o formulário.");
  }

  return data ?? { success: true };
}
