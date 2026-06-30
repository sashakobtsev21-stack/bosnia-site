# Bosnia and Herzegovina Guidebook

Контентный сайт-справочник по Боснии и Герцеговине **только на английском (en, на корне `/`)**: достопримечательности, города, еда, маршруты, транспорт, аренда авто, страховки, развлечения, релокация, новости. Монетизация — диверсифицированные партнёрские ссылки только через `/go/{partner}`.

> **Статус: off-domain scaffold (новый сайт второй волны сети).** Движок форкнут с EN-форка-донора сети; донор-контент снят, коллекции пусты (сборка зелёная «по дизайну»), бейслайны гейтов пустые. Контент-модель переведена на Боснию (3 турлогических региона, EN-слаги, валюта BAM/KM). EN-only навсегда (ru/uk нет). Плейсхолдеры до запуска: GA4-ID (`G-PENDING-BOSNIA`), брендинг (палитра/флаг/favicon/hero/og). Дальше — брендинг → контент по плану хаба. Полный план — `docs/new-sites/bosnia-plan-2026-06-30.md` (репо хаба).

> **Off-domain:** `robots.txt` временно `Disallow: /` (до готовности контента). **Деплой** = push в `main` (Cloudflare Workers Builds → `npm run build`). Репозиторий: github.com/sashakobtsev21-stack/bosnia-site.

## Внешний тулинг (плагины Claude Code)

Агенты и дизайн-скиллы **не вшиваются в репозиторий** — подключаются как плагины Claude Code. Точные команды подключения — в **[`SETUP-GUIDE.md`](SETUP-GUIDE.md)**. Если они стоят глобально в `~/.claude/`, к этому репозиторию применяются автоматически.

## Стек

- **Astro 6** (полная статика SSG, без React) + **Content Collections**
- **Tailwind CSS 4**; дизайн-токены — только из `src/styles/tokens.css`
- Хостинг **Cloudflare Workers (Static Assets)** + Worker-роут `/go/` (`worker/index.ts`)
- Изображения webp/avif ≤ 200 КБ через предгенерацию вариантов (`npm run build:covers`)
- PWA (установка + оффлайн); одна аналитика (GA4, Consent Mode v2)

## Команды

| Команда | Что делает |
|---|---|
| `npm run dev` | dev-сервер |
| `npm run build` | прод-сборка (обязана быть без ошибок/предупреждений) |
| `npm run check` | `astro check` — типы и схемы контента |
| `npm run lint` / `npm run format` | ESLint / Prettier |
| `npm test` | контент-гейты: enums · parity · photos · interlinks (≥2) · dedup |
| `npm run new -- <тип> <slug> --title "…"` | скаффолд материала (en + DoD-чеклист) |
| **`npm run qa`** | **финальный GO/NO-GO**: чистая сборка + все гейты + статический аудит `dist/` |

**Перед коммитом:** `npm run qa` → должно быть **GO** (на пустом сайте контент-гейты ожидаемо N/A).

## Структура

```
src/
  components/ layouts/      Astro-компоненты и шаблоны
  content/                  коллекции articles/ routes/ restaurants/ services/ (пусты на scaffold)
  content.config.ts         zod-схемы коллекций
  i18n/                     словарь UI en + types.ts (EN-only)
  styles/tokens.css         дизайн-токены (единственный источник цветов/отступов)
  pages/                    маршрутизация (корень = en)
  lib/ data/ loaders/       утилиты, манифесты, безопасная загрузка коллекций
worker/                     Worker-роут /go/ поверх Static Assets
scripts/                    скаффолдер, фото-конвейер, гейты, QA
public/                     статика, _redirects, _headers, изображения
.claude/agents/ skills/     проектные сабагенты и скиллы
```

## Документация (порядок приоритета при конфликте)

1. **`SPEC.md`** — продукт, ниша, шаблоны, контент-модель, монетизация (источник правды по продукту в репо).
2. **`CLAUDE.md`** — железные правила работы в репозитории.
3. **`SETUP-GUIDE.md`** — подключение внешних агентов/плагинов.
4. **Уровень сети (хаб `multiagent`):** `docs/new-sites/bosnia-plan-2026-06-30.md`, `docs/NEW-SITE-BLUEPRINT.md`, `docs/NEW-SITE-CHECKLIST.md`, `docs/STANDARDS.md`.
