"use client";

import { useState } from "react";
import Button from "./Button";
import { CheckIcon } from "./Icons";

interface ContactFormProps {
  type?: "contact" | "lead";
  title?: string;
  subtitle?: string;
}

export default function ContactForm({
  type = "contact",
  title,
  subtitle,
}: ContactFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type }),
      });

      if (!res.ok) throw new Error("Chyba při odesílání");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg("Něco se pokazilo. Zkuste to prosím znovu nebo napište přímo na radek@radekbarta.cz");
    }
  }

  const inputClass =
    "w-full px-5 py-4 bg-white border border-[#e8e5e2] rounded-2xl text-dark placeholder-[#aaa] text-sm focus:outline-none focus:border-[#97724f] transition-colors";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="w-14 h-14 rounded-full bg-[#97724f]/10 flex items-center justify-center">
          <CheckIcon className="w-7 h-7 text-[#97724f]" />
        </div>
        <h3 className="font-heading font-700 text-xl text-dark">
          Zpráva odeslána!
        </h3>
        <p className="text-[#6b6b6b] max-w-xs">
          Radek vás bude kontaktovat co nejdříve, zpravidla do 48 hodin.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h3 className="font-heading font-700 text-2xl text-dark mb-2">
              {title}
            </h3>
          )}
          {subtitle && <p className="text-[#6b6b6b] text-sm">{subtitle}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-[#6b6b6b] mb-1.5 ml-1">
            Jméno *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Jan Novák"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-[#6b6b6b] mb-1.5 ml-1">
            E-mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jan@novak.cz"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-xs font-semibold text-[#6b6b6b] mb-1.5 ml-1">
          Telefon *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="+420 777 123 456"
          required
          className={inputClass}
        />
      </div>

      {type === "contact" && (
        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-[#6b6b6b] mb-1.5 ml-1">
            Zpráva *
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Popište, jak vám mohu pomoci..."
            required
            rows={5}
            className={`${inputClass} resize-none`}
          />
        </div>
      )}

      {type === "lead" && (
        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-[#6b6b6b] mb-1.5 ml-1">
            Proč vás Kruh tvůrců zajímá? (nepovinné)
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Pár vět o sobě a co od Kruhu tvůrců očekáváte..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
      )}

      {status === "error" && (
        <p className="text-red-500 text-sm">{errorMsg}</p>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        variant="primary"
        size="lg"
        className="w-full justify-center"
      >
        {status === "loading"
          ? "Odesílám..."
          : type === "lead"
          ? "Mám zájem o více informací"
          : "Odeslat zprávu"}
      </Button>

      <p className="text-[#aaa] text-xs text-center">
        Odesláním souhlasíte se zpracováním osobních údajů dle{" "}
        <a href="/ochrana-osobnich-udaju" className="underline hover:text-[#97724f]">
          zásad ochrany soukromí
        </a>
        .
      </p>
    </form>
  );
}
