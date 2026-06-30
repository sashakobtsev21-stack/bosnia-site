# Bosnia and Herzegovina Guidebook — спецификация продукта и плана запуска

> **ЯЗЫК: сайт ОДНОЯЗЫЧНЫЙ — только английский (en) на корне `/`. EN-only навсегда** (ru/uk НЕ заводятся: ни страниц, ни контента, ни словарей, ни sitemap-locales, ни hreflang). Где в §-тексте остаётся «трёхъязычность» — неактуально; только en.

Версия 0.1 (форк общего движка сети путеводителей) · 2026 · владелец: Александр · домен: **bosniaguidebook.com**
Статус: **off-domain scaffold**. Движок форкнут с EN-форка-донора сети; донор-контент снят, коллекции пусты (сборка зелёная «по дизайну», §11); контент-модель переведена на 3 турлогических региона Боснии. Контент ещё не написан. Первый сайт второй волны сети (порядок запуска: **Босния → Армения → Сербия**).

**Источники правды уровня сети (хаб `multiagent`):** план сайта `docs/new-sites/bosnia-plan-2026-06-30.md` (регионы/города/кластеры/монетизация), эталон сборки `docs/NEW-SITE-BLUEPRINT.md`, чек-лист `docs/NEW-SITE-CHECKLIST.md`, общие стандарты `docs/STANDARDS.md`, SEO-кластеры `docs/seo/bosnia-seo-*.md`. Этот SPEC — проекция тех решений на репозиторий; правила работы — `CLAUDE.md`; запуск окружения — `SETUP-GUIDE.md`.

**Как читать.** Часть I — почему этот сайт. Часть II — что строим (исполняемая спецификация для агентов Claude Code). Часть III — как строим (процесс, фазы, гейты). Часть IV — куда растём.

**Происхождение.** Продуктовая система (IA, шаблоны, компоненты, контент-модель, `/go/`, процесс, фазы, QA-гейты) унаследована от движка сети и доказала работоспособность. Под Боснию переопределены: гео-модель (§7/§11), языки (§12, EN-only), монетизация (§16), брендинг (§10, плейсхолдер до запуска).

---

# ЧАСТЬ I. БИЗНЕС-АНАЛИЗ

## 1. Рынок
Босния и Герцеговина — компактная балканская страна с сильным турпотенциалом: Османское наследие (Mostar, Stari Most, Baščaršija), горы и каньоны Динарид, водопады (Kravice, Una, Pliva), военная история Сараево, рафтинг и горные лыжи. Половина спроса приходит из **хорватских хабов** (Dubrovnik/Split) как day-trip-трафик. Контентная ниша по большинству кластеров умеренно конкурентна; выигрываем **свежестью, честной логистикой (часы/км, «тур vs своя машина») и структурой**, а не лобовой атакой. Конкретные рыночные цифры — `TODO(факт)`, не выдумывать (CLAUDE правило 4).

## 2. Аудитория (сегменты по убыванию ценности)
- **A. Туристы Tier-1/Запад** (US/UK/DE/NL/AU и др.), EN — основное ядро: маршруты, города, day-trips, аренда, отели. Платят за рекламу (премиум RPM), квалифицируют сеть под Tier-1-пороги рекл-сетей.
- **B. Номады/экспаты** (EN) — релокация, стоимость жизни, eSIM, страховки; рекуррентные партнёрки.
- **C. Локальный бизнес «на земле»** (Sarajevo/Mostar) — прямые размещения (баннеры/featured/бейдж «Проверено»), малая часть дохода.

«Гео» = где находятся читатели (Tier-1/Запад), а не где страна. Поэтому **EN-first/EN-only**. По Боснии ru-кластера нет (в отличие от Армении/Сербии) — ru не заводим.

## 3. Конкуренты и стратегия входа
Англоязычные тревел-блоги и OTA покрывают топ-достопримечательности, но слабы в **датированной практической логистике** (визы-нет/границы/зимние шины/free-transport-исключения), честном «тур vs своя машина» и свежести 2026. Это и есть окно. Не обещать «лёгкий ранг» по природе/северу — выдача там плотная (Una NP: 8+ гайдов); дифференциатор — угол подачи и актуальность.

