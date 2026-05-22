"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Chyba při přihlášení");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Něco se pokazilo. Zkuste to prosím znovu.");
    }
  }

  return (
    <section id="newsletter" className="snap-section min-h-[50dvh] bg-[#1c1510] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-20 w-full">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <p className="text-[#c5a889] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
              Newsletter
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-heading font-700 text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-white mb-4">
              Radkův investiční a strategický newsletter
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/50 text-lg leading-relaxed mb-10">
              Chcete získat kvalitní informace ze světa investic a kapitálových
              trhů, info o novém dílu podcastu a dalších novinkách?
            </p>
          </Reveal>

          {status === "success" ? (
            <Reveal>
              <div className="flex items-center justify-center gap-3 text-[#c5a889]">
                <div className="w-10 h-10 rounded-full bg-[#97724f]/20 flex items-center justify-center">
                  <CheckIcon className="w-5 h-5" />
                </div>
                <p className="font-heading font-semibold">
                  Skvěle! Brzy se ozveme.
                </p>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.3}>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="váš@email.cz"
                  required
                  className="flex-1 px-5 py-3.5 bg-white/10 border border-white/10 rounded-full text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#c5a889] transition-colors"
                />
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  variant="primary"
                  size="md"
                  className="shrink-0 whitespace-nowrap"
                >
                  {status === "loading" ? "Přihlašuji..." : "Přihlásit se"}
                </Button>
              </form>
              {status === "error" && (
                <p className="text-red-400 text-sm mt-3">{errorMsg}</p>
              )}
              <p className="text-white/20 text-xs mt-4">
                Odhlášení kdykoliv jedním klikem. GDPR compliant.
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
