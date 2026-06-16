import { NextRequest, NextResponse } from "next/server";

const ECOMAIL_API_KEY = process.env.ECOMAIL_API_KEY!;
const ECOMAIL_BASE_URL = "https://api2.ecomailapp.cz";
const ECOMAIL_API_URL = `${ECOMAIL_BASE_URL}/transactional/send-message`;
const NEWSLETTER_LIST_ID = 3;

const RADEK_EMAIL = "radek@radekbarta.cz";
const FROM_EMAIL = "radek@radekbarta.cz";
const FROM_NAME = "Radek Bárta";

async function subscribeToList(email: string, listId: number) {
  const response = await fetch(`${ECOMAIL_BASE_URL}/lists/${listId}/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      key: ECOMAIL_API_KEY,
    },
    body: JSON.stringify({
      subscriber_data: {
        email,
      },
      resubscribe: false,
      trigger_autoresponders: true,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error(`Ecomail subscribe API ${response.status}: ${err}`);
    throw new Error(`Ecomail subscribe error ${response.status}: ${err}`);
  }

  return response.json();
}

async function sendConfirmationToSubscriber(email: string) {
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
        to: [{ email }],
        subject: "Vítejte v newsletteru — Radek Bárta",
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f6f6f6;">
            <div style="background: white; border-radius: 20px 20px 0 0; padding: 48px 40px 40px; text-align: center; border: 1px solid #e8e5e2; border-bottom: none;">
              <p style="color: #c5a889; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 20px;">Radek Bárta</p>
              <h2 style="color: #111; font-size: 26px; font-weight: 700; margin: 0 0 16px; line-height: 1.3;">Přihlášení proběhlo úspěšně.</h2>
              <p style="color: #6b6b6b; line-height: 1.8; margin: 0 0 8px; font-size: 15px;">
                Těším se, že vás budu pravidelně zásobovat<br>tím nejlepším ze světa investic.
              </p>
              <p style="color: #9b9b9b; line-height: 1.7; margin: 0 0 36px; font-size: 13px;">
                Budete dostávat investiční tipy, novinky z trhu<br>a informace o nových dílech podcastu.
              </p>
              <a href="https://www.radekbarta.cz/investice"
                style="display: inline-block; padding: 15px 36px; background: #97724f; color: white; text-decoration: none; border-radius: 100px; font-weight: 700; font-size: 14px; letter-spacing: 0.02em;">
                Prozkoumat investice →
              </a>
            </div>
            <div style="background: #111111; border-radius: 0 0 20px 20px; padding: 32px 40px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: top; padding-right: 24px; width: 40%;">
                    <p style="color: white; font-weight: 700; font-size: 15px; margin: 0 0 6px;">Radek Bárta</p>
                    <p style="color: #6b6b6b; font-size: 12px; line-height: 1.6; margin: 0;">Investor · Podcaster · Podnikatel</p>
                  </td>
                  <td style="vertical-align: top; padding-right: 24px; width: 30%;">
                    <p style="color: #6b6b6b; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin: 0 0 8px;">Kontakt</p>
                    <p style="margin: 0 0 4px;"><a href="mailto:radek@radekbarta.cz" style="color: #c5a889; text-decoration: none; font-size: 12px;">radek@radekbarta.cz</a></p>
                    <p style="margin: 0;"><a href="tel:+420739758734" style="color: #c5a889; text-decoration: none; font-size: 12px;">+420 739 758 734</a></p>
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
                  · <a href="https://www.radekbarta.cz/investice#newsletter" style="color: #555; text-decoration: none;">Odhlásit odběr</a>
                </p>
              </div>
            </div>
          </div>
        `,
        text: `Vítejte v newsletteru Radka Bárty. Budete dostávat investiční tipy, novinky z trhu a informace o nových dílech podcastu. radekbarta.cz`,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error(`Ecomail newsletter confirm ${response.status}: ${err}`);
  }
}

async function sendNotificationToRadek(email: string) {
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
        to: [{ email: RADEK_EMAIL, name: "Radek Bárta" }],
        subject: "Nový odběratel newsletteru",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f6f6f6;">
            <div style="background: white; border-radius: 16px; padding: 32px;">
              <h2 style="color: #97724f; margin: 0 0 16px;">Nový odběratel newsletteru 🎉</h2>
              <p style="color: #444; line-height: 1.7; margin: 0 0 16px;">
                Do tvého newsletteru se právě přihlásil nový odběratel:
              </p>
              <p style="font-size: 18px; font-weight: 600; color: #111; margin: 0 0 24px;">
                ${email}
              </p>
              <p style="color: #888; font-size: 12px; margin: 0;">
                Odběratel byl automaticky přidán do Ecomail listu #${NEWSLETTER_LIST_ID}.<br>
                <a href="https://radekbarta.ecomailapp.cz/contacts/${NEWSLETTER_LIST_ID}?status=active" style="color: #c5a889;">Zobrazit v Ecomailu →</a>
              </p>
            </div>
          </div>
        `,
        text: `Nový odběratel newsletteru: ${email}. Přidán do Ecomail listu #${NEWSLETTER_LIST_ID}.`,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error(`Ecomail notify API ${response.status}: ${err}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Neplatný e-mail" },
        { status: 400 }
      );
    }

    await subscribeToList(email, NEWSLETTER_LIST_ID);

    // Non-blocking: confirmation to subscriber + notification to Radek
    sendConfirmationToSubscriber(email).catch((err) =>
      console.error("Newsletter confirmation failed:", err)
    );
    sendNotificationToRadek(email).catch((err) =>
      console.error("Newsletter notification failed:", err)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json(
      { error: "Nepodařilo se přihlásit k odběru" },
      { status: 500 }
    );
  }
}