## 4. SWOT
- **S:** проверенный движок + QA; модель отбора (>4★ консенсус, видимая дата) даёт свежесть/достоверность; EN-only → премиум RPM; AI-конвейер контента.
- **W:** новый домен без траста; владелец не живёт в стране (нужен ресёрч-заменитель опыта); конкурентная природа-ниша.
- **O:** day-trip-узел из Хорватии; недопокрытая практическая логистика; рост турпотока.
- **T:** дата-чувствительная фактура (цены/рейсы) быстро устаревает; сезонность спроса.

## 5. Формат и позиционирование
**Широкий проверенный справочник по стране**, вобравший денежные механики (аренда/трансфер/жильё) и заботу о живущих (релокация/услуги). Узкий одно-темный вариант отвергнут (потолок трафика + завязка дохода на одну партнёрку). Глубина в каждом кластере снимает риск размывания темы.
**Позиционирование одной фразой:** «Bosnia and Herzegovina Guidebook — a vetted guide to Bosnia and Herzegovina: places selected by high ratings and cross-checked, with a visible check date. English-first.»

---

# ЧАСТЬ II. СПЕЦИФИКАЦИЯ ПРОДУКТА

## 6. Цели и KPI
KPI = **деньги/показы/позиции по кластерам** (GSC), НЕ число статей. Вехи монетизации: ~1000 сессий → AdSense/Journey; 25k pv при ≥50% Tier-1 → Raptive / Mediavine Official. Affiliate — с первой опубликованной денежной страницы. Каденс после стартового корпуса ~5/нед, right-size по данным GSC.

## 7. Информационная архитектура и URL
Разделы (категории коллекции `articles`, en-слаги): **attractions · cities · food · entertainment · routes · transport · car-rental · relocation · insurance · news · planning** (+ about/contact). URL `/{category}/{slug}/`, `trailingSlash: always`. Город = статья `category:'cities'` (URL `/cities/{slug}/`).

**Гео-модель (синхронно content.config.ts ↔ i18n, гейт `check-enums`):**
- **REGIONS — 3 турлогических макрорегиона:** `herzegovina`, `sarajevo-region`, `northern-bosnia`.
- **Опорные города (статьи `cities`):** Sarajevo (столица, ≥15 фото), Mostar (≥10), Trebinje, Jajce, Bihać.
- **EDA_CITY_PAGES (директория еды):** sarajevo, mostar, trebinje.
- **accessFrom (точки въезда):** sarajevo, mostar, dubrovnik (хорватский хаб day-trip).

## 8. Шаблоны страниц (состав + критерии приёмки)
HomePage (hero+поиск+витрина+доверие+услуги-бэнд+свежее+о-проекте), HubPage (раздел), ArticlePage, RoutePage (таймлайн остановок+карта), EdaDirectory + CityFoodPage, AttractionsCatalog (фильтр тип/регион), EntertainmentHub, InsuranceHub, RelocationHub + ServicesDirectory, NewsPage, About/Contacts, 404. Приёмка — DoD в CLAUDE.md + гейты `npm test`/`npm run qa`.

## 9. Компонентный инвентарь
Header (+ RatesBar: погода Sarajevo/Mostar/Banja Luka + курс BAM/KM за $/€/£), Footer, BaseLayout, SearchBox, ShowcaseRail, ArticleCard/RestaurantCard, VerifiedBadge, AffiliateBox, AccessFrom (Sarajevo/Mostar/Dubrovnik), VisitInfo, PhotoGallery+Lightbox, MapEmbed (Leaflet, on-click), Breadcrumbs, CookieConsent (Consent Mode v2). Без React; интерактив — нативный JS.

## 10. Дизайн-система
Дизайн-токены — только `src/styles/tokens.css` (var(--…), хардкод hex запрещён), проброшены в Tailwind 4 через `@theme`. Палитра/типографика/hero/логотип/og/флаг — **плейсхолдер донора, ребренд под Боснию до запуска** (`TODO(брендинг)`).

## 11. Контент-модель (Content Collections)
5 коллекций: **articles · routes · cities · restaurants · services**. `LANGS = ['en']`. CATEGORIES — en-набор (§7). `PRICE_LEVELS = ['€','€€','€€€']` (опорная €; в тексте честно — BAM/KM, евро не везде). ATTRACTION_TYPES (7: mountains-nature/waterfalls-canyons-lakes/caves/religious-sites/fortresses-castles/resorts-springs/museums-landmarks), RAZVL_TYPES (5), SERVICE_RUBRICS (6), CUISINE_KEYS (bosnian/grill/wine/cafe/bakery/vegetarian/asian/street/bar). Коллекция `cities` пустая и не используется (город = статья `cities`). Схемы — будущий API мобильного приложения (§23) и источник schema.org; менять осознанно. Коллекции на старте пустые — сборка обязана проходить.

