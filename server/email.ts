import { Resend } from "resend";

const FROM_DOMAIN = process.env.RESEND_FROM_EMAIL || "contato@vainaai.pt";
const TO_EMAIL = process.env.RESEND_TO_EMAIL || "contato@vainaai.pt";

export type EmailPayload = {
  subject: string;
  title: string;
  intro?: string;
  fields: Array<{ label: string; value?: string | boolean | null }>;
  message?: string;
  footer: string;
  replyTo?: string;
  fromName: string;
};

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderEmail(payload: EmailPayload) {
  const fields = payload.fields
    .filter((field) => field.value !== undefined && field.value !== null && field.value !== "")
    .map(
      (field) =>
        `<li><strong>${escapeHtml(field.label)}:</strong> ${escapeHtml(
          typeof field.value === "boolean" ? (field.value ? "Sim" : "Não") : field.value,
        )}</li>`,
    )
    .join("");

  const message = payload.message
    ? `<h3>Mensagem / Descrição:</h3><p>${escapeHtml(payload.message).replace(/\n/g, "<br>")}</p>`
    : "";

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111827;">
      <h2>${escapeHtml(payload.title)}</h2>
      ${payload.intro ? `<p>${escapeHtml(payload.intro)}</p>` : ""}
      <h3>Dados recebidos:</h3>
      <ul>${fields}</ul>
      ${message}
      <p><em>${escapeHtml(payload.footer)}</em></p>
    </div>
  `;
}

export async function sendEmail(payload: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY não configurada.");
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: `${payload.fromName} <${FROM_DOMAIN}>`,
    to: [TO_EMAIL],
    subject: payload.subject,
    html: renderEmail(payload),
    replyTo: payload.replyTo,
  });

  if (error) {
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }

  return data;
}

export function requireFields(body: Record<string, unknown>, fields: string[]) {
  const missing = fields.filter((field) => !String(body[field] ?? "").trim());

  if (missing.length > 0) {
    throw new Error(`Campos obrigatórios em falta: ${missing.join(", ")}`);
  }
}

export function methodGuard(req: { method?: string }, res: { status: (code: number) => { json: (body: unknown) => void } }) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Método não permitido." });
    return false;
  }

  return true;
}
