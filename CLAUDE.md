# Oybek portfolio sayti — Claude uchun eslatmalar

## Foydalanuvchi
- Oybek — Seulda yashovchi UI/UX va Product dizayner (~1.5 yil tajriba).
- Kod yozishni bilmaydi; Terminal, Git, HTML/CSS ni endi o'rganyapti.
- Har doim **o'zbek tilida** gaplash. Har bir qadamni oddiy tilda tushuntir, texnik atamalarni qisqacha izohla.

## Ishlash qoidalari (majburiy)
1. Hech narsani o'zgartirishdan OLDIN rejani ko'rsat va ruxsat so'ra.
2. Kichik qadamlar: bir vaqtda faqat bitta bo'lim.
3. Har bir o'zgarishdan keyin brauzerda qanday tekshirishni ayt.
4. Oybek aytmagunicha **push yoki deploy qilma** (commit ham faqat so'ralganda).
5. Shubha bo'lsa, taxmin qilma — so'ra.

## Loyiha
- Jonli sayt: https://www.oybee.co.kr/
- Hosting: **Vercel** (javob sarlavhasida `server: Vercel`). GitHub repo: `oybekjon94/first-project-deploy`, `main` branch.
  `main` ga push qilish = saytga avtomatik deploy. Shuning uchun push faqat ruxsat bilan.
- Generator: **Eleventy 3.1.6** (aniq versiya). `vercel.json`: `npm ci` → `npm run build` → `_site/` chiqariladi.
- Node.js v24 LTS `~/.local/node` ga o'rnatilgan (parolsiz), PATH `~/.zshrc` da. Claude'ning Bash'ida
  `export PATH="$HOME/.local/node/bin:$PATH"` kerak bo'lishi mumkin.
- Lokal ko'rish: `npm run dev` → http://localhost:8080 (o'zgarishlar avtomatik yangilanadi). Build: `npm run build`.