## 12. Механика i18n
Сайт одноязычный — только **en** на корне `/`. Без автодетекта/гео-редиректов/языковых зеркал. Helpers: `t`, `articleHref` (`/{cat}/{slug}/`), `formatDate` (Intl, UTC, en-US), `*Label`. SEO-меты в **символах**, не байтах (title ≤60, desc ≤155). `EDA_CITY_PAGES`/`REGION_SLUGS`/`ATTRACTION_TYPE_SLUGS`/`CUISINE_KEY_SLUGS` синхронны с content.config (гейт `check-enums`).

## 13. Технический стек и инфраструктура
Astro 6.4.6 (SSG) + Tailwind 4 + Leaflet + rehype-external-links. Хостинг Cloudflare Workers (Static Assets), `wrangler.jsonc` (`name: 'bosnia-site'`, assets `./dist`, main `worker/index.ts`). Деплой = push в `main`. CI: `.github/workflows/ci.yml` (гейты+сборка), `daily-news-rebuild.yml`.

## 14. SEO-спецификация
`site: 'https://bosniaguidebook.com'`, sitemap (`@astrojs/sitemap`, en, lastmod из updatedAt/publishedAt, фильтр /go/ и demo). BaseLayout: title/description, canonical, self-hreflang en + x-default → en, OG/Twitter, JSON-LD Organization+WebSite. `robots.txt`: **off-domain → временно `Disallow: /`**, вернуть `Allow: /` + `Disallow: /go/` к запуску. Внутр. ссылки формата `/{cat}/{slug}/`. Внешние ссылки авто-`nofollow` (rehype).

## 15. Перф-бюджет, доступность, качество контента
LCP < 2.0с, CLS < 0.1, INP < 200мс, JS/стр < 50КБ, фото ≤200КБ webp/avif lazy. Доступность: контраст ≥4.5:1, видимый focus, alt, навигация с клавиатуры. Качество: уникальные факты, человечный тон (НЕ ИИ-генерёнка — жёсткий гейт), без генерёнки/тонких страниц, ④ гейт «одна интент-страница» (`check-dedup`).

## 16. Монетизация
`/go/{partner}?c={slug}` → 302 на `urlTemplate` партнёра (анти-open-redirect фолбэк), `rel="sponsored nofollow noopener"`, 1–3 AffiliateBox/статью, прямые URL в контенте запрещены. Логика `worker/index.ts` — страна-агностична.
**Ядро дохода Боснии (партнёр живой + гео есть):** `localrent` (аренда авто — петля Sarajevo→Mostar→Герцеговина, ядро), `kiwitaxi` (трансферы вкл. Dubrovnik→Mostar), `trip-hotels` (отели Sarajevo/Mostar/Trebinje), `yesim` (eSIM, выделенная страница), `safetywing` (страховка, `allowSubId:false`), `aviasales` (рейсы).
**🔴 ТУР-ПАРТНЁРА НЕТ (Вариант A владельца 2026-06-30):** Trip.com `trip-tours` по Боснии = 0 туров; **GetYourGuide/Viator НЕ заводим**. Day-trip/тур-темы монетизируем авто+трансфер+отель. `trip-tours` оставлен валидным редиректом (`kwd=Bosnia`), но в контент-метках не используется. Вариант B (завести GYG/Viator через Travelpayouts) — только по явному решению владельца.
**EKTA НЕ подключена** (сломанный прямой URL без атрибуции в сети); страховку ведём на `safetywing`. Trip.com/tpx.gr-аккаунты переиспользуемы между сайтами сети (один кабинет).

## 17. Аналитика
Одна аналитика — **GA4** (правило 8). Consent Mode v2: `public/js/ga-init.js` (`analytics_storage='denied'` по умолчанию) + `consent-banner.js` + `CookieConsent.astro`. CSP `script-src 'self' https://www.googletagmanager.com` **без sha256** (инлайна нет). **GA4-ID — плейсхолдер `G-PENDING-BOSNIA`; владелец заводит реальное GA4-свойство и подставляет ID ДО запуска** (`TODO §25`). Без тег-менеджеров, без виджетов соцсетей/чатов, Cloudflare Web Analytics отключена.

