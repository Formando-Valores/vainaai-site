import { methodGuard, requireFields, sendEmail } from "../server/email";

export default async function handler(req: any, res: any) {
  if (!methodGuard(req, res)) return;

  try {
    const body = req.body || {};
    requireFields(body, [
      "fullName",
      "documentType",
      "documentNumber",
      "nif",
      "address",
      "postalCode",
      "phone",
      "email",
      "maritalStatus",
      "profession",
      "nationality",
      "memberType",
    ]);

    await sendEmail({
      fromName: "AI - Formulário de Associação",
      title: "Nova Solicitação de Associação - AI",
      subject: `Nova Solicitação de Associação - ${body.fullName}`,
      replyTo: String(body.email),
      fields: [
        { label: "Nome Completo", value: body.fullName },
        { label: "Tipo de Documento", value: body.documentType },
        { label: "Número do Documento", value: body.documentNumber },
        { label: "NIF", value: body.nif },
        { label: "Morada", value: body.address },
        { label: "Código Postal", value: body.postalCode },
        { label: "Telemóvel", value: body.phone },
        { label: "Email", value: body.email },
        { label: "Estado Civil", value: body.maritalStatus },
        { label: "Profissão", value: body.profession },
        { label: "Nacionalidade", value: body.nationality },
        { label: "Tipo de Associação", value: body.memberType },
      ],
      footer: "Formulário enviado através do site da AI - Associação contra as Injustiças",
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro no formulário de associação:", error);
    res.status(400).json({ success: false, error: error instanceof Error ? error.message : "Erro ao enviar formulário." });
  }
}
