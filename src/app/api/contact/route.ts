import { NextRequest, NextResponse } from "next/server";

const ECOMAIL_API_KEY = process.env.ECOMAIL_API_KEY!;
const ECOMAIL_BASE_URL = "https://api2.ecomailapp.cz";
const ECOMAIL_TRANSACTIONAL_URL = `${ECOMAIL_BASE_URL}/transactional/send-message`;
const ALL_CONTACTS_LIST_ID = 1;

// Notification goes directly to Gmail — bypass radekbarta.cz mail server SPF issues
const RADEK_NOTIFY_EMAIL = "radekbarta1@gmail.com";
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
  const response = await fetch(ECOMAIL_TRANSACTIONAL_URL, {
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
        text: html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error(`Ecomail transactional ${response.status}: ${err}`);
    throw new Error(`Ecomail transactional error ${response.status}: ${err}`);
  }

  return response.json();
}

async function subscribeToList(
  email: string,
  name: string,
  listId: number
) {
  const response = await fetch(
    `${ECOMAIL_BASE_URL}/lists/${listId}/subscribe`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        key: ECOMAIL_API_KEY,
      },
      body: JSON.stringify({
        subscriber_data: {
          email,
          name,
        },
        resubscribe: false,
        trigger_autoresponders: false,
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error(`Ecomail subscribe API ${response.status}: ${err}`);
  }
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

    // Notify Radek — goes directly to Gmail to avoid SPF issues with radekbarta.cz domain
    await sendEmail({
      to: [{ email: RADEK_NOTIFY_EMAIL, name: "Radek Bárta" }],
      subject,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f6f6f6;">
          <div style="background: white; border-radius: 20px; padding: 36px; border: 1px solid #e8e5e2;">
            <div style="border-left: 3px solid #97724f; padding-left: 16px; margin-bottom: 28px;">
              <p style="color: #97724f; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin: 0 0 4px;">Nová poptávka</p>
              <h2 style="color: #111; font-size: 22px; margin: 0; font-weight: 700;">${name}</h2>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #999; font-size: 12px; width: 100px; vertical-align: top; border-bottom: 1px solid #f0ece8;">Jméno</td>
                <td style="padding: 10px 0; font-weight: 600; color: #111; border-bottom: 1px solid #f0ece8;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #999; font-size: 12px; vertical-align: top; border-bottom: 1px solid #f0ece8;">E-mail</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0ece8;">
                  <a href="mailto:${email}" style="color: #97724f; text-decoration: none; font-weight: 600;">${email}</a>
                </td>
              </tr>
              ${phone ? `<tr><td style="padding: 10px 0; color: #999; font-size: 12px; vertical-align: top; border-bottom: 1px solid #f0ece8;">Telefon</td><td style="padding: 10px 0; border-bottom: 1px solid #f0ece8;"><a href="tel:${phone}" style="color: #97724f; text-decoration: none; font-weight: 600;">${phone}</a></td></tr>` : ""}
              ${message ? `<tr><td style="padding: 10px 0; color: #999; font-size: 12px; vertical-align: top;">Zpráva</td><td style="padding: 10px 0; color: #444; line-height: 1.7;">${message.replace(/\n/g, "<br>")}</td></tr>` : ""}
            </table>
            <div style="margin-top: 28px; padding: 16px; background: #f9f7f5; border-radius: 12px;">
              <a href="mailto:${email}" style="display: inline-block; padding: 12px 24px; background: #97724f; color: white; text-decoration: none; border-radius: 100px; font-weight: 600; font-size: 13px; margin-right: 8px;">Odpovědět</a>
              ${phone ? `<a href="tel:${phone}" style="display: inline-block; padding: 12px 24px; background: #f0ece8; color: #97724f; text-decoration: none; border-radius: 100px; font-weight: 600; font-size: 13px;">Zavolat</a>` : ""}
            </div>
            <p style="color: #bbb; font-size: 11px; margin: 20px 0 0; text-align: center;">
              Odesláno z <a href="https://www.radekbarta.cz" style="color: #c5a889; text-decoration: none;">radekbarta.cz</a>
            </p>
          </div>
        </div>
      `,
    });

    // Auto-reply to sender — with premium footer
    await sendEmail({
      to: [{ email, name }],
      subject: "Potvrzení přijetí zprávy — Radek Bárta",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f6f6f6;">
          <!-- Main card -->
          <div style="background: white; border-radius: 20px; padding: 48px 40px 40px; text-align: center; border: 1px solid #e8e5e2; margin-bottom: 0;">
            <p style="color: #c5a889; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 20px;">Radek Bárta</p>
            <h2 style="color: #111; font-size: 26px; font-weight: 700; margin: 0 0 16px; line-height: 1.3;">Děkuji za zprávu.</h2>
            <p style="color: #6b6b6b; line-height: 1.8; margin: 0 0 8px; font-size: 15px;">
              Vaši zprávu jsem přijal a ozvu se vám<br>co nejdříve, zpravidla do 48 hodin.
            </p>
            <p style="color: #9b9b9b; line-height: 1.7; margin: 0 0 36px; font-size: 13px;">
              Mezitím se můžete podívat na moje projekty<br>nebo si poslechnout nejnovější díl podcastu.
            </p>
            <a href="https://www.radekbarta.cz"
              style="display: inline-block; padding: 15px 36px; background: #97724f; color: white; text-decoration: none; border-radius: 100px; font-weight: 700; font-size: 14px; letter-spacing: 0.02em;">
              Zpět na web →
            </a>
          </div>

          <!-- Dark footer -->
          <div style="background: #111111; border-radius: 0 0 20px 20px; padding: 32px 40px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="vertical-align: top; padding-right: 24px; width: 40%;">
                  <p style="color: white; font-weight: 700; font-size: 15px; margin: 0 0 6px;">Radek Bárta</p>
                  <p style="color: #6b6b6b; font-size: 12px; line-height: 1.6; margin: 0;">Investor · Podcaster · Podnikatel</p>
                </td>
                <td style="vertical-align: top; padding-right: 24px; width: 30%;">
                  <p style="color: #6b6b6b; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin: 0 0 8px;">Kontakt</p>
                  <p style="margin: 0 0 4px;">
                    <a href="mailto:radek@radekbarta.cz" style="color: #c5a889; text-decoration: none; font-size: 12px;">radek@radekbarta.cz</a>
                  </p>
                  <p style="margin: 0;">
                    <a href="tel:+420739758734" style="color: #c5a889; text-decoration: none; font-size: 12px;">+420 739 758 734</a>
                  </p>
                </td>
                <td style="vertical-align: top; width: 30%;">
                  <p style="color: #6b6b6b; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin: 0 0 8px;">Navigace</p>
                  <p style="margin: 0 0 3px;"><a href="https://www.radekbarta.cz" style="color: #6b6b6b; text-decoration: none; font-size: 12px;">Domů</a></p>
                  <p style="margin: 0 0 3px;"><a href="https://www.radekbarta.cz/investice" style="color: #6b6b6b; text-decoration: none; font-size: 12px;">Investice</a></p>
                  <p style="margin: 0;"><a href="https://www.radekbarta.cz/investice#kontakt" style="color: #6b6b6b; text-decoration: none; font-size: 12px;">Kontakt</a></p>
                </td>
              </tr>
            </table>
            <div style="border-top: 1px solid #222; margin-top: 24px; padding-top: 16px; text-align: center;">
              <p style="color: #444; font-size: 11px; margin: 0;">
                © 2025 Radek Bárta · <a href="https://www.radekbarta.cz" style="color: #555; text-decoration: none;">radekbarta.cz</a>
              </p>
            </div>
          </div>
        </div>
      `,
    });

    // Add contact to Ecomail "Všechny kontakty" list (ID=1) — non-blocking
    subscribeToList(email, name, ALL_CONTACTS_LIST_ID).catch((err) =>
      console.error("Ecomail list subscribe failed:", err)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Chyba při odesílání zprávy" },
      { status: 500 }
    );
  }
}
