import { NextRequest, NextResponse } from "next/server";

const ECOMAIL_API_KEY = process.env.ECOMAIL_API_KEY!;
const ECOMAIL_API_URL = "https://api2.ecomail.cz/transactional/send-message";

const RADEK_EMAIL = "radek@radekbarta.cz";
const FROM_EMAIL = "radek@radekbarta.cz";
const FROM_NAME = "Radek Bárta";

async function sendEmail({
  to,
  subject,
  html,
}: {
  to: { email: string; name?: string }[];
  subject: string;
  html: string;
}) {
  const response = await fetch(ECOMAIL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      key: ECOMAIL_API_KEY,
    },
    body: JSON.stringify({
      message: {
        from_email: FROM_EMAIL,
        from_name: FROM_NAME,
        to,
        subject,
        html,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error(`Ecomail API ${response.status}: ${err}`);
    throw new Error(`Ecomail transactional error ${response.status}: ${err}`);
  }

  return response.json();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, type } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Jméno a email jsou povinné" },
        { status: 400 }
      );
    }

    const subject =
      type === "lead"
        ? `Nový zájemce: ${name}`
        : `Nová zpráva z webu: ${name}`;

    // Notify Radek
    await sendEmail({
      to: [{ email: RADEK_EMAIL, name: "Radek Bárta" }],
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f6f6f6;">
          <div style="background: white; border-radius: 16px; padding: 32px;">
            <h2 style="color: #97724f; margin: 0 0 24px;">${subject}</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 120px; vertical-align: top;">Jméno:</td>
                <td style="padding: 8px 0; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; vertical-align: top;">E-mail:</td>
                <td style="padding: 8px 0;">
                  <a href="mailto:${email}" style="color: #97724f;">${email}</a>
                </td>
              </tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #666; vertical-align: top;">Telefon:</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #97724f;">${phone}</a></td></tr>` : ""}
              ${message ? `<tr><td style="padding: 8px 0; color: #666; vertical-align: top;">Zpráva:</td><td style="padding: 8px 0; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td></tr>` : ""}
            </table>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #aaa; font-size: 12px; margin: 0;">
              Odesláno z <a href="https://www.radekbarta.cz" style="color: #c5a889;">radekbarta.cz</a>
            </p>
          </div>
        </div>
      `,
    });

    // Auto-reply to sender
    await sendEmail({
      to: [{ email, name }],
      subject: "Potvrzení přijetí zprávy — Radek Bárta",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f6f6f6;">
          <div style="background: white; border-radius: 16px; padding: 40px; text-align: center;">
            <h2 style="color: #97724f; margin: 0 0 8px;">Děkuji za zprávu, ${name}.</h2>
            <p style="color: #444; line-height: 1.7; margin: 16px 0;">
              Vaši zprávu jsem přijal a ozvu se vám co nejdříve, zpravidla do 48 hodin.
            </p>
            <p style="color: #444; line-height: 1.7; margin: 0 0 32px;">
              Mezitím se můžete podívat na moje projekty nebo si poslechnout nejnovější díl podcastu.
            </p>
            <a href="https://www.radekbarta.cz"
              style="display: inline-block; padding: 14px 32px; background: #97724f; color: white; text-decoration: none; border-radius: 100px; font-weight: 600; font-size: 14px;">
              Zpět na web
            </a>
            <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #aaa; font-size: 12px; margin: 0;">
              Radek Bárta ·
              <a href="https://www.radekbarta.cz" style="color: #c5a889;">radekbarta.cz</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Chyba při odesílání zprávy" },
      { status: 500 }
    );
  }
}
