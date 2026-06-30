/**
 * Снапшот «живых» данных для главной (§8.4, Фаза 6): погода (Сараево/Мостар/
 * Баня-Лука) и курс конвертируемой марки BAM/KM (за 1$/1€/1£).
 *
 * Это BUILD-TIME слой гибрида: при сборке тянем данные и зашиваем в HTML
 * (мгновенно видно, 0 CLS, работает без JS). Клиент потом обновляет свежими
 * значениями (/js/live-data.js). Любой сбой источника → null → в UI «—», сборка
 * не падает (try/catch + таймаут). Кэш на уровне модуля: один fetch на сборку,
 * даже если компонент рендерится на нескольких страницах.
 *
 * Босния практически не имеет выхода к морю (Неум — крошечный участок), поэтому
 * блока температуры моря НЕТ. Аудитория EN-first Tier-1 Запад → курсы $/€/£ (без
 * ₽/₴). Источники (без ключей, CORS ok): open-meteo (погода), open.er-api.com
 * (ExchangeRate-API, курс BAM). Цифры не выдумываем (CLAUDE правило 4): нет
 * данных — поле пустое.
 */

export interface LiveSnapshot {
  air: { sarajevo: number | null; mostar: number | null; banjaluka: number | null };
  /** Курс: марок (BAM) за 1 единицу валюты (USD/EUR/GBP — за 1). */
  fx: { usd: number | null; eur: number | null; gbp: number | null };
}

// Координаты: Сараево 43.8563,18.4131 · Мостар 43.3438,17.8078 · Баня-Лука 44.7722,17.1910.
const AIR_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=43.8563,43.3438,44.7722&longitude=18.4131,17.8078,17.1910&current=temperature_2m';
// Курс с базой USD: rates[X] = X за 1 USD; марку (BAM) пересчитываем кросс-курсом.
const FX_URL = 'https://open.er-api.com/v6/latest/USD';

async function jget(url: string, ms = 6000): Promise<unknown> {
  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), ms);
    const res = await fetch(url, { signal: ctl.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

const temp = (loc: unknown): number | null => {
  const c = (loc as { current?: { temperature_2m?: unknown } } | null)?.current?.temperature_2m;
  return typeof c === 'number' ? c : null;
};

let cached: Promise<LiveSnapshot> | null = null;

export function getLiveSnapshot(): Promise<LiveSnapshot> {
  if (!cached) cached = build();
  return cached;
}

async function build(): Promise<LiveSnapshot> {
  const [air, fx] = await Promise.all([jget(AIR_URL), jget(FX_URL)]);

  const airArr = Array.isArray(air) ? air : [];

  // open.er-api.com: { rates: { BAM, EUR, GBP, USD=1, ... } } — все за 1 USD.
  // Марок за единицу валюты = (BAM за 1 USD) / (валюта за 1 USD) × quantity.
  const rates = (fx as { rates?: Record<string, number> } | null)?.rates ?? null;
  const bamPer = (code: string, qty: number): number | null => {
    const bam = rates && typeof rates.BAM === 'number' ? rates.BAM : null;
    const cur = rates && typeof rates[code] === 'number' ? rates[code] : null;
    if (bam == null || cur == null || cur === 0) return null;
    return (bam / cur) * qty;
  };

  return {
    air: { sarajevo: temp(airArr[0]), mostar: temp(airArr[1]), banjaluka: temp(airArr[2]) },
    fx: {
      usd: bamPer('USD', 1),
      eur: bamPer('EUR', 1),
      gbp: bamPer('GBP', 1),
    },
  };
}
