import { methodGuard, requireFields, sendEmail } from "../server/email";

export default async function handler(req: any, res: any) {
  if (!methodGuard(req, res)) return;

  try {
    const body = req.body || {};
    requireFields(body, ["name", "email", "phone", "area", "availability"]);

    await sendEmail({
      fromName: "AI - Programa de Voluntários",
      title: "Nova Inscrição de Voluntário - AI",
      subject: `Nova Inscrição de Voluntário - ${body.name}`,
      replyTo: String(body.email),
      fields: [
        { label: "Nome", value: body.name },
        { label: "Email", value: body.email },
        { label: "Telefone", value: body.phone },
        { label: "Área de Interesse", value: body.area },
        { label: "Disponibilidade", value: body.availability },
      ],
      message: String(body.experience || "Não informado"),
      footer: "Inscrição enviada através do site da AI - Associação contra as Injustiças",
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro no formulário de voluntário:", error);
    res.status(400).json({ success: false, error: error instanceof Error ? error.message : "Erro ao enviar inscrição." });
  }
}
