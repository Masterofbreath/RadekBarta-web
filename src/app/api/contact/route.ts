import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RADEK_EMAIL = "radek.barta@goldengate.cz";
const FROM_EMAIL = "Radek Bárta Web <ahoj@radekbarta.cz>";

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
        ? `Nový zájemce o Kruh tvůrců: ${name}`
        : `Nová zpráva z webu: ${name}`;

    // Notify Radek
    await resend.emails.send({
      from: FROM_EMAIL,
      to: RADEK_EMAIL,
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #97724f; margin-bottom: 24px;">${subject}</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 120px;">Jméno:</td>
              <td style="padding: 8px 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">E-mail:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #97724f;">${email}</a></td>
            </tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #666;">Telefon:</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #97724f;">${phone}</a></td></tr>` : ""}
            ${message ? `<tr><td style="padding: 8px 0; color: #666; vertical-align: top;">Zpráva:</td><td style="padding: 8px 0;">${message.replace(/\n/g, "<br>")}</td></tr>` : ""}
          </table>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #aaa; font-size: 12px;">Odesláno z radekbarta.cz</p>
        </div>
      `,
    });

    // Auto-reply to sender
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Potvrzení přijetí zprávy — Radek Bárta",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #97724f; margin-bottom: 8px;">Děkuji za zprávu, ${name}.</h2>
          <p style="color: #444; line-height: 1.7; margin-bottom: 16px;">
            Vaši zprávu jsem přijal a ozvu se vám co nejdříve, zpravidla do 48 hodin.
          </p>
          <p style="color: #444; line-height: 1.7; margin-bottom: 24px;">
            Mezitím se můžete podívat na moje projekty nebo si poslechnout nejnovější díl podcastu.
          </p>
          <a href="https://www.radekbarta.cz" style="display: inline-block; padding: 12px 28px; background: #97724f; color: white; text-decoration: none; border-radius: 100px; font-weight: 600; font-size: 14px;">
            Zpět na web
          </a>
          <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #aaa; font-size: 12px;">
            Radek Bárta · <a href="https://www.radekbarta.cz" style="color: #c5a889;">radekbarta.cz</a>
          </p>
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