## 18. Безопасность и юридическое
Статика, форм нет, БД нет, секретов в репо нет. `public/_headers`: CSP (default-src 'self'; img/connect под open-meteo + open.er-api + GA; без чужого sha256), HSTS, X-Frame-Options DENY, Referrer-Policy, Permissions-Policy. `/go/` — анти-open-redirect (не-https target → фолбэк на свой сайт). Партнёрские раскрытия в футере/у CTA.

---

# ЧАСТЬ III. ПРОЦЕСС РАЗРАБОТКИ

## 19. Инструменты и их роли
Per-repo агенты (`.claude/agents/*`): architect, coder, reviewer, seo-strategist/engineer/content-writer, fact-checker, content-editor, photo-researcher/auditor/upgrade-researcher, accessibility/ui-ux/security/perf-аудиторы, tester, monetization-strategist, research-collector, en-translator (deprecated — en-only). Скиллы (`.claude/skills/*`): `add-content` (конвейер), `news` (дайджест), `full-audit` (многоагентный аудит). uk-translator удалён (en-only).

## 20. Фазы и quality gates
Скаффолд (этот этап) → брендинг (ребренд палитры/флага/hero/og, GA4-ID) → минимальный контент по плану → рост по GSC. Гейты: `npm test` (enums/parity/photos/interlinks/dedup), `npm run build`+`check` зелёные, `npm run qa` = **ВЕРДИКТ GO** (не exit code).

## 21. Тестирование
Контентный статический сайт — тест-слой вокруг контента/ссылок/разметки/перфа, не бизнес-логики: `check-links` (внутр. + /go/), `check-enums`, `check-photos` (cover + ≥5/≥2/остановки, ≤200КБ, бейслайн), `check-interlinks` (≥2, анти-сироты), `check-dedup` (slug-коллизии, обратные пары, Jaccard ≥0.85, бейслайн), `check-parity` (контент только в /en/). Бейслайны нового сайта — **пустые**. Браузерный слой — `qa:browser` (Lighthouse + axe + responsive).

## 22. Деплой и поддержка
Деплой = push в `main` (Cloudflare Workers Build: `npm run build`→`wrangler deploy`). Off-domain: домен живой HTTP 200 ДО индексации (robots `Disallow:/`), GSC-проперти завести заранее. Новости: раздел хранит 10 дней, главная 2 (`daily-news-rebuild.yml`). Дисциплина: каждая статья — сразу коммит+push; доки/календарь/дашборд синхронно.

---

# ЧАСТЬ IV. БУДУЩЕЕ И РОАДМАП

## 23. Путь к мобильным приложениям (Android/iOS)
Контент-коллекции (zod-схемы §11) спроектированы как будущий JSON-API мобильного приложения. Коллекция `cities` (короткая схема) — задел под API, сейчас пуста.

## 24. Роадмап
Движок форкнут (scaffold). Дальше: брендинг → стартовый корпус ~38 тем (front-load из P0/P1 SEO-кластеров, план сайта) волнами объёма → рост ~5/нед по GSC. Детальный план — `docs/new-sites/bosnia-plan-2026-06-30.md` (хаб) + `KALENDAR.md` (репо, заводится при наполнении).

## 25. Открытые решения (нужен ответ владельца)
1. **GA4-ID** — завести Bosnia GA4-свойство, подставить реальный ID вместо `G-PENDING-BOSNIA` (ga-init.js + BaseLayout) ДО запуска.
2. **Брендинг** — палитра/флаг/favicon/иконки/hero/og под Боснию (сейчас плейсхолдер донора).
3. **Тур-партнёр** — Вариант A (без тур-партнёра, day-trips на авто+трансфер+отель — принято) или Вариант B (завести GetYourGuide/Viator через Travelpayouts).
4. **Точки въезда `accessFrom`** — подтвердить набор (sarajevo/mostar/dubrovnik) при наполнении.

**Принято владельцем:** домен **bosniaguidebook.com**, имя **Bosnia and Herzegovina Guidebook**; модель — проверенный справочник (>4★ + видимая дата проверки, без культа автора); **EN-only навсегда**; целевое гео Tier-1/Запад; разделы как в §7; хостинг Cloudflare Workers + Astro 6; монетизация — Вариант A (без тур-партнёра). Полный план — `docs/new-sites/bosnia-plan-2026-06-30.md` (хаб).
