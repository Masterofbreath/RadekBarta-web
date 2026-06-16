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
