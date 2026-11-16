# Oybek portfolio sayti — Claude uchun eslatmalar

## Foydalanuvchi
- Oybek — Seulda yashovchi UI/UX va Product dizayner (2.5+ yil tajriba).
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
- **Push'ni Oybek o'zi qiladi**: Claude'ning shell'ida GitHub login yo'q. Claude commit qiladi, Oybek VS Code terminalida `git push origin main`.
- **2026-10-29: yangi dizayn jonli** (commit `705a162`). **2026-11-07: Mockchi bola to'liq case study + barcha loyiha kartalari yangi hero rasmlari JONLI** (commit `7ee5e21`, Oybek push qildi). **2026-11-15: Halal Compass case study + Journal (4 bob) + yangi palitra/burchak 0 JONLI** (commit `34afde2`).
  Navbatdagi ishlar: boshqa 9 loyihaning detail sahifalari (Mockchi shablon: `src/projects/mockchi-bola.md`); eski `/mockchi-bola.html` va
  `/uzbrainai.html` ni yangi sahifalarga yo'naltirish; Mockchi "What I Learned" bandlariga izoh (ixtiyoriy); Decap CMS.
  Tozalash: `images/projects/*.png` eskirgan (endi ishlatilmaydi), `src/assets/images/case-studies/0*.png` (Mockchi eski) ishlatilmaydi; `mockchi images/` papkasi nomini `hero images` ga o'zgartirish mumkin.

