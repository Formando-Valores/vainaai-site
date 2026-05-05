import { methodGuard, requireFields, sendEmail } from "../server/email";

export default async function handler(req: any, res: any) {
  if (!methodGuard(req, res)) return;

  try {
    const body = req.body || {};
    requireFields(body, ["type", "description", "location"]);

    await sendEmail({
      fromName: "AI - Canal de Denúncias",
      title: "Nova Denúncia Recebida - AI",
      subject: `Nova Denúncia - ${body.type} em ${body.location}`,
      fields: [
        { label: "Tipo de Irregularidade", value: body.type },
        { label: "Local da Ocorrência", value: body.location },
        { label: "Denúncia Anónima", value: Boolean(body.anonymous) },
        { label: "Telefone de Contacto", value: body.phone },
      ],
      message: String(body.description || ""),
      footer: "Denúncia enviada através do site da AI - Associação contra as Injustiças",
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro no formulário de denúncia:", error);
    res.status(400).json({ success: false, error: error instanceof Error ? error.message : "Erro ao enviar denúncia." });
  }
}
