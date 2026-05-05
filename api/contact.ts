import { methodGuard, requireFields, sendEmail } from "../server/email";

export default async function handler(req: any, res: any) {
  if (!methodGuard(req, res)) return;

  try {
    const body = req.body || {};
    requireFields(body, ["name", "email", "subject", "message"]);

    await sendEmail({
      fromName: "AI - Formulário de Contacto",
      title: "Nova Mensagem de Contacto - AI",
      subject: `Contacto: ${body.subject} - ${body.name}`,
      replyTo: String(body.email),
      fields: [
        { label: "Nome", value: body.name },
        { label: "Email", value: body.email },
        { label: "Assunto", value: body.subject },
      ],
      message: String(body.message || ""),
      footer: "Mensagem enviada através do site da AI - Associação contra as Injustiças",
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro no formulário de contacto:", error);
    res.status(400).json({ success: false, error: error instanceof Error ? error.message : "Erro ao enviar mensagem." });
  }
}