## Fayllar
- `src/index.njk` — bosh sahifa mazmuni (bo'limlar shu yerga qo'shiladi).
- `src/_includes/layouts/base.njk` — umumiy `<head>`, top bar, skript; `src/_includes/partials/header.njk` — top bar.
- `src/_data/site.json` — ism, email, sayt sarlavhasi/tavsifi (hamma joyda `site.*` orqali).
- `src/assets/css/style.css` — barcha stillar va rang o'zgaruvchilari; `src/assets/js/main.js` — mobil menyu.
- `src/assets/images/projects/` — loyiha rasmlari; `src/assets/images/case-studies/` — case study rasmlari; `profile.jpg`.
- `src/mockchi-bola.html`, `src/uzbrainai.html` — eski case study sahifalari, o'zgarishsiz nusxalanadi (manzillar saqlangan).
- `src/projects/`, `src/blog/` — kelajakdagi `.md` kontent uchun (hozir bo'sh).
- `old-index.html` — eski sayt, `.gitignore` da (GitHub'ga chiqmaydi), faqat solishtirish uchun.

## Ma'lum muammolar (2026-10-28 tahlili)
- **"+0" raqamlari**: HTML'da boshlang'ich matn `+0` deb yozilgan, JS esa raqam ekranga ko'ringandagina
  uni `+1,5 / +15 / +10` ga almashtiradi. Mobilda statistika birinchi ekrandan pastda bo'lgani uchun
  scroll qilinmaguncha, shuningdek JS ishlamaydigan joylarda (link preview, skrinshot servislar, ba'zi ATS/HR tizimlari)
  `+0` qoladi. Bundan tashqari `1,5` (vergul) koreys/ingliz o'quvchiga g'alati ko'rinadi.
- Telefon raqami `index.html` dagi Contact Information blokida ochiq turibdi — olib tashlash kerak.
- Rasmlar juda og'ir (masalan `gostans.png` 6MB) — mobilda sekin yuklanadi.
- Tailwind CDN "play" versiyasi production uchun mo'ljallanmagan; `lucide@latest` versiyasi qotirilmagan.
- 11 ta loyiha bir xil darajada, kuchlilari ajralmaydi; bosh sahifada ta'lim/hobbi/volontyorlik ortiqcha.

## Redizayn (2026-10-28 dan): yangi tuzilish
- `index.html` noldan qayta yozilyapti: oddiy CSS (Tailwind yo'q), CSS o'zgaruvchilari bilan Light/Dark.
  **Default — Light** (Oybek so'rovi). Dark faqat `<html data-theme="dark">` bilan yoqiladi (kelajakdagi qo'lda almashtirish tugmasi uchun).
- `old-index.html` — eski saytning nusxasi (telefon raqami olib tashlangan). Faqat solishtirish uchun; deploydan oldin o'chiriladi.
- Qarorlar: fon/ranglar behzodhalil.com palitrasi (light `#FAF7F0`, dark `#191816`), accent `#B8461F` / dark `#E07A4F`;
  shrift Plus Jakarta Sans; loyiha kartalari burchagi 12px; matnlar ingliz tilida.
  Har bir bo'lim sarlavhasi ustida **Section Label** — yumaloq pill (`.section-label`: ingichka chegara, surface fon, oddiy harflar).
- Bo'limlar tartibi (har biri alohida qadam, Oybek tasdig'i bilan):
  1. Top bar: logo `oybeKholikov.` (`site.json` → `brand`; to'liq ism `site.name` sarlavha/©/alt'da qoladi) · Work · Blog (Soon) · About · [Get in touch] — ✅ tayyor
  2. Hero (edjreige uslubi): eyebrow, sarlavha, tavsif, doira rasm, [Get in touch] + [Download CV] — ✅ tayyor
     (profile.jpg 460px — kattaroq rasm (800px+) kelsa almashtirish)
     Hero ostida faktlar qatori (abdulahiroble uslubi, chiziqlar orasida): `i18n.json` → `hero.facts`
     (Oybek tanlagan: 1.5+ years / Mobile, web & AI / Research → UI → handoff). Faqat haqiqiy faktlar — taxmin qilma.
  3. ~~Trusted by~~ — olib tashlandi (2026-10-29, Oybek: hozircha kerak emas)
  4. What I do — ✅ tayyor (edjreige uslubi: qorong'i to'liq kenglikdagi polosa `.section-dark`, 4 ustun 01–04).
     Matnlar `src/_data/services.json` da. Pastga aylantirganda paydo bo'lish: `.on-scroll` (JS yo'q bo'lsa ham matn ko'rinadi).
     Nav'dagi "About" vaqtincha shu bo'limga (`#about`) olib boradi.
  5. Selected Work — ✅ tayyor (2026-10-29). Bosh sahifa tartibi: **Hero → Selected Work → What I do**.
     Bosh sahifada 4 ta `featured: true` loyiha (Mockchi bola, Halal Compass, GoStans, 반장수첩), 2×2 grid,
     [See all projects] → **Work sahifasi** `/work/` va `/ko/work/` (11 loyiha, filtr tablari: All/Mobile app/Website/AI).
     Har loyiha = `src/projects/<slug>.md` (front matter: order, featured, image, categories, link, `en`/`ko`: name, role, title, labels).
     `projects.11tydata.json` → `permalink: false` (detail sahifalar KEYINROQ — Oybek). Kartalar hozircha bosilmaydi (Oybek qarori).
     Rasmlar: Eleventy Image 6.0.4 (`{% image %}` shortcode → webp+jpeg, 640/1024/1600) → `_site/assets/img/`.
     DIQQAT: async shortcode bo'lgani uchun kartalar siklida `for` emas `asyncEach` ishlat, ichida `if` ishlatma (filtr bilan oldindan saralash: `featured`, `inCategory`).
     Crewbe loyihasi rasmi yo'qligi uchun qo'shilmagan.
  6. Blog (bosh sahifada What I do'dan keyin) — ✅ (2026-10-29). Oxirgi 4 post, 2×2, bej kartalar (`--card`), pastda rasm joyi
     (`cover` bo'sh bo'lsa mavzu ikonkasi). Har post = `src/blog/<slug>.md` (date, topic, cover, `en`/`ko`: title, excerpt).
     Mavzular: `i18n.json` → `blog.topics`. [See all posts] hozircha "Soon" (bosilmaydi) — Blog sahifasi va post sahifalari KEYINROQ.
     Nav "Blog" → bosh sahifadagi `#blog`. **4 ta post — NAMUNA (`example: true`)! Deploydan oldin haqiqiy postlar bilan almashtirish yoki o'chirish kerak.**
  7. Let's talk (`#contact`, sahifa oxirida) — ✅ (2026-10-29). Chapda 3 qadam, o'ngda forma (Name, Email, Message).
     Forma xizmat ISHLATMAYDI (Oybek qarori): JS foydalanuvchining email dasturini mavzu+matn bilan ochadi (`mailto:`),
     JS bo'lmasa oddiy `action="mailto:"`. Ostida email manzili ham ko'rsatilgan. Matnlar: `i18n.json` → `contact` (ish + loyiha uchun).
     Barcha "Get in touch" tugmalari → `#contact`. Butun bo'lim yumaloq bej container ichida (`.contact-card`, `--card` fon, 20px burchak; mobilda 16px).
  8. Footer — ✅ (2026-10-29), barcha sahifalarda (`partials/footer.njk`, `base.njk` da). Ism + qisqa tavsif, havolalar
     (Work · Blog · About · Contact · LinkedIn · Behance), © yil (build vaqtida: `src/_data/year.js`). Ijtimoiy havolalar: `site.json`
     (`linkedin`, `behance`). Eski saytda yana GitHub, Telegram (t.me/oybeKholikov), Instagram (kh_oybee), X (kh_oybee) bor edi — kerak bo'lsa qo'shish mumkin.
  - Download CV → Google Drive linki (`site.json` → `cv`), yangi tabda ochiladi.
- **Ikki til: EN (default) / KO** (2026-10-29). Alohida manzillar: `/` = English, `/ko/` = 한국어 (JS bilan almashtirish EMAS — SEO/HR uchun).
  `src/index.njk` Eleventy pagination bilan `languages.json` dagi har til uchun bir marta yasaladi (`lang` o'zgaruvchisi).
  Barcha matnlar: `src/_data/i18n.json` (`en` / `ko`), xizmatlar: `services.json` (har birida `en`/`ko`).
  Yangi matn qo'shilsa — ikkala tilga ham qo'sh. Koreyscha tarjimalarni Claude qiladi, Oybek tekshiradi.
  Top bar: havolalar · `EN / KO` · [CTA]; mobilda `EN / KO` ☰ yonida. hreflang teglari `base.njk` da.
  Koreyscha shrift: Pretendard v1.3.9 (jsDelivr, faqat /ko/ da yuklanadi), `word-break: keep-all`. Logo doim Plus Jakarta Sans.
- **Kelajakda Decap CMS** (blog + loyihalar). Shu sabab sayt **Eleventy (11ty)** generatoriga o'tkaziladi (Oybek tasdiqladi):
  `src/` (index.html, `_includes/` layoutlar, `projects/*.md`, `blog/*.md`, `assets/`, keyin `admin/`) → build → `_site/`.
  Vercel'da Decap login uchun GitHub OAuth yordamchisi kerak bo'ladi (Netlify Identity Vercel'da ishlamaydi) — CMS bosqichida.
  Kontent JS bilan yuklanmasin — HTML build vaqtida tayyor bo'lishi shart (HR/ATS/SEO uchun).
- Hali hal qilinmagan: aniq loyiha/mijoz soni (Oybek bilmaydi — raqam ko'rsatma), About bo'limi mazmuni,
  qo'lda Light/Dark tugmasi va topbar'ning boshqa funksiyalari (keyinroq). 

## Dizayn yo'nalishi
- Light + Dark mode, toza/minimal/professional, yumshoq animatsiyalar, mobilda mukammal.
- Auditoriya: Koreyadagi IT kompaniya HR'lari, rekruterlar, mijozlar.
- Reference: https://abdulahiroble.com/ , https://behzodhalil.com/ , https://www.edjreige.com/ , https://mok.uz/
