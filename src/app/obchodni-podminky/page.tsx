import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obchodní podmínky — Radek Bárta",
  description:
    "Obchodní podmínky pro poskytování služeb Radka Bárty dle platné české legislativy.",
};

export default function ObchodniPodminkyPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <p className="text-[#97724f] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
          Právní dokumenty
        </p>
        <h1 className="font-heading font-700 text-4xl lg:text-5xl text-dark mb-4 leading-tight">
          Obchodní podmínky
        </h1>
        <p className="text-[#6b6b6b] text-base mb-12 border-b border-[#e8e5e2] pb-8">
          Účinnost od 1. 1. 2026 · Platí pro web radekbarta.cz
        </p>

        <div className="space-y-10 text-[#333] text-base leading-relaxed">

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">1. Poskytovatel služeb</h2>
            <div className="bg-[#f6f6f6] rounded-2xl p-6 text-sm space-y-1">
              <p className="font-heading font-600 text-dark">Radek Bárta</p>
              <p>Litovelská 118/12, Nová Ulice, 779 00 Olomouc</p>
              <p>IČO: 04345673 &nbsp;·&nbsp; DIČ: CZ9701113763</p>
              <p>Plátce DPH dle § 6 zákona č. 235/2004 Sb.</p>
              <p>
                E-mail:{" "}
                <a href="mailto:radek@radekbarta.cz" className="text-[#97724f] hover:underline">
                  radek@radekbarta.cz
                </a>
              </p>
              <p>Telefon: +420 739 758 734</p>
              <p className="text-[#6b6b6b] pt-1">
                Zapsán v živnostenském rejstříku, vydal příslušný živnostenský úřad.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">2. Úvodní ustanovení</h2>
            <p>
              Tyto obchodní podmínky (dále jen „OP") upravují vzájemná práva a povinnosti poskytovatele
              a klientů/zájemců (dále jen „klient") při využívání služeb nabízených prostřednictvím
              webu <strong>radekbarta.cz</strong>. OP jsou vydány v souladu se zákonem č. 89/2012 Sb.,
              občanský zákoník, v platném znění.
            </p>
            <p className="mt-3">
              Odesláním kontaktního formuláře nebo přihlášením se k jakékoli službě klient potvrzuje,
              že se s těmito OP seznámil a souhlasí s nimi.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">3. Přehled nabízených služeb</h2>
            <ul className="space-y-3 list-disc list-inside text-[#444]">
              <li>
                <strong>Investiční zprostředkování</strong> — zprostředkování investičních nástrojů
                (zlato, stříbro, akciové fondy) v rámci oprávnění dle platných předpisů finančního trhu.
                Konkrétní podmínky spolupráce jsou stanoveny individuální smlouvou.
              </li>
              <li>
                <strong>Kruh tvůrců</strong> — komunitní retreaty, setkání a vzdělávací akce zaměřené
                na osobní rozvoj. Přesné podmínky účasti jsou sděleny na vyžádání.
              </li>
              <li>
                <strong>Konzultace</strong> — individuální konzultace v oblastech investic, osobního
                rozvoje a tvorby obsahu. Rozsah a cena jsou dohodnuty individuálně.
              </li>
              <li>
                <strong>Vzdělávací obsah</strong> — podcasty, YouTube kanály a další bezplatně dostupný
                obsah. Na jeho použití se vztahují podmínky platformy, na níž je publikován.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">4. Uzavření smlouvy</h2>
            <p>
              Smlouva o poskytnutí služby je uzavřena okamžikem, kdy klient obdrží písemné
              potvrzení od poskytovatele (e-mailem). Nabídky na webu jsou informativní a nezakládají
              závazný návrh smlouvy ve smyslu § 1732 odst. 2 OZ.
            </p>
            <p className="mt-3">
              Pro uzavření smlouvy na investiční zprostředkování se vždy vyžaduje osobní nebo
              distanční setkání a splnění zákonných požadavků dle zákona č. 256/2004 Sb.
              o podnikání na kapitálovém trhu.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">5. Ceny a platební podmínky</h2>
            <p>
              Ceny služeb jsou stanovovány individuálně a jsou vždy sděleny před uzavřením smlouvy.
              Poskytovatel je plátcem DPH — ceny jsou uváděny bez DPH, k nimž je připočtena DPH
              v zákonné výši. Platba probíhá dle dohody, zpravidla bankovním převodem na základě
              vystaveného daňového dokladu se splatností 14 dní.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">6. Právo na odstoupení od smlouvy (spotřebitelé)</h2>
            <p>
              Pokud je klient spotřebitelem ve smyslu § 419 OZ (fyzická osoba mimo rámec své
              podnikatelské činnosti), má právo odstoupit od smlouvy uzavřené distančním způsobem
              (telefonicky, e-mailem, přes web) bez udání důvodu do <strong>14 dnů</strong> od jejího
              uzavření, a to v souladu s § 1829 OZ.
            </p>
            <p className="mt-3">
              Odstoupení je nutné zaslat písemně na e-mail:{" "}
              <a href="mailto:radek@radekbarta.cz" className="text-[#97724f] hover:underline">
                radek@radekbarta.cz
              </a>. Pokud klient výslovně požádal o zahájení poskytování služby ještě před uplynutím
              lhůty pro odstoupení a služba byla plně poskytnuta, právo na odstoupení zaniká
              (§ 1837 písm. a) OZ).
            </p>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">7. Storno podmínky pro akce</h2>
            <p>
              Podmínky stornovacích poplatků pro konkrétní akce (Kruh tvůrců, retreaty apod.) jsou
              vždy uvedeny v pozvánce nebo nabídce dané akce. Neurčí-li zvláštní podmínky jinak:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-[#444]">
              <li>Zrušení více než 30 dní před akcí: plná refundace</li>
              <li>Zrušení 14–30 dní před akcí: refundace 50 % uhrazené ceny</li>
              <li>Zrušení méně než 14 dní před akcí: bez nároku na refundaci</li>
              <li>
                Náhradník: klient může kdykoli před akcí převést účast na jinou osobu po dohodě
                s poskytovatelem
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">8. Odpovědnost a vyloučení záruky</h2>
            <p>
              Vzdělávací a motivační obsah (podcasty, YouTube, webový obsah) je poskytován výhradně
              pro informační a vzdělávací účely a nepředstavuje investiční poradenství ve smyslu
              zákona č. 256/2004 Sb. Informace obsažené na webu nemohou nahradit individuální
              konzultaci.
            </p>
            <p className="mt-3">
              Poskytovatel neodpovídá za škody vzniklé rozhodnutím klienta učiněným na základě
              obsahu dostupného na webu bez uzavření individuální smlouvy. Maximální výše náhrady
              škody ze smluvního vztahu je omezena na výši uhrazené ceny za konkrétní službu.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">9. Duševní vlastnictví</h2>
            <p>
              Veškerý obsah webu (texty, fotografie, grafika, loga) je chráněn autorským zákonem
              č. 121/2000 Sb. Jeho šíření, kopírování nebo jiné užití bez písemného souhlasu
              poskytovatele je zakázáno.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">10. Mimosoudní řešení sporů</h2>
            <p>
              Klient — spotřebitel má právo na mimosoudní řešení spotřebitelského sporu. Příslušným
              subjektem pro mimosoudní řešení je:
            </p>
            <div className="mt-3 bg-[#f6f6f6] rounded-2xl p-5 text-sm space-y-1">
              <p className="font-heading font-600 text-dark">Česká obchodní inspekce (ČOI)</p>
              <p>Štěpánská 796/44, 110 00 Praha 1</p>
              <p>
                Web:{" "}
                <a
                  href="https://www.coi.cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#97724f] hover:underline"
                >
                  www.coi.cz
                </a>
              </p>
              <p>
                EU platforma pro online řešení sporů:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#97724f] hover:underline"
                >
                  ec.europa.eu/consumers/odr
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">11. Rozhodné právo a soudní příslušnost</h2>
            <p>
              Tyto OP a veškeré smluvní vztahy z nich vyplývající se řídí právním řádem České
              republiky. Případné spory budou řešeny příslušnými soudy České republiky.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">12. Ochrana osobních údajů</h2>
            <p>
              Zpracování osobních údajů probíhá v souladu s GDPR a zákonem č. 110/2019 Sb. Podrobnosti
              naleznete v{" "}
              <a href="/ochrana-osobnich-udaju" className="text-[#97724f] hover:underline">
                Zásadách ochrany osobních údajů
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">13. Změny obchodních podmínek</h2>
            <p>
              Poskytovatel si vyhrazuje právo tyto OP měnit. O změnách bude klient informován
              prostřednictvím e-mailu (pokud je odběratelem novinek) nebo zveřejněním aktualizované
              verze na webu. Datum poslední změny je uvedeno v záhlaví dokumentu.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">14. Kontakt</h2>
            <p>
              S jakýmikoli dotazy k těmto OP se obracejte na:{" "}
              <a href="mailto:radek@radekbarta.cz" className="text-[#97724f] hover:underline">
                radek@radekbarta.cz
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
