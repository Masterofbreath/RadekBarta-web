import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů — Radek Bárta",
  description:
    "Zásady zpracování osobních údajů v souladu s GDPR a zákonem č. 110/2019 Sb.",
};

export default function OchranaOsobnichUdajuPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <p className="text-[#97724f] text-sm font-heading font-semibold uppercase tracking-[0.2em] mb-4">
          Právní dokumenty
        </p>
        <h1 className="font-heading font-700 text-4xl lg:text-5xl text-dark mb-4 leading-tight">
          Ochrana osobních údajů
        </h1>
        <p className="text-[#6b6b6b] text-base mb-12 border-b border-[#e8e5e2] pb-8">
          Účinnost od 1. 1. 2026 · Platí pro web radekbarta.cz
        </p>

        <div className="space-y-10 text-[#333] text-base leading-relaxed">

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">1. Správce osobních údajů</h2>
            <p>Správcem Vašich osobních údajů je:</p>
            <div className="mt-3 bg-[#f6f6f6] rounded-2xl p-6 text-sm space-y-1">
              <p className="font-heading font-600 text-dark">Radek Bárta</p>
              <p>Litovelská 118/12, Nová Ulice, 779 00 Olomouc</p>
              <p>IČO: 04345673 &nbsp;·&nbsp; DIČ: CZ9701113763</p>
              <p>
                E-mail:{" "}
                <a href="mailto:radek@radekbarta.cz" className="text-[#97724f] hover:underline">
                  radek@radekbarta.cz
                </a>
              </p>
              <p>Telefon: +420 739 758 734</p>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">2. Jaké údaje zpracováváme a proč</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-heading font-600 text-dark mb-2">Kontaktní formulář</h3>
                <p>
                  Při odeslání kontaktního formuláře zpracováváme: jméno, e-mailovou adresu, telefonní
                  číslo (nepovinné) a obsah zprávy. Tyto údaje slouží výhradně k zodpovězení Vašeho
                  dotazu nebo sjednání schůzky. Právním základem je <strong>plnění smlouvy nebo provedení
                  opatření před uzavřením smlouvy</strong> (čl. 6 odst. 1 písm. b) GDPR) a náš{" "}
                  <strong>oprávněný zájem</strong> na komunikaci s potenciálními klienty
                  (čl. 6 odst. 1 písm. f) GDPR). Údaje uchováváme po dobu 3 let od poslední komunikace.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-600 text-dark mb-2">Newsletter a e-mailový marketing</h3>
                <p>
                  Pokud se přihlásíte k odběru novinek, zpracováváme Vaši e-mailovou adresu na základě
                  Vašeho <strong>souhlasu</strong> (čl. 6 odst. 1 písm. a) GDPR). Souhlas můžete kdykoli
                  odvolat kliknutím na odkaz pro odhlášení v každém e-mailu nebo zasláním žádosti na
                  radek@radekbarta.cz. Odvolání souhlasu nemá vliv na zákonnost zpracování před jeho
                  odvoláním. E-mailové adresy uchováváme po dobu trvání odběru + 12 měsíců pro
                  provozní účely.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-600 text-dark mb-2">Zájemci o akce (Kruh tvůrců)</h3>
                <p>
                  Při přihlášení o informace k akcím zpracováváme jméno, e-mail a telefon (nepovinné)
                  na základě <strong>souhlasu</strong> a přípravy smluvního vztahu. Údaje uchováváme
                  po dobu 6 měsíců od konání akce, na niž jste projevili zájem.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-600 text-dark mb-2">Analytika a sledování návštěvnosti</h3>
                <p>
                  Web využívá sledovací skript Ecomail (provozovatel: Ecomail.cz s.r.o.), který sbírá
                  anonymizovaná data o chování návštěvníků (zobrazené stránky, délka návštěvy) za
                  účelem zlepšování obsahu webu. Právním základem je náš <strong>oprávněný zájem</strong>{" "}
                  (čl. 6 odst. 1 písm. f) GDPR). Web dále využívá nástroje Google Analytics
                  a Meta Pixel pro měření návštěvnosti a efektivity obsahu.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">3. Příjemci a předávání údajů</h2>
            <p>
              Vaše osobní údaje neprodáváme ani nepřenášíme třetím stranám za obchodními účely.
              Využíváme tyto zpracovatele, s nimiž máme uzavřeny zpracovatelské smlouvy dle čl. 28 GDPR:
            </p>
            <ul className="mt-3 space-y-1 list-disc list-inside text-[#444]">
              <li>
                <strong>Ecomail.cz s.r.o.</strong> — platforma pro e-mailový marketing a transakční
                e-maily (server v EU)
              </li>
              <li>
                <strong>Vercel Inc.</strong> — hosting webové aplikace (servery v EU/EEA)
              </li>
            </ul>
            <p className="mt-3">
              Žádné údaje nepředáváme do třetích zemí mimo EU/EEA bez odpovídajících záruk.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">4. Vaše práva</h2>
            <p>Jako subjekt údajů máte dle GDPR tato práva:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-[#444]">
              <li><strong>Právo na přístup</strong> — zjistit, jaké údaje o Vás zpracováváme (čl. 15 GDPR)</li>
              <li><strong>Právo na opravu</strong> — požádat o opravu nepřesných údajů (čl. 16 GDPR)</li>
              <li><strong>Právo na výmaz</strong> — „být zapomenut" za zákonných podmínek (čl. 17 GDPR)</li>
              <li><strong>Právo na omezení zpracování</strong> — v případě pochybností o zákonnosti (čl. 18 GDPR)</li>
              <li><strong>Právo na přenositelnost</strong> — obdržet údaje ve strojově čitelném formátu (čl. 20 GDPR)</li>
              <li><strong>Právo vznést námitku</strong> — proti zpracování na základě oprávněného zájmu (čl. 21 GDPR)</li>
              <li><strong>Právo odvolat souhlas</strong> — kdykoli, bez dopadu na dřívější zpracování</li>
            </ul>
            <p className="mt-4">
              Svá práva uplatníte zasláním e-mailu na{" "}
              <a href="mailto:radek@radekbarta.cz" className="text-[#97724f] hover:underline">
                radek@radekbarta.cz
              </a>. Žádosti vyřizujeme do 30 dnů od jejich obdržení.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">5. Soubory cookie</h2>
            <p>
              Web využívá technické (nezbytné) cookies pro správnou funkci webu a analytické cookies
              prostřednictvím Ecomail trackovacího skriptu. Pokračováním v prohlížení webu vyjadřujete
              souhlas s jejich použitím. Cookies lze spravovat v nastavení Vašeho prohlížeče — jejich
              blokování může omezit funkčnost některých částí webu.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">6. Zabezpečení</h2>
            <p>
              Přijímáme přiměřená technická a organizační opatření k ochraně Vašich osobních údajů
              před neoprávněným přístupem, ztrátou nebo zneužitím. Web je provozován přes šifrované
              HTTPS spojení.
            </p>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">7. Dozorový úřad</h2>
            <p>
              Pokud se domníváte, že zpracovávám Vaše osobní údaje v rozporu s platnými předpisy,
              máte právo podat stížnost u dozorového úřadu:
            </p>
            <div className="mt-3 bg-[#f6f6f6] rounded-2xl p-5 text-sm space-y-1">
              <p className="font-heading font-600 text-dark">Úřad pro ochranu osobních údajů (ÚOOÚ)</p>
              <p>Pplk. Sochora 27, 170 00 Praha 7</p>
              <p>
                Web:{" "}
                <a
                  href="https://www.uoou.cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#97724f] hover:underline"
                >
                  www.uoou.cz
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-heading font-700 text-xl text-dark mb-3">8. Změny těchto zásad</h2>
            <p>
              Tyto zásady ochrany osobních údajů můžeme průběžně aktualizovat. Datum poslední aktualizace
              je uvedeno v záhlaví dokumentu. Doporučujeme tuto stránku pravidelně kontrolovat.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
