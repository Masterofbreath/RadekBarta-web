import { NextRequest, NextResponse } from "next/server";

const ECOMAIL_API_KEY = process.env.ECOMAIL_API_KEY!;
const ECOMAIL_LIST_ID = process.env.ECOMAIL_LIST_ID ?? "1";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Neplatný e-mail" },
        { status: 400 }
      );
    }

    // Subscribe to Ecomail list
    const response = await fetch(
      `https://api2.ecomail.cz/lists/${ECOMAIL_LIST_ID}/subscribe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "key": ECOMAIL_API_KEY,
        },
        body: JSON.stringify({
          subscriber_data: {
            email,
          },
          trigger_autoresponders: true,
          resubscribe: true,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Ecomail error:", err);
      throw new Error("Ecomail subscription failed");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { error: "Chyba při přihlášení k odběru" },
      { status: 500 }
    );
  }
}