## Fayllar
- `src/index.njk` — bosh sahifa mazmuni (bo'limlar shu yerga qo'shiladi).
- `src/_includes/layouts/base.njk` — umumiy `<head>`, top bar, skript; `src/_includes/partials/header.njk` — top bar.
- `src/_data/site.json` — ism, email, sayt sarlavhasi/tavsifi (hamma joyda `site.*` orqali).
- `src/assets/css/style.css` — barcha stillar va rang o'zgaruvchilari; `src/assets/js/main.js` — mobil menyu.
- `src/assets/images/projects/` — loyiha rasmlari; `src/assets/images/case-studies/` — case study rasmlari; `profile.jpg`.
- `src/mockchi-bola.html`, `src/uzbrainai.html` — eski case study sahifalari, o'zgarishsiz nusxalanadi (manzillar saqlangan).
- `src/projects/*.md` — loyihalar; `src/blog/*.md` — blog postlari (rasmlari `src/assets/images/blog/`).
- Sahifa shablonlari: `src/work.njk`, `src/about.njk`, `src/blog.njk`, `src/project.njk` (case study), `src/post.njk` (blog post).
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
- Qarorlar: fon/ranglar behzodhalil.com palitrasi (dark `#191816`, accent `#B8461F` / dark `#E07A4F`); **2026-11-15 dan palitra samarthnayyar.com'dan (Oybek so'rovi): fon `#F6F6F4`, kartalar/surface oq `#FFF`, chiziqlar `#D1D1D1`, matn `#141414` / `#4A4A4A` / `#858585`, aksent va asosiy tugma `#2B3D26` (to'q o'rmon yashil, hover qora; aksent-tint `#E2E9DD`; qorong'i polosada aksent och yashil `#B6D1A6`)**;
  shrift Plus Jakarta Sans; loyiha kartalari burchagi 12px; matnlar ingliz tilida.
  Yon bo'shliq (`--gutter`) ekranga qarab: `clamp(20px, 5vw, 48px)`; kontent kengligi maks. 1140px (`--container`).
  Har bir bo'lim sarlavhasi ustida **Section Label** — yumaloq pill (`.section-label`: ingichka chegara, surface fon, oddiy harflar).
- Bo'limlar tartibi (har biri alohida qadam, Oybek tasdig'i bilan):
  1. Top bar: logo `oybeKholikov.` (`site.json` → `brand`; to'liq ism `site.name` sarlavha/©/alt'da qoladi) · **Projects** (KO: 프로젝트; avval "Work", 2026-11-15; `i18n.json` → `nav.work`, footer'da ham) · Blog · About · [Get in touch]; joriy sahifa elementi oldida kichik nuqta (`--dot`, `.nav-links a[aria-current]::before`) — ✅ tayyor
  2. Hero (edjreige uslubi): eyebrow, sarlavha, tavsif, **burchaklar 2026-11-15 dan 0 (to'g'ri burchak): tugmalar, kartalar, rasmlar, jadvallar, forma maydonlari, bloklar (`--radius: 0`); faqat yumaloq teglar (pill: section-label, chips, project-labels, 2.5+ belgisi), profil rasm doirasi va kichik aylanalar (nuqta, yopish tugmasi) qoldi**; doira profil rasm (to'rtburchak qilib ko'rilgan, Oybek qaytarib doira qildi 2026-11-15) ("Hey, I'm Oybek" yorlig'i olib tashlandi), [Get in touch] + [View My CV] — ✅ tayyor
     (profile.jpg 460px — kattaroq rasm (800px+) kelsa almashtirish)
     Hero ostida faktlar qatori (abdulahiroble uslubi, chiziqlar orasida): `i18n.json` → `hero.facts`
     (Oybek tanlagan: **2.5+ years** (accent pill, `<strong>`) / Mobile, web & AI / Research → UI → handoff; About faktlarida ham "Experience 2.5+"). Faqat haqiqiy faktlar — taxmin qilma.
  3. ~~Trusted by~~ — olib tashlandi (2026-10-29, Oybek: hozircha kerak emas)
  4. What I do — ✅ tayyor (edjreige uslubi: qorong'i to'liq kenglikdagi polosa `.section-dark`, 4 ustun 01–04).
     Matnlar `src/_data/services.json` da. Pastga aylantirganda paydo bo'lish: `.on-scroll` (JS yo'q bo'lsa ham matn ko'rinadi).
     Bo'lim id'si `#services` (avval `#about` edi).
  5. Selected Work — ✅ tayyor (2026-10-29). Bosh sahifa tartibi: **Hero → Selected Work → What I do**.
     Bosh sahifada 4 ta `featured: true` loyiha (Mockchi bola, Halal Compass, GoStans, 반장수첩), 2×2 grid,
     [See all projects] → **Work sahifasi** `/work/` va `/ko/work/` (10 loyiha, filtr tablari: All/Mobile app/Website — AI tabi va NotedAI olib tashlandi, 2026-10-29).
     Har loyiha = `src/projects/<slug>.md` (front matter: order, featured, image (fayl nomi `images/projects/` ichida; yoki "/" bilan `images/` ichidagi yo'l, masalan Mockchi: `mockchi images/hero.png`; 2026-11-07: barcha 10 loyiha karta rasmi `mockchi images/hero *.png` (4:3, gradient fon, 2450×1856) — Oybek rasmlari, papka nomi tarixiy. Eski `images/projects/*.png` endi ishlatilmaydi), categories, link, `en`/`ko`: name, role, title, labels).
     `projects.11tydata.json` → `permalink: false` (detail sahifalar KEYINROQ — Oybek). Kartalar hozircha bosilmaydi (Oybek qarori).
     Rasmlar: Eleventy Image 6.0.4 (`{% image %}` shortcode → webp+jpeg, 640/1024/1600) → `_site/assets/img/`.
     DIQQAT: async shortcode bo'lgani uchun kartalar siklida `for` emas `asyncEach` ishlat, ichida `if` ishlatma (filtr bilan oldindan saralash: `featured`, `inCategory`).
     Crewbe loyihasi rasmi yo'qligi uchun qo'shilmagan.
     Karta rasmi ustidagi teglar (`.project-labels`) kichik: 10px (KO 11px), padding 4×9, chetdan 12px (Oybek so'rovi, 2026-11-07).
  6. Blog (bosh sahifada What I do'dan keyin) — ✅ (2026-10-29). Oxirgi 4 post, 2×2, bej kartalar (`--card`), pastda rasm
     (`cover` bo'sh bo'lsa mavzu ikonkasi). Butun karta post sahifasiga havola.
     **Blog sahifasi** `/blog/` va `/ko/blog/` (`src/blog.njk`, barcha postlar, yangisi tepada). Nav/footer "Blog" va [See all posts] → shu sahifa.
     **Post sahifasi** `/blog/<slug>/` (`src/post.njk`, pagination: `collections.postPages`, har til uchun bittadan): Back → mavzu · sana →
     sarlavha → asosiy rasm → matn → hashtaglar. Butun post (Back ham) sahifa markazidagi 720px ustunda (Oybek so'rovi; rasmlar kichik bo'lishi mumkin).
     Har post = `src/blog/<slug>.md` (Decap CMS'ga mos): `date`, `topic` (research | systems | process | ai — `i18n.json` → `blog.topics`),
     `cover` (fayl nomi, `src/assets/images/blog/` ichida), `hashtags: []`, har tilda `en`/`ko`: `title`, `excerpt`, `coverAlt`, `body` (Markdown, `|` bilan).
     `body` → HTML `markdown` filtri bilan (markdown-it 14.3.3, aniq versiya). `blog.11tydata.json` → `permalink: false` (sahifalarni `post.njk` yasaydi).
     4 ta namuna post o'chirildi (2026-10-29). Haqiqiy postlar (Oybek matni, o'zbekchadan EN/KO ga tarjima): 1) "From chaos to clarity", 2) "Design Sprint" (`### ` kichik sarlavhalar bilan). Bir kunda 2 post bo'lsa, tartib uchun vaqt qo'shiladi (`2026-10-29T09:00:00Z`).
  7. Let's talk (`#contact`, sahifa oxirida) — ✅ (2026-10-29). Chapda 3 qadam, o'ngda forma (Name, Email, Message).
     Forma xizmat ISHLATMAYDI (Oybek qarori): JS foydalanuvchining email dasturini mavzu+matn bilan ochadi (`mailto:`),
     JS bo'lmasa oddiy `action="mailto:"`. Ostida email manzili ham ko'rsatilgan. Matnlar: `i18n.json` → `contact` (ish + loyiha uchun).
     Barcha "Get in touch" tugmalari → `#contact`. Butun bo'lim yumaloq bej container ichida (`.contact-card`, `--card` fon, 20px burchak; mobilda 16px).
  8. Footer — ✅ (2026-10-29), barcha sahifalarda (`partials/footer.njk`, `base.njk` da). Ism + qisqa tavsif, havolalar
     (Work · Blog · About · Contact · LinkedIn · Behance), © yil (build vaqtida: `src/_data/year.js`). Ijtimoiy havolalar: `site.json`
     (`linkedin`, `behance`). Eski saytda yana GitHub, Telegram (t.me/oybeKholikov), Instagram (kh_oybee), X (kh_oybee) bor edi — kerak bo'lsa qo'shish mumkin.
  9. About sahifasi — ✅ (2026-10-29): `/about/` va `/ko/about/` (nav va footer "About" shu yerga). abdulahiroble.com/about uslubi:
     sarlavha, 3 abzats (Claude yozgan, Oybek tekshiradi), doira rasm + faktlar jadvali, so'ng chiziqli bloklar:
     Experience, Skills, Education, Languages, Activities, Hobbies, Links, oxirida "birga ishlaymizmi?" CTA.
     Matnlar: `i18n.json` → `about`; ro'yxatlar: `src/_data/about.json`. Experience = faqat KOMPANIYADAGI ish joylari (LinkedIn'dan: Jiwoo Interior film — Product Designer,
     주식회사 아스(크루비) — UX Designer, Freelance); loyihalar ro'yxati olib tashlandi (Oybek). Tools'ga Claude Code qo'shildi.
     Activities (4 ta) ikkala tilda ham asl koreyscha (tarjima qilinmadi). Links: LinkedIn, Behance, X (`site.json` → `x`).
  10. Loyiha detail sahifasi (case study) — ✅ faqat **Mockchi bola** uchun (2026-10-29): `/work/mockchi-bola/` va `/ko/work/mockchi-bola/`.
     Layout (2026-11-06, reference: kseniiamankovska.com/trady-interface — faqat joylashuv, stil/shrift bizniki): Back → sarlavha (`<mark>`; ustidagi pill label olib tashlandi, Oybek) →
     intro (`lead`; sarlavha ostidagi teglar olib tashlandi, Oybek) → meta BITTA QATORDA ustunlar (My role · Timeline · Team · Platform — Oybek tasdiqladi: UI/UX Designer (Lead emas), Jan 2026 – Present, CEO/CTO/PM/5 developers; "Product" va "Client" YO'Q) → chiziq →
     havolalar (`btn btn-secondary`, ↗) → asosiy rasm (izohsiz); Mockchi uchun `mockchi images/hero.png`, 2026-11-07). So'ng ikki ustun: chapda sticky **Contents** (birinchi band **TLDR**) (≤960px da yashiriladi;
     o'qilayotgan bo'lim `aria-current` bilan, main.js) va o'ngda bo'limlar (Oybek tartibi, 2026-11-06): **TLDR** (2026-11-15; `case.tldr[{question, answer}]` — 4 ta savol-javob karta slayder: kulrang karta `#EBEBE7`, pastda `01 / 04` hisoblagich + ‹ › kvadrat tugmalar; JS bilan bir vaqtda bitta karta, JS yo'q bo'lsa 4 tasi ketma-ket; barcha kartalar bir katakda — balandlik eng uzuniga teng, sakramaydi; savollar: muammo / rol / qarorlar / natija; javoblar faqat Mockchi ma'lumotlaridan, o'ylab topilmagan) → The product (`lead` + stat kartalar) →
     Problem (`problem.title` katta sarlavha + `problem.stats[{value,text}]` 3M+/70%/75.5% kartalar + `body` + **Problem framing** `problem.framing{title,text,pairs[{problem,problemText,response,responseText}]}`: chapda muammo kartalari (matn o'ngga), → strelka, o'ngda qora chegarali yechim kartalari; telefonda ustma-ust ↓. Finding/Response kartasi olib tashlandi, Oybek) → What I did (`process.title/text` + `process.cards` — **sticky note** kartalar: pastel ranglar (ko'k/sariq/yashil/pushti), qo'lyozma shrift Caveat (EN) / Gaegu (KO), faqat case study sahifalarida yuklanadi (`base.njk`, `entry.project`); ustida qo'lyozma "What I designed ↘"; 4 ustun → ≤1100px 2 → telefonda 1) → Process (`process.steps[{title, items[], highlight?}]` — 6 bosqich Empathize→Define→Ideate→Prototype→Test→Implement, `.phases` 3×2 kartalar, ro'yxat pastda, → strelka (oxirgisida yo'q), `highlight: true` = qora karta (Test); ostida **Competitive analysis** jadvali `process.competitors{title, columns[], rows[{feature, values[bool]}]}` — birinchi ustun (Mockchi) ajratilgan, telefonda jadval o'z ichida yonga suriladi (`.case-content{min-width:0}` — sahifa kengaymasin); so'ng **User personas** `process.personas{title, highlight, items[{name, age, label, bio, goals[], pains[], motivations[]}]}` — `photo` (Oybek rasmlari: `src/assets/images/mockchi images/persona 1.jpg`, `persona 2.jpg`; bo'lmasa bosh harf avatar; asyncEach + matnli wrapper, chunki async rasm `if` ichida ishlamaydi), Goals / Pain points (accent), Motivations chiplar) → **Selected screens** (`screens: [{image, pins[{x,y}] (rasmdagi joy, %), en/ko: {title, notes[{title,text}]}}]` loyiha darajasida; bo'sh bo'lsa bo'lim va menyu bandi chiqmaydi. Har blok = `0N Sarlavha` + doska rasmi raqamli nuqtalar bilan + izohlar; kompyuterda izoh nuqta bilan bir qatorda, nuqtali chiziq bilan ulangan (izohlar soni = nuqtalar soni, ular orasi kamida ~25% bo'lsin, aks holda ustma-ust tushadi); ≤1100px da rasm tepada, izohlar ro'yxat. Rasmlar `src/assets/images/mockchi images/`. 01 = Design breakdown (`design breakdown1.png`, 3 izoh), 02 = Sitemap (`Mock bola_FigJam.png`, FigJam doskasi, izohsiz; ichidagi yozuvlar o'zbekcha — 2026-11-15; blok raqamlari ro'yxat tartibidan avtomatik, quyidagi nomerlar eskirgan), 03 = Admin session detail (`Session detail.png`, xuddi 02 kabi), 04 = AI-assisted grading (`ai-assisted grading.png`, admin sahifa — admin bloklar (02, 03) bilan birga turadi), 05 = Landing page (`landing page.png`, xuddi shunday), 06 = Student dashboard (`student dashboard.png`), 07 = Exam list (`exams list.png`), 08 = Reading (`reading.png`), 09 = Student result (`student result.png`; talaba oqimi: dashboard → exam list → reading → result). Blok raqami (0N) ro'yxat tartibidan avtomatik; admin sahifalar yonma-yon, so'ng landing va student sahifalar. DIQQAT: bu PNG'lar SHAFFOF fonli, ichidagi yozuvlar qora — qora fonda ko'rinmaydi (dark mode qo'shilsa `.breakdown-figure img` ga och fon kerak bo'ladi), 02 = Admin dashboard (`admin dashboard.png`, nuqta/izohsiz — rasmning o'zida izohlar chizilgan; faqat `title` + `alt`). `pins`/`notes` bo'lmasa rasm to'liq kenglikda. Har rasm bosilganda katta (2400px) nusxa overlay'da ochiladi (`a.zoom`, `imageUrl` shortcode, main.js `<dialog>`; JS bo'lmasa fayl o'zi ochiladi). Keyingi bloklar birma-bir qo'shiladi) → The Outcome (**kulrang `#EBEBE7` panel, tepada 2px yashil chiziq** (samarthnayyar.com uslubi, 2026-11-15): `outcome`: stats[{value,text}] qatorlar — chapda matn, o'ngda katta yashil qiymat, ingichka chiziqlar; goals[{title,text}] "Against our goals" 01–03, ahead "Looking ahead"; "What I delivered" chiplari olib tashlandi (Oybek)) → What I Learned (`learned{intro, items[{title, text?}]}` — kirish matni + yulduzcha belgili qalin qatorlar, ingichka chiziqlar bilan; `text` ixtiyoriy; hozir bandlar Oybek abzatsidan bo'lingan, izohsiz). **Matni bo'sh `outcome`/`learned` bo'limi va Contents'dagi bandi chiqmaydi.**
     **Sahifa oxiri (2026-11-15):** What I Learned'dan keyin (Contents'dan tashqarida, to'liq kenglikda) → **Next case studies** (sarlavha + "View all ↗" → /work/; 2 ta loyiha kartasi; AVTOMATIK: `nextProjects` filtri — loyihalar `order` bo'yicha joriy loyihadan keyingi 2 tasi; detail sahifasi yo'q loyihalar oddiy karta, `detail: true` bo'lgach o'zi bosiladigan bo'ladi) → suhbat taklifi bloki (tepa/past chiziq, jumla `case.ctaText`, ikki yopishgan tugma: Get in touch → #contact, View My CV ↗) → **Back to top** tugmasi (`.to-top`, o'ng pastda; **The Outcome bo'limiga yetganda** paydo bo'ladi — `data-show-at="outcome"`; bo'lim bo'lmasa 700px dan keyin; main.js; faqat case study sahifalarida). Matn yorliqlari `i18n.json` → `case` (`nextStudies`, `viewAll`, `ctaText`, `backToTop`; DIQQAT: `next` kaliti TLDR tugmasiga tegishli).
     Intro (sarlavha ostida) = loyiha `title`. Outcome to'ldirildi (2026-11-07, Oybek matni; $15K — kompaniya investitsiyasi, dizayn natijasi deb ko'rsatma).
     **Hammasi `src/projects/<slug>.md` front matter'dan** (Decap CMS'ga mos, JS-siz tayyor HTML): `detail: true`, `cover`, `links: [{type, url}]`
     (type: website | appstore | googleplay | behance), va har tilda `case:` {category, heading, highlight, meta[{label,value}],
     lead, body, problem{title,stats[],framing{}}, stats[{title,text}], outcome, learned, process{title,text,cardsTitle,cards[],steps[]}}. Shablon: `src/project.njk` (pagination: `collections.projectPages`,
     har til uchun bittadan). Yangi loyiha detail sahifasi = shu maydonlarni to'ldirib `detail: true` qo'yish. Detail'i bor kartalar bosiladi
     ("View case study →"), qolganlari oddiy karta. Matn manbai: eski `src/mockchi-bola.html` + sayt tavsifi (taxmin qilinmagan; jamoa/natijalar yozilmagan).
     Eski `src/mockchi-bola.html`/`uzbrainai.html` hali bor (eski dizayn) — keyin o'chirish/almashtirish kerak.
     **Detail sahifalar tayyor: Mockchi bola, Halal Compass (2026-11-15).** Boshqa 8 loyiha hali yo'q. **Shablonda har bir bo'lim IXTIYORIY** (ma'lumot yo'q bo'lsa bo'lim va Contents bandi chiqmaydi): The product (`lead`; `stats` ixtiyoriy), Problem (`body` yoki `problem`), What I did (`process.cards` bor bo'lsa; title/text ixtiyoriy), Process (`process.steps` bor bo'lsa; matnli wrapper — async personas sikli ichida), Selected screens (`screens`), Outcome (`goals`/`ahead` ixtiyoriy), TLDR, What I Learned. Contents tartibi har doim Mockchi'dagidek.
     **Halal Compass** (`src/projects/halal-compass.md`): Oybek ma'lumotlari — yagona dizayner, 2 software developer, Mar 2025 – Feb 2026, iOS+Android (App Store + Google Play), 1.7K+ yuklab olish (Oybek tuzatdi 2026-11-15; avval 1K+, keyin 1,700+ edi) / 4.9 / 38+ review, "What I Learned" (3 band, Oybek matnidan). Problem framing: Oybek skrinshotidagi "The problem / The goal" dan (3 juft; 1-javobda goal'ning qolgan bandlari: ish, universitet, tarjimon/o'qituvchi, viza, yangiliklar). Problem'da katta sarlavha va raqamli kartalar ixtiyoriy (`problem.title`, `problem.stats`). **Process (2026-11-15):** `process.phaseTitle: "Understanding the user"` + 5 ta karta (User research, Problem & Hypothesis Statements, Personas, Problem statements, User journey maps; Oybek skrinshotidan) — kartalardagi → strelka olib tashlandi (Mockchi'da ham, 2026-11-15); ro'yxat (`items`) faqat Oybek bergan faktlar asosida: User research (usability studies, navigation pain points), Problem statements (3 muammo); **Process detail bloklari** `process.details[{label, title, icon?, body (markdown)}]` — kartalar ostida kulrang karta, tepasida yumaloq yashil belgi (reference: "User research: summary"); 1) User research → Summary (Oybek matni, 3 abzats); 2) User research → **Alli's pain points** (`image: "halal compass/alli.png"` sarlavha yonida kichik kvadrat rasm + `points[{title,text}]` 3 ta raqamli band; rasm `src/assets/images/halal compass/alli.png`, 302px — kichik); 3) **Problem & Hypothesis Statements: Alli** (`notes[{title,text}]` — 2 ta katta sticky note, `.notes-wide`; User research bloklaridan keyin, User story'dan oldin); 4) **Persona: Alli** (`persona{name,age,photo,problem,facts[],background(md),frustrations[],goals[],quote}` — Mockchi persona uslubida karta; `{% ifAsync %}` bilan detail sikli ichida; Problem statement matni 3-blokdagi bilan bir xil); 5) **User story: Alli**; 7) **User journey map: Alli** (`description` — sarlavha yonida matn; `wideImage: "halal compass/journey map.png"` — to'liq kenglikdagi keng rasm, bosilsa katta (zoom); rasm ichidagi matn INGLIZCHA, KO sahifada ham shunday); 6) **Empathy Map: Alli** (`quadrants[{title, body(md)}]` + `centerImage` — 2×2 kulrang kataklar, sarlavhalar aksent yashil, o'rtada doira portret; Says/Thinks/Does/Feels; Feels raqamli ro'yxat, qalin birinchi so'z) (`cards[{label,text}]` — 3 ta karta: As a/an · I want to · so that; rasm bir xil); blok `body` (karta), `points` (raqamli bandlar) va/yoki `cards` (qator kartalar) bo'lishi mumkin; keyingi bosqichlar uchun shu shablon. 2026-11-15 yangi ro'yxatlar (Oybek): User research, Problem & Hypothesis, Personas, **Empathy Map** (yangi, Personas'dan keyin) — jami 6 karta (Problem statements va User journey maps eski ro'yxati bilan); keyin ro'yxat o'rniga/yoniga `text` ham qo'shsa bo'ladi; keyin har karta uchun detail (`text`/`items`) va keyingi bosqichlar qo'shiladi. **Selected screens (2026-11-15):** 01 User flow (`halal compass/userflow.png`), 02 Sketching (`sketching.png`) — Mockchi kabi, izohsiz, bosilsa katta; **"Final design" guruhi** (blokda `group` maydoni → katta sarlavha + chiziq, bir marta): 03 Store & cafe (`storecafe.png`), 04 Login (`login.png`), 05 Prayer & Mosque (`Prayer & Mosque.png`), 06 University & Teacher (`University & Teacher.png`), 07 Visa Calculation, 08 Map & Chat, 09 Community (hammasi `halal compass/*.png`; Profile ekrani hali yo'q) — fayl nomlarida bo'sh joy va & bor, ishlaydi; Sketching ichida o'zbekcha sticky note'lar bor. Hali yo'q (keyin): qolgan ekranlar (UI), Process detail'lari (Problem statements). Ingliz/koreys matnini Claude yozgan (faqat Oybek bergan faktlardan), Oybek tekshiradi. "yolg'iz developer" deb yozgan edi — "yagona dizayner" deb tushunilgan (tasdiq kerak).
  11. **Journal sahifasi** (2026-11-15, yangi): menyuda Projects · Blog · **Journal** · About (footer'da ham); `/journal/` va `/ko/journal/` (`src/journal.njk`).
     **CHAPTER tuzilmasi** (2026-11-15, Oybek reference'i: chapter 01/03): tepada yorliq + "Moments beyond design" sarlavhasi (Claude yozgan, tasdiq kerak), so'ng bob-bob: chapda qiyshiq polaroid rasmlar (oq ramka, soya, 2×2 ketma-ket siljigan), o'ngda markazlashgan matn: "CHAPTER 01" (kichik bosh harf) → katta sarlavha → matn (Markdown, `**qalin**` ishlaydi). Rasm bosilmaydi, kattalashmaydi (Oybek so'rovi). ≤900px da rasmlar tepada, matn pastda.
     Har bob = `src/journal/<nom>.md` (Decap'ga mos): `order` (1 = tepada; bob raqami shu tartibdan avtomatik), `photos: [journal/j1.jpeg, ...]` (`src/assets/images/journal/` ichidagi fayllar; rasmlar 4:3 qilib kesiladi), `en`/`ko`: `title`, `text` (Markdown).
     `journal.11tydata.json` → `permalink: false`. Hozir: 01 "Learning Beyond the Classroom" (j1, j9, j10, j23; EN matni Oybekniki, KO tarjimasini Claude qilgan). Boblar yo'q bo'lsa "New moments are coming soon." chiqadi. 02 "Better Together" (j2, j3, j4, j13, j23; KO Claude tarjimasi), 03 "Exploring Beyond the Familiar" (j5, j6, j7, j8, j11; j7/j11 tik rasm — 4:3 ga kesiladi), 04 "One Step at a Time" (8 rasm → 3 ustun; 7+ rasmda avtomatik) + **record bloki** (ixtiyoriy `record{photos[], en/ko:{eyebrow, value, unit, title, stats[{label,value}], text}}` — bob ostida alohida kulrang panel, tepada yashil chiziq: chapda katta "50.00 KM" + 3 ko'rsatkich, o'ngda skrinshotlar KESILMAGAN holda; j19, j20 — 50 km rekordi 5:57:56, 7'09"/km). 5 ta rasm bo'lsa oxirgisi markazda turadi. Telefon rasmlari EXIF bo'yicha aylantiriladi (`fixOrientation: true`, eleventy.config.js; j2 teskari chiqqan edi).
  12. **Vercel Web Analytics** (2026-11-16, Oybek tanladi; Umami/GA4 o'rniga): `base.njk` oxirida `/_vercel/insights/script.js`, faqat Vercel build'da (`src/_data/env.js` → `env.vercel`, Vercel `VERCEL=1` qo'yadi; localhost'da yo'q). Statistika: Vercel panel → loyiha → **Analytics** tab (u yerda Enable qilinishi kerak). Shahar ko'rsatmaydi (faqat davlat), cookie'siz.
  - View My CV (avval "Download CV"; tashqi havola ikonkasi ↗) → Google Drive linki (`site.json` → `cv`), yangi tabda ochiladi.
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
