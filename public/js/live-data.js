/**
 * live-data.js — клиентский слой блока «Сейчас в Боснии» (§8.4, Фаза 6).
 *
 * Дотягивает свежие погоду/курс поверх build-time снапшота. Принципы:
 *  - один fetch на загрузку (НЕ polling, §15/правило 8 — без фоновых таймеров);
 *  - кэш в localStorage на 30 мин → повторный заход не дёргает сеть;
 *  - любой сбой источника → значение не трогаем, остаётся снапшот из HTML;
 *  - источники те же, что в build (src/lib/liveSnapshot.ts) — держать синхронно.
 *  - Босния без моря (Неум крошечный) → блока температуры моря нет; курсы $/€/£.
 */
(() => {
  'use strict';
  const root = document.querySelector('[data-live]');
  if (!root) return;

  // Сараево / Мостар / Баня-Лука — те же координаты, что в src/lib/liveSnapshot.ts.
  const AIR_URL =
    'https://api.open-meteo.com/v1/forecast?latitude=43.8563,43.3438,44.7722&longitude=18.4131,17.8078,17.1910&current=temperature_2m';
  // Курс с базой USD: rates[X] = X за 1 USD; марку (BAM) — кросс-курсом.
  const FX_URL = 'https://open.er-api.com/v6/latest/USD';
  const CACHE_KEY = 'ba-live-v1'; // префикс ba- + версия
  const TTL = 30 * 60 * 1000; // 30 минут

  const set = (key, val) => {
    if (val == null) return; // нет свежего значения → оставляем снапшот
    const el = root.querySelector('[data-live="' + key + '"]');
    if (el) el.textContent = val;
  };
  const fmtT = (n) => (typeof n === 'number' ? Math.round(n) + '°' : null);
  const fmtFx = (n) => (typeof n === 'number' ? n.toFixed(2) + ' KM' : null);

  function render(d) {
    if (!d) return;
    set('air-sarajevo', fmtT(d.air && d.air.sarajevo));
    set('air-mostar', fmtT(d.air && d.air.mostar));
    set('air-banjaluka', fmtT(d.air && d.air.banjaluka));
    set('fx-usd', fmtFx(d.fx && d.fx.usd));
    set('fx-eur', fmtFx(d.fx && d.fx.eur));
    set('fx-gbp', fmtFx(d.fx && d.fx.gbp));
    const u = root.querySelector('[data-live="updated"]');
    if (u) {
      try {
        u.textContent = new Intl.DateTimeFormat(undefined, {
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date());
      } catch {
        /* оставляем build-time отметку */
      }
    }
  }

  async function jget(url) {
    try {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 6000);
      const res = await fetch(url, { signal: ctl.signal });
      clearTimeout(timer);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  // Свежий кэш → рисуем из него и не трогаем сеть.
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const c = JSON.parse(raw);
      if (c && c.t && Date.now() - c.t < TTL && c.d) {
        render(c.d);
        return;
      }
    }
  } catch {
    /* localStorage недоступен — просто идём в сеть */
  }

  const runFetch = async () => {
    const [air, fx] = await Promise.all([jget(AIR_URL), jget(FX_URL)]);
    const temp = (x) =>
      x && x.current && typeof x.current.temperature_2m === 'number'
        ? x.current.temperature_2m
        : null;
    const airArr = Array.isArray(air) ? air : [];
    // open.er-api.com: rates[X] = X за 1 USD; марок за единицу = BAM/X × quantity.
    const rates = fx && fx.rates ? fx.rates : null;
    const bamPer = (code, qty) => {
      const bam = rates && typeof rates.BAM === 'number' ? rates.BAM : null;
      const cur = rates && typeof rates[code] === 'number' ? rates[code] : null;
      if (bam == null || cur == null || cur === 0) return null;
      return (bam / cur) * qty;
    };
    const d = {
      air: { sarajevo: temp(airArr[0]), mostar: temp(airArr[1]), banjaluka: temp(airArr[2]) },
      fx: {
        usd: bamPer('USD', 1),
        eur: bamPer('EUR', 1),
        gbp: bamPer('GBP', 1),
      },
    };
    render(d);
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d }));
    } catch {
      /* квота/приватный режим — не критично */
    }
  };
  // Сеть — вне критического пути: дёргаем источники в idle, чтобы не конкурировать
  // с отрисовкой/LCP (аудит P2-2). Снапшот из HTML виден сразу; это лишь догрузка.
  if ('requestIdleCallback' in window) requestIdleCallback(() => runFetch(), { timeout: 3000 });
  else setTimeout(runFetch, 1200);
})();
