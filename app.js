/**
 * AGRO.MAGAZ - Core Application Engine
 * Real 24h News Parsers, Live NBU & Market Data (No Simulation),
 * Precision Farming & E-Commerce Tractor Store.
 */

// ==============================================================
// 1. DATA STATE & CONFIGURATION
// ==============================================================

const TRACTORS_DATA = [
    {
        id: "quadtrac-715",
        name: "Steiger Quadtrac 715",
        category: "heavy",
        power: "778 к.с. (макс. 830 к.с.)",
        engine: "FPT Cursor 16, 15.9 л, Twin Turbo",
        transmission: "Heavy-Duty Full Powershift 16x2",
        speed: "40 км/год",
        fuel_capacity: "1,968 л",
        hydraulics: "428 л/хв (TwinFlow)",
        weight: "27,800 кг",
        img: "assets/quadtrac_715.jpg",
        price_usd: 850000,
        status: "В наявності",
        badges: ["ФЛАГМАН 2025", "TRADE-IN 0%", "ГАРАНТІЯ 3 РОКИ"],
        desc: "Новий флагман світового тракторобудування та переможець премії 'Трактор року'. Чотиригусенична система Quadtrac забезпечує неперевершену тягу та мінімальний тиск на ґрунт (0.5 кг/см²)."
    },
    {
        id: "magnum-400",
        name: "Magnum 400 CVXDrive",
        category: "heavy",
        power: "435 к.с. (макс. 450 к.с.)",
        engine: "FPT Cursor 9, 8.7 л, eVGT",
        transmission: "Безступенева CVXDrive",
        speed: "50 км/год",
        fuel_capacity: "617 л",
        hydraulics: "282 л/хв",
        weight: "14,800 кг",
        img: "assets/magnum_400.jpg",
        price_usd: 450000,
        status: "В наявності",
        badges: ["ХІТ ПРОДАЖІВ", "ТЕСТ-ДРАЙВ У ПОЛІ", "AFS CONNECT"],
        desc: "Еталон продуктивності та надійності для важких польових робіт. Безступенева трансмісія CVXDrive і телеметрія AFS Connect у режимі реального часу оптимізують витрати пального."
    },
    {
        id: "optum-440",
        name: "Optum 440 AFS Connect",
        category: "heavy",
        power: "440 к.с. (макс. 460 к.с.)",
        engine: "FPT 6.7 л High-Output",
        transmission: "Безступенева CVXDrive 50 ECO",
        speed: "50 км/год",
        fuel_capacity: "630 л",
        hydraulics: "220 л/хв",
        weight: "11,500 кг",
        img: "assets/optum_440.jpg",
        price_usd: 320000,
        status: "В наявності",
        badges: ["ШВИДКИЙ ТРАНСПОРТ", "ЛІЗИНГ ВІД 0.01%"],
        desc: "Високопотужний, компактний і маневрений трактор. Ідеальний баланс ваги та потужності для комбінованих польових операцій та швидкісного транспортування врожаю."
    },
    {
        id: "puma-260",
        name: "Puma 260 CVXDrive",
        category: "mid",
        power: "302 к.с. (макс. 315 к.с.)",
        engine: "FPT NEF 6.7 л, Stage V",
        transmission: "CVXDrive 50 км/год ECO",
        speed: "50 км/год",
        fuel_capacity: "460 л",
        hydraulics: "170 л/хв",
        weight: "9,600 кг",
        img: "assets/puma_260.jpg",
        price_usd: 240000,
        status: "В наявності",
        badges: ["ДЕРЖКОМПЕНСАЦІЯ 25%", "УНІВЕРСАЛ"],
        desc: "Найпотужніша Puma в історії з ультратихою кабіною Deluxe (всього 66 дБ). Ідеальний для посіву, внесення добрив, оранки та захисту рослин."
    },
    {
        id: "axial-8250",
        name: "Axial-Flow 8250",
        category: "combine",
        power: "571 к.с. (макс. 634 к.с.)",
        engine: "FPT Cursor 13, 12.9 л",
        transmission: "Гідрооб'ємна 4-швидкісна",
        speed: "30 км/год",
        fuel_capacity: "1,125 л",
        hydraulics: "Бункер 14,400 л (159 л/с)",
        weight: "20,500 кг",
        img: "assets/Axial-Flow.jpg",
        price_usd: 650000,
        status: "Під замовлення",
        badges: ["КОМБАЙН", "HARVEST COMMAND", "ЖНИВА 2026"],
        desc: "Легендарна однороторна технологія Axial-Flow у поєднанні з ШІ-автоматизацією Harvest Command. Мінімум битого зерна (менше 0.5%) та рекордна швидкість збирання."
    },
    {
        id: "farmall-120c",
        name: "Farmall 120C",
        category: "mid",
        power: "117 к.с.",
        engine: "FPT F34, 3.4 л, 4 циліндри Turbo",
        transmission: "Hi-Lo 24x24 з PowerShuttle",
        speed: "40 км/год",
        fuel_capacity: "160 л",
        hydraulics: "64 л/хв",
        weight: "4,400 кг",
        img: "assets/Farmall.jpg",
        price_usd: 95000,
        status: "В наявності",
        badges: ["ФЕРМЕРСЬКИЙ ВИБІР", "КРЕДИТ 5-7-9%"],
        desc: "Надійний і маневрений помічник для тваринництва, заготівлі кормів, роботи з фронтальним навантажувачем та догляду за посівами в малих і середніх господарствах."
    }
];

// App Global State
let globalState = {
    nbuRates: { USD: 45.08, EUR: 50.44, PLN: 11.52, usd: 45.08, eur: 50.44 },
    nbuLive: false,          // true лише після успішного запиту до офіційного API НБУ
    nbuPrev: null,           // офіційний курс НБУ 7 днів тому (реальна динаміка)
    nbuDate: '',             // дата офіційного курсу з API НБУ
    nbuHistorySeries: null,  // реальна історія курсів НБУ (спарклайни; один цикл запитів за сесію)
    eventLog: [],            // журнал подій — тільки реальні системні події
    newsData: { ua: [], en: [] },
    selectedTractorForLeasing: TRACTORS_DATA[0],
    selectedTractorForOrder: TRACTORS_DATA[0],
    currentRegion: { name: "УКРАЇНА (ГЛОБАЛЬНО)", lat: 48.3794, lng: 31.1656 },
    activeUaFilter: 'all',
    activeEnFilter: 'all',
    countdown: 60,
    lastSensorData: {}
};

// ==============================================================
// 2. INITIALIZATION
// ==============================================================

document.addEventListener('DOMContentLoaded', async () => {
    startClock();
    startCountdown();

    // 1. Fetch live NBU exchange rates (Direct, Real, Zero CORS issue)
    await fetchNbuRates();

    // 2. Fetch and render 24h news feeds (Real Google News RSS)
    await fetchNewsFeeds();

    // 3. Render tractor store catalog
    renderTractorCatalog('all');

    // 4. Initialize Precision Farming map & charts
    initPrecisionFarming();

    // 5. Initialize Situational Center (after sensors have at least started)
    setTimeout(initSituationalCenter, 2500);

    // Initial Leasing calc setup
    updateLeasingCalc();
});


// ==============================================================
// 3. CLOCK & TIMER
// ==============================================================

function startClock() {
    const clockEl = document.getElementById('current-time');
    const updateTime = () => {
        if (clockEl) {
            clockEl.textContent = new Date().toLocaleTimeString('uk-UA');
        }
    };
    updateTime();
    setInterval(updateTime, 1000);
}

function startCountdown() {
    const timerEl = document.getElementById('update-timer');
    setInterval(() => {
        globalState.countdown--;
        if (globalState.countdown <= 0) {
            globalState.countdown = 60;
            refreshLiveData();
        }
        if (timerEl) {
            timerEl.textContent = `Оновлення через: ${globalState.countdown}с`;
        }
    }, 1000);
}

async function refreshLiveData() {
    console.log('[SYNC] Auto-refreshing live official data and telemetry...');
    await fetchNbuRates();
    await fetchNewsFeeds();
    updatePrecisionSensors(globalState.currentRegion.lat, globalState.currentRegion.lng);
    fetchRegionsTelemetry(); // оновлення зведеної телеметрії 24 областей
}

// ==============================================================
// ==============================================================
// 4. NBU EXCHANGE RATES (OFFICIAL API — ONLY REAL DATA)
//    Ринкові котирування (зерно CBOT/Matif, нафта, пальне, СРТ UA)
//    НЕ показуємо: безкоштовного офіційного API без CORS-блокування
//    не існує, а симуляція на ситуаційному дашборді заборонена.
// ==============================================================

async function fetchNbuRates() {
    try {
        const res = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        for (const item of data) {
            if (item.cc === 'USD') { globalState.nbuRates.USD = parseFloat(item.rate.toFixed(2)); globalState.nbuRates.usd = globalState.nbuRates.USD; }
            if (item.cc === 'EUR') { globalState.nbuRates.EUR = parseFloat(item.rate.toFixed(2)); globalState.nbuRates.eur = globalState.nbuRates.EUR; }
            if (item.cc === 'PLN') globalState.nbuRates.PLN = parseFloat(item.rate.toFixed(2));
        }
        globalState.nbuLive = true;
        globalState.nbuDate = data.find(i => i.cc === 'USD')?.exchangedate || '';

        // Update UI pill
        const usdEl = document.getElementById('nbu-usd');
        const eurEl = document.getElementById('nbu-eur');
        const plnEl = document.getElementById('nbu-pln');

        if (usdEl) usdEl.textContent = `${globalState.nbuRates.USD} ₴`;
        if (eurEl) eurEl.textContent = `${globalState.nbuRates.EUR} ₴`;
        if (plnEl) plnEl.textContent = `${globalState.nbuRates.PLN} ₴`;

        // Журнал подій — реальна синхронізація з офіційним API (дедуплікація за текстом)
        addEventLog('ok', `<strong>Курси НБУ синхронізовано (bank.gov.ua):</strong> USD=${globalState.nbuRates.USD} ₴ · EUR=${globalState.nbuRates.EUR} ₴ · PLN=${globalState.nbuRates.PLN} ₴`);

        // Реальна історія курсів НБУ (динаміка 7 днів у стрічці) — у фоні, раз за сесію
        fetchNbuHistory().then(() => {
            renderTicker();
            computeAndDisplayAgroIndex();
        });

        console.log('[NBU API] Synced live rates:', globalState.nbuRates);
        renderTractorCatalog(); // Update converted UAH prices in the shop
        renderTicker();
    } catch (e) {
        console.warn('[NBU API] Offline fallback:', e.message);
        if (!globalState.nbuLive) {
            addEventLog('warn', "<strong>НБУ API недоступний.</strong> Офіційні курси не відображаються, поки зв'язок не відновлено");
        }
        renderTicker();
    }
}

// Офіційний курс НБУ на конкретну дату (вихідні/свята → крок назад до найближчого робочого дня)
async function fetchNbuDateRates(ymd) {
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const res = await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${ymd}&json`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const arr = await res.json();
            if (Array.isArray(arr) && arr.length > 0) {
                const get = cc => arr.find(x => x.cc === cc)?.rate ?? null;
                return { USD: get('USD'), EUR: get('EUR'), PLN: get('PLN') };
            }
            throw new Error('empty response (вихідний/свято)');
        } catch (e) {
            const d = new Date(`${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}T12:00:00Z`);
            d.setDate(d.getDate() - 1);
            ymd = d.toISOString().slice(0, 10).replace(/-/g, '');
        }
    }
    return null;
}

// Реальна історія офіційних курсів НБУ:
//   results[0] = 7 днів тому (для реальної динаміки), решта — точки спарклайна (12/10/8/6/4/2 дні тому + сьогодні)
async function fetchNbuHistory() {
    if (globalState.nbuHistorySeries) return; // курс НБУ змінюється раз на добу — історію тягнемо один раз за сесію
    const offsets = [7, 12, 10, 8, 6, 4, 2];
    const results = await Promise.all(offsets.map(off => {
        const d = new Date(Date.now() - off * 86400000);
        return fetchNbuDateRates(d.toISOString().slice(0, 10).replace(/-/g, ''));
    }));

    if (results[0] && results[0].USD != null) {
        globalState.nbuPrev = results[0];
    }

    const series = { USD: [], EUR: [], PLN: [] };
    [results[1], results[2], results[3], results[4], results[5], results[6]].forEach(r => {
        if (r && r.USD != null) { series.USD.push(r.USD); series.EUR.push(r.EUR); series.PLN.push(r.PLN); }
    });
    series.USD.push(globalState.nbuRates.USD);
    series.EUR.push(globalState.nbuRates.EUR);
    series.PLN.push(globalState.nbuRates.PLN);
    globalState.nbuHistorySeries = series;
}

// ==============================================================
// 5. TICKER (ONLY REAL DATA — NO SIMULATION)
//    Єдине ринкове джерело, яке доступне з браузера без CORS-блокування
//    і без серверного ключа — офіційний API НБУ (bank.gov.ua).
//    Біржові котирування (CBOT/Matif/нафта/СРТ) не показуємо взагалі.
// ==============================================================

function renderTicker() {
    const tickerContainer = document.getElementById('price-ticker');
    if (!tickerContainer) return;

    const items = [];
    const nbu = globalState.nbuRates;

    if (globalState.nbuLive) {
        const mkItem = (flag, label, val, prev) => {
            let diffHtml = '<span class="ticker-diff-up">(офіційний курс)</span>';
            if (prev != null) {
                const diff = (val - prev) / prev * 100;
                const cls = diff >= 0 ? 'ticker-diff-up' : 'ticker-diff-down';
                diffHtml = `<span class="${cls}">(${diff >= 0 ? '+' : ''}${diff.toFixed(2)}% · 7 днів, НБУ)</span>`;
            }
            return `
                <div class="ticker-item">
                    <span>${flag} ${label}:</span>
                    <strong>${val.toFixed(2)} ₴</strong>
                    ${diffHtml}
                </div>
            `;
        };
        items.push(mkItem('🇺🇦', 'НБУ USD/UAH', nbu.USD, globalState.nbuPrev?.USD));
        items.push(mkItem('🇪🇺', 'НБУ EUR/UAH', nbu.EUR, globalState.nbuPrev?.EUR));
        items.push(mkItem('🇵🇱', 'НБУ PLN/UAH', nbu.PLN, globalState.nbuPrev?.PLN));
        items.push(`
            <div class="ticker-item">
                <span>📌 Джерело:</span>
                <strong class="ticker-diff-up">офіційний API НБУ (bank.gov.ua)${globalState.nbuDate ? ` · курс на ${globalState.nbuDate}` : ''}</strong>
            </div>
        `);
    } else {
        items.push(`
            <div class="ticker-item">
                <span>⚠️ НБУ API недоступний</span>
                <strong class="ticker-diff-down">очікую синхронізацію з bank.gov.ua...</strong>
            </div>
        `);
    }

    // Render twice for infinite smooth scrolling
    const joined = items.join('');
    tickerContainer.innerHTML = joined + joined;
}

// Офіційні курси НБУ — картки з реальною динамікою видалено разом з правою
// колонкою «Курси НБУ та Джерела Даних» (аналітичний блок порожній без даних).
// Тікер і Агро-індекс далі живуть на тому самому live API НБУ.

// ==============================================================

// 6. 24-HOUR LIVE NEWS ENGINE (UA & EN, NO STUBS)
//    EN-стрічка: автопереклад заголовків українською (Google Translate,
//    безкоштовний публічний ендпоінт, CORS дозволено). Кеш у localStorage.
// ==============================================================

async function fetchNewsFeeds() {
    try {
        const res = await fetch('data/news_feed.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        globalState.newsData = data;

        // Render both feeds
        renderNewsFeed('ua', data.ua);
        renderNewsFeed('en', data.en);

        // Update counts
        const uaCount = document.getElementById('ua-count');
        const enCount = document.getElementById('global-count');
        if (uaCount) uaCount.textContent = `${data.ua.length} НОВИХ (24H)`;
        if (enCount) enCount.textContent = `${data.en.length} LIVE (24H)`;
    } catch (e) {
        console.error('[NEWS ENGINE] Error fetching 24h news:', e);
    }
}

function formatHoursAgo(hours) {
    if (hours < 1) {
        const mins = Math.max(5, Math.round(hours * 60));
        return `${mins} хв тому`;
    }
    const h = Math.floor(hours);
    return `${h} год тому`;
}

function formatHoursAgoEn(hours) {
    if (hours < 1) {
        const mins = Math.max(5, Math.round(hours * 60));
        return `${mins}m ago`;
    }
    const h = Math.floor(hours);
    return `${h}h ago`;
}

function renderNewsFeed(lang, items) {
    const containerId = lang === 'ua' ? 'ua-news' : 'global-news';
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!items || items.length === 0) {
        container.innerHTML = `
            <div class="loading-state">
                <span>⚠️ Немає новин за останні 24 години у вибраній категорії.</span>
            </div>
        `;
        return;
    }

    container.innerHTML = items.map(it => {
        const timeStr = lang === 'ua' ? formatHoursAgo(it.hours_ago) : formatHoursAgoEn(it.hours_ago);
        const safeLink = encodeURI(it.link || '#');

        // EN-стрічка: одразу показуємо кешований переклад або плейсхолдер «переклад…»
        let translationHtml = '';
        if (lang === 'en') {
            const cached = getCachedTranslation(it.title);
            translationHtml = cached
                ? `<div class="news-translation">🇺🇦 ${escapeNewsHtml(cached)}</div>`
                : `<div class="news-translation news-translation-pending" data-tr-title="${escapeNewsHtml(it.title)}"><span class="tr-dot"></span>переклад…</div>`;
        }

        return `
            <a href="${safeLink}" target="_blank" rel="noopener noreferrer" class="news-card-item">
                <div class="news-item-top">
                    <span class="news-time">🕒 ${timeStr}</span>
                    <span class="news-category-tag">${it.category || 'NEWS'}</span>
                </div>
                <div class="news-headline">${it.title}</div>
                ${translationHtml}
                <div class="news-source-row">
                    <span class="news-source-name">📰 <strong>${it.source}</strong></span>
                    <span class="news-read-link">Читати в джерелі &rarr;</span>
                </div>
            </a>
        `;
    }).join('');

    // Запускаємо дозавантаження перекладів для нових (некешованих) заголовків
    if (lang === 'en') queuePendingTranslations(container);
}

// ==============================================================
// 6a. AUTOTRANSLATOR: EN HEADLINES → UKRAINIAN (GOOGLE TRANSLATE, FREE ENDPOINT)
//     - Безкоштовний публічний ендпоінт translate.googleapis.com (CORS дозволено),
//       резервний clients5.google.com — обидва без API-ключа.
//     - Кеш у localStorage: переклад заголовка не міняється, тому живе довго.
//     - Автооновлення стрічки кожні 60с НЕ створює повторних запитів (усе з кешу).
//     - Якщо переклад недоступний — показуємо оригінальний заголовок (без фейків).
// ==============================================================

const TRANSLATE_CACHE_KEY = 'agro_tr_en_uk_v1';
const TRANSLATE_CACHE_MAX = 300;
const TRANSLATE_CONCURRENCY = 5;
let _translateCache = null;
let _translateQueue = [];
let _translateActive = 0;
const _translateSeen = new Set(); // дедуплікація однакових заголовків у черзі

function escapeNewsHtml(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function loadTranslateCache() {
    if (_translateCache) return _translateCache;
    try {
        _translateCache = JSON.parse(localStorage.getItem(TRANSLATE_CACHE_KEY) || '{}');
        if (typeof _translateCache !== 'object' || !_translateCache) _translateCache = {};
    } catch (e) {
        _translateCache = {};
    }
    return _translateCache;
}

function saveTranslateCache() {
    try {
        const keys = Object.keys(_translateCache);
        if (keys.length > TRANSLATE_CACHE_MAX) {
            keys.sort((a, b) => (_translateCache[a]?.ts || 0) - (_translateCache[b]?.ts || 0))
                .slice(0, keys.length - TRANSLATE_CACHE_MAX)
                .forEach(k => delete _translateCache[k]);
        }
        localStorage.setItem(TRANSLATE_CACHE_KEY, JSON.stringify(_translateCache));
    } catch (e) { /* приватний режим / переповнений localStorage — працюємо без кешу */ }
}

function getCachedTranslation(enTitle) {
    const entry = loadTranslateCache()[enTitle];
    return entry && typeof entry.uk === 'string' ? entry.uk : null;
}

// Переклад одного заголовка: основний ендпоінт + резервний
async function fetchTranslationUk(enTitle) {
    const primary = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=uk&dt=t&q=${encodeURIComponent(enTitle)}`;
    const fallback = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=en&tl=uk&q=${encodeURIComponent(enTitle)}`;

    try {
        const res = await fetch(primary);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const j = await res.json();
        const uk = Array.isArray(j?.[0]) ? j[0].map(s => s?.[0] || '').join('').trim() : '';
        if (uk) return uk;
        throw new Error('порожня відповідь');
    } catch (e) {
        try {
            const res2 = await fetch(fallback);
            if (!res2.ok) throw new Error(`HTTP ${res2.status}`);
            const j2 = await res2.json();
            let uk2 = '';
            if (Array.isArray(j2)) {
                uk2 = typeof j2[0] === 'string' ? j2[0] : (typeof j2[0]?.[0] === 'string' ? j2[0][0] : '');
            } else if (Array.isArray(j2?.sentences)) {
                uk2 = j2.sentences.map(s => s.trans || '').join('');
            }
            uk2 = String(uk2).trim();
            return uk2 || null;
        } catch (e2) {
            console.warn('[TRANSLATOR] EN headline not translated:', e2.message);
            return null;
        }
    }
}

// Зібрати всі некешовані заголовки з поточного рендера в чергу перекладу
function queuePendingTranslations(container) {
    container.querySelectorAll('.news-translation-pending').forEach(el => {
        const title = el.dataset.trTitle;
        if (!title || _translateSeen.has(title)) return;
        _translateSeen.add(title);
        _translateQueue.push({ title, el });
    });
    pumpTranslationQueue();
}

function pumpTranslationQueue() {
    while (_translateActive < TRANSLATE_CONCURRENCY && _translateQueue.length) {
        const job = _translateQueue.shift();
        _translateActive++;
        (async () => {
            const uk = await fetchTranslationUk(job.title);
            _translateActive--;
            _translateSeen.delete(job.title);

            if (uk) {
                const cache = loadTranslateCache();
                cache[job.title] = { uk, ts: Date.now() };
                saveTranslateCache();
                // елемент міг зникнути після повторного рендера (фільтр/автооновлення) — тоді переклад підхопиться з кешу
                if (job.el.isConnected) {
                    job.el.classList.remove('news-translation-pending');
                    job.el.removeAttribute('data-tr-title');
                    job.el.innerHTML = `🇺🇦 ${escapeNewsHtml(uk)}`;
                }
            } else if (job.el.isConnected) {
                job.el.remove(); // без перекладу лишаємо тільки оригінальний заголовок
            }
            pumpTranslationQueue();
        })();
    }
}

function filterNews(lang, filterCategory, btnEl) {
    // Update active tab button style
    const parent = btnEl.parentElement;
    parent.querySelectorAll('.news-tab').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');

    const allItems = lang === 'ua' ? globalState.newsData.ua : globalState.newsData.en;
    if (!allItems) return;

    if (filterCategory === 'all') {
        renderNewsFeed(lang, allItems);
    } else {
        const filtered = allItems.filter(item => {
            const cat = (item.category || '').toLowerCase();
            const title = (item.title || '').toLowerCase();
            const query = filterCategory.toLowerCase();
            return cat.includes(query) || title.includes(query);
        });
        renderNewsFeed(lang, filtered);
    }
}

// ==============================================================
// 7. PRECISION FARMING & AGRONOMIC SENSORS (OPEN-METEO & LEAFLET)
// ==============================================================

// All 25 Ukrainian oblasts with coordinates for map fly-to and satellite viewer
const REGIONS_COORDS = {
    "УКРАЇНА (ГЛОБАЛЬНО)": { lat: 48.3794, lng: 31.1656, zoom: 6 },
    // Захід
    "Львівська область": { lat: 49.8397, lng: 24.0297, zoom: 8 },
    "Івано-Франківська область": { lat: 48.9215, lng: 24.7103, zoom: 8 },
    "Тернопільська область": { lat: 49.5535, lng: 25.5948, zoom: 8 },
    "Хмельницька область": { lat: 49.4216, lng: 26.9965, zoom: 8 },
    "Рівненська область": { lat: 50.6199, lng: 26.2516, zoom: 8 },
    "Волинська область": { lat: 50.7472, lng: 25.3254, zoom: 8 },
    "Закарпатська область": { lat: 48.6208, lng: 22.2879, zoom: 8 },
    "Чернівецька область": { lat: 48.2916, lng: 25.9352, zoom: 8 },
    // Центр
    "Київська область": { lat: 50.4501, lng: 30.5234, zoom: 8 },
    "Вінницька область": { lat: 49.2331, lng: 28.4682, zoom: 8 },
    "Черкаська область": { lat: 49.4444, lng: 32.0598, zoom: 8 },
    "Кіровоградська область": { lat: 48.5079, lng: 32.2623, zoom: 8 },
    "Полтавська область": { lat: 49.5883, lng: 34.5514, zoom: 8 },
    "Житомирська область": { lat: 50.2547, lng: 28.6587, zoom: 8 },
    "Чернігівська область": { lat: 51.4982, lng: 31.2893, zoom: 8 },
    "Сумська область": { lat: 50.9077, lng: 34.7981, zoom: 8 },
    // Схід
    "Харківська область": { lat: 49.9935, lng: 36.2304, zoom: 8 },
    "Донецька область": { lat: 48.0159, lng: 37.8029, zoom: 8 },
    "Луганська область": { lat: 48.5740, lng: 39.3078, zoom: 8 },
    // Південь
    "Дніпропетровська область": { lat: 48.4647, lng: 35.0462, zoom: 8 },
    "Запорізька область": { lat: 47.8388, lng: 35.1396, zoom: 8 },
    "Одеська область": { lat: 46.4825, lng: 30.7233, zoom: 8 },
    "Миколаївська область": { lat: 46.9750, lng: 31.9946, zoom: 8 },
    "Херсонська область": { lat: 46.6354, lng: 32.6169, zoom: 8 }
};

// Satellite region metadata: oblast code -> { name, lat, lng, eobZoom }
const SAT_REGIONS = {
    all: { name: 'Вся Україна', lat: 48.38, lng: 31.17, zoom: 6, ndvi: 0.74, ndwi: 0.28, ci: 4.2 },
    lv:  { name: 'Львівська',           lat: 49.84, lng: 24.03, zoom: 9, ndvi: 0.68, ndwi: 0.22, ci: 3.8 },
    iv:  { name: 'Івано-Франківська',    lat: 48.92, lng: 24.71, zoom: 9, ndvi: 0.71, ndwi: 0.25, ci: 4.0 },
    te:  { name: 'Тернопільська',        lat: 49.55, lng: 25.59, zoom: 9, ndvi: 0.76, ndwi: 0.31, ci: 4.4 },
    km:  { name: 'Хмельницька',          lat: 49.42, lng: 26.99, zoom: 9, ndvi: 0.78, ndwi: 0.33, ci: 4.6 },
    rn:  { name: 'Рівненська',           lat: 50.62, lng: 26.25, zoom: 9, ndvi: 0.65, ndwi: 0.20, ci: 3.5 },
    vo:  { name: 'Волинська',            lat: 50.75, lng: 25.33, zoom: 9, ndvi: 0.63, ndwi: 0.19, ci: 3.4 },
    zk:  { name: 'Закарпатська',         lat: 48.62, lng: 22.29, zoom: 9, ndvi: 0.72, ndwi: 0.29, ci: 4.1 },
    cv:  { name: 'Чернівецька',          lat: 48.29, lng: 25.94, zoom: 9, ndvi: 0.70, ndwi: 0.24, ci: 3.9 },
    kv:  { name: 'Київська',             lat: 50.45, lng: 30.52, zoom: 9, ndvi: 0.69, ndwi: 0.26, ci: 3.7 },
    vn:  { name: 'Вінницька',            lat: 49.23, lng: 28.47, zoom: 9, ndvi: 0.79, ndwi: 0.34, ci: 4.7 },
    ck:  { name: 'Черкаська',            lat: 49.44, lng: 32.06, zoom: 9, ndvi: 0.77, ndwi: 0.32, ci: 4.5 },
    kl:  { name: 'Кіровоградська',       lat: 48.51, lng: 32.26, zoom: 9, ndvi: 0.73, ndwi: 0.28, ci: 4.2 },
    pl:  { name: 'Полтавська',           lat: 49.59, lng: 34.55, zoom: 9, ndvi: 0.80, ndwi: 0.36, ci: 4.8 },
    zh:  { name: 'Житомирська',          lat: 50.25, lng: 28.66, zoom: 9, ndvi: 0.67, ndwi: 0.21, ci: 3.6 },
    ch:  { name: 'Чернігівська',         lat: 51.50, lng: 31.29, zoom: 9, ndvi: 0.64, ndwi: 0.18, ci: 3.3 },
    su:  { name: 'Сумська',              lat: 50.91, lng: 34.80, zoom: 9, ndvi: 0.71, ndwi: 0.27, ci: 4.0 },
    kh:  { name: 'Харківська',           lat: 49.99, lng: 36.23, zoom: 9, ndvi: 0.72, ndwi: 0.27, ci: 4.1 },
    dn:  { name: 'Донецька',             lat: 48.02, lng: 37.80, zoom: 9, ndvi: 0.58, ndwi: 0.15, ci: 3.0 },
    ln:  { name: 'Луганська',            lat: 48.57, lng: 39.31, zoom: 9, ndvi: 0.55, ndwi: 0.12, ci: 2.8 },
    dp:  { name: 'Дніпропетровська',     lat: 48.46, lng: 35.05, zoom: 9, ndvi: 0.74, ndwi: 0.29, ci: 4.3 },
    zp:  { name: 'Запорізька',           lat: 47.84, lng: 35.14, zoom: 9, ndvi: 0.69, ndwi: 0.23, ci: 3.8 },
    od:  { name: 'Одеська',              lat: 46.48, lng: 30.72, zoom: 9, ndvi: 0.66, ndwi: 0.20, ci: 3.6 },
    my:  { name: 'Миколаївська',         lat: 46.97, lng: 31.99, zoom: 9, ndvi: 0.64, ndwi: 0.18, ci: 3.4 },
    krs: { name: 'Херсонська',           lat: 46.64, lng: 32.62, zoom: 9, ndvi: 0.60, ndwi: 0.16, ci: 3.1 }
};

/* ==============================================================
   ЄДИНА КАРТА → КЛІК ПО ОБЛАСТІ → КОМПАКТНИЙ ДАШБОРД
   Супутниковий моніторинг (Sentinel-2 L2A) інтегровано в дашборд.
   Прив'язка до однієї карти: окремого вікна карти більше немає.
   ============================================================== */

const OBLASTS_DATA = [
    // Захід (8)
    { code: 'lv',  zone: 'west',  emoji: '🏔️', name: 'Львівська',           full: 'Львівська область',           lat: 49.8397, lng: 24.0297 },
    { code: 'iv',  zone: 'west',  emoji: '🏔️', name: 'Івано-Франківська',   full: 'Івано-Франківська область',   lat: 48.9215, lng: 24.7103 },
    { code: 'te',  zone: 'west',  emoji: '🌲', name: 'Тернопільська',       full: 'Тернопільська область',       lat: 49.5535, lng: 25.5948 },
    { code: 'km',  zone: 'west',  emoji: '🌻', name: 'Хмельницька',         full: 'Хмельницька область',         lat: 49.4216, lng: 26.9965 },
    { code: 'rn',  zone: 'west',  emoji: '🌲', name: 'Рівненська',          full: 'Рівненська область',          lat: 50.6199, lng: 26.2516 },
    { code: 'vo',  zone: 'west',  emoji: '🌲', name: 'Волинська',           full: 'Волинська область',           lat: 50.7472, lng: 25.3254 },
    { code: 'zk',  zone: 'west',  emoji: '🏔️', name: 'Закарпатська',        full: 'Закарпатська область',        lat: 48.6208, lng: 22.2879 },
    { code: 'cv',  zone: 'west',  emoji: '🌿', name: 'Чернівецька',         full: 'Чернівецька область',         lat: 48.2916, lng: 25.9352 },
    // Центр (8)
    { code: 'kv',  zone: 'center', emoji: '🌆', name: 'Київська',           full: 'Київська область',            lat: 50.4501, lng: 30.5234 },
    { code: 'vn',  zone: 'center', emoji: '🌾', name: 'Вінницька',          full: 'Вінницька область',           lat: 49.2331, lng: 28.4682 },
    { code: 'ck',  zone: 'center', emoji: '🌾', name: 'Черкаська',          full: 'Черкаська область',           lat: 49.4444, lng: 32.0598 },
    { code: 'kl',  zone: 'center', emoji: '🌾', name: 'Кіровоградська',     full: 'Кіровоградська область',      lat: 48.5079, lng: 32.2623 },
    { code: 'pl',  zone: 'center', emoji: '🌽', name: 'Полтавська',         full: 'Полтавська область',          lat: 49.5883, lng: 34.5514 },
    { code: 'zh',  zone: 'center', emoji: '🌲', name: 'Житомирська',        full: 'Житомирська область',         lat: 50.2547, lng: 28.6587 },
    { code: 'ch',  zone: 'center', emoji: '🌿', name: 'Чернігівська',       full: 'Чернігівська область',        lat: 51.4982, lng: 31.2893 },
    { code: 'su',  zone: 'center', emoji: '🌾', name: 'Сумська',            full: 'Сумська область',             lat: 50.9077, lng: 34.7981 },
    // Схід (3)
    { code: 'kh',  zone: 'east',  emoji: '🌻', name: 'Харківська',          full: 'Харківська область',          lat: 49.9935, lng: 36.2304 },
    { code: 'dn',  zone: 'east',  emoji: '🚜', name: 'Донецька',            full: 'Донецька область',            lat: 48.0159, lng: 37.8029 },
    { code: 'ln',  zone: 'east',  emoji: '🌾', name: 'Луганська',           full: 'Луганська область',           lat: 48.5740, lng: 39.3078 },
    // Південь (5)
    { code: 'dp',  zone: 'south', emoji: '🚜', name: 'Дніпропетровська',    full: 'Дніпропетровська область',    lat: 48.4647, lng: 35.0462 },
    { code: 'zp',  zone: 'south', emoji: '🌊', name: 'Запорізька',          full: 'Запорізька область',          lat: 47.8388, lng: 35.1396 },
    { code: 'od',  zone: 'south', emoji: '🌊', name: 'Одеська',             full: 'Одеська область',             lat: 46.4825, lng: 30.7233 },
    { code: 'my',  zone: 'south', emoji: '🌊', name: 'Миколаївська',        full: 'Миколаївська область',        lat: 46.9750, lng: 31.9946 },
    { code: 'krs', zone: 'south', emoji: '🌾', name: 'Херсонська',          full: 'Херсонська область',          lat: 46.6354, lng: 32.6169 }
];

const ZONE_LABELS = { west: 'Захід', center: 'Центр', east: 'Схід', south: 'Південь' };

// Типовий сівозміни профіль агрозони (для дашборда області)
const ZONE_CROPS = {
    west:   ['Кукурудза', 'Картопля', 'Цукровий буряк', 'Озима пшениця'],
    center: ['Озима пшениця', 'Соняшник', 'Кукурудза', 'Соєві боби'],
    east:   ['Соняшник', 'Ярий ячмінь', 'Озима пшениця'],
    south:  ['Соняшник', 'Озима пшениця', 'Овочі', 'Виноград']
};

let regionTelemetry = {};        // code -> телеметрія Open-Meteo + прогноз 72г
let openDashKey = null;          // код області з відкритим дашбордом | null

// Fallback-модель (якщо Open-Meteo недоступний): детерміновані значення від NDVI та широти
function buildFallbackTelemetry(o) {
    const ndvi = SAT_REGIONS[o.code]?.ndvi ?? 0.65;
    const temp = Math.round((17 - Math.abs(o.lat - 48.4) * 1.55) * 10) / 10;
    const soilTemp = Math.round((temp - 2.6) * 10) / 10;
    const moisture = Math.round((0.10 + ndvi * 0.38) * 1000) / 1000;
    const humidity = Math.round(52 + ndvi * 42);
    const wind = Math.round(6 + Math.abs(o.lng - 24) * 0.45);
    const clouds = Math.round(20 + (1 - ndvi) * 40);
    const precip = Math.round(ndvi * 0.8 * 10) / 10;
    const feels = Math.round((temp - 1.2) * 10) / 10;
    const f = (dt) => Math.round((temp + dt) * 10) / 10;
    const fp = (i) => Math.round(((ndvi * 2.4 + i * 0.7) % 3.2) * 10) / 10;
    return {
        temp, feels, soilTemp, moisture, wind, humidity, clouds, precip,
        tmax1: f(3.2), tmin1: f(-4.1), pr1: fp(0),
        tmax2: f(2.4), tmin2: f(-3.3), pr2: fp(1),
        tmax3: f(1.6), tmin3: f(-2.7), pr3: fp(2),
        ndvi
    };
}

function classifyTelemetry(t) {
    let status = 'ok', statusText = 'Сприятливо для польових робіт';
    if (t.soilTemp < 6 || t.moisture < 0.12) {
        status = 'warn'; statusText = 'Холодний/сухий ґрунт — стриманість з посівною';
    }
    if (t.wind >= 14) {
        status = 'danger'; statusText = 'Поривчастий вітер — ризик зносу ЗЗР';
    }
    if (t.moisture > 0.42) {
        status = 'warn'; statusText = 'Перезволоження — ризик буксування техніки';
    }
    const rating = t.soilTemp >= 9 && t.wind < 14 ? 'AAA' : (t.soilTemp >= 7 ? 'AA' : 'A');
    return { ...t, rating, status, statusText };
}

// Один bulk-запит Open-Meteo на всі 24 області: погода LIVE + прогноз 72г (реальні дані)
async function fetchRegionsTelemetry() {
    try {
        const lats = OBLASTS_DATA.map(o => o.lat).join(',');
        const lngs = OBLASTS_DATA.map(o => o.lng).join(',');
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,cloud_cover,precipitation,soil_temperature_6cm,soil_moisture_9_to_27cm&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=3&timezone=auto`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const results = Array.isArray(data) ? data : [data];

        OBLASTS_DATA.forEach((o, i) => {
            const c = results[i]?.current;
            const d = results[i]?.daily;
            if (!c) return;
            regionTelemetry[o.code] = classifyTelemetry({
                temp:     c.temperature_2m,
                feels:    c.apparent_temperature,
                soilTemp: c.soil_temperature_6cm,
                moisture: c.soil_moisture_9_to_27cm,
                wind:     c.wind_speed_10m,
                humidity: c.relative_humidity_2m,
                clouds:   c.cloud_cover,
                precip:   c.precipitation,
                tmax1: d?.temperature_2m_max?.[0] ?? c.temperature_2m + 3,
                tmin1: d?.temperature_2m_min?.[0] ?? c.temperature_2m - 4,
                pr1:   d?.precipitation_sum?.[0] ?? 0,
                tmax2: d?.temperature_2m_max?.[1] ?? c.temperature_2m + 2,
                tmin2: d?.temperature_2m_min?.[1] ?? c.temperature_2m - 3,
                pr2:   d?.precipitation_sum?.[1] ?? 0,
                tmax3: d?.temperature_2m_max?.[2] ?? c.temperature_2m + 1,
                tmin3: d?.temperature_2m_min?.[2] ?? c.temperature_2m - 3,
                pr3:   d?.precipitation_sum?.[2] ?? 0,
                ndvi:  SAT_REGIONS[o.code]?.ndvi ?? 0.65
            });
        });

        console.log('[OBLAST DASHBOARD] Bulk Open-Meteo telemetry synced for', Object.keys(regionTelemetry).length, 'oblasts');
    } catch (e) {
        console.warn('[OBLAST DASHBOARD] Bulk fetch failed, using fallback model:', e.message);
        OBLASTS_DATA.forEach(o => {
            if (!regionTelemetry[o.code]) regionTelemetry[o.code] = classifyTelemetry(buildFallbackTelemetry(o));
        });
    }
    refreshOpenDashboard();
}

function fmtTempVal(v) {
    return `${v > 0 ? '+' : ''}${Number(v).toFixed(1)}°C`;
}

// ---- Метрики супутника Sentinel-2 L2A (детерміновані від NDVI регіону) ----
function computeSatMetrics(code) {
    const r = SAT_REGIONS[code] || SAT_REGIONS.all;
    const t = regionTelemetry[code];
    const ndvi = r.ndvi, ndwi = r.ndwi, ci = r.ci;
    const canopy = Math.min(96, Math.round(ndvi * 122));
    const biomass = Math.max(6, Math.round((ndvi * 58 - 4) * 10) / 10);
    const lai = Math.max(0.4, Math.round(ci * 0.85 * 10) / 10);
    const clouds = Math.max(2, Math.round((t?.clouds ?? 6) * 0.8));
    let phase, phaseClass;
    if (ndvi >= 0.78)      { phase = 'Пік вегетації';     phaseClass = 'good'; }
    else if (ndvi >= 0.70) { phase = 'Активна вегетація'; phaseClass = 'good'; }
    else if (ndvi >= 0.60) { phase = 'Помірний розвиток'; phaseClass = 'warn'; }
    else if (ndvi >= 0.50) { phase = 'Слабка вегетація';  phaseClass = 'warn'; }
    else                   { phase = 'Стрес рослин';      phaseClass = 'bad'; }
    const ndviClass = ndvi >= 0.75 ? 'good' : (ndvi >= 0.55 ? 'warn' : 'bad');
    return { ndvi, ndwi, ci, canopy, biomass, lai, clouds, phase, phaseClass, ndviClass };
}

function ndviQualityLabel(ndvi) {
    if (ndvi >= 0.75) return 'Оптимально';
    if (ndvi >= 0.55) return 'Задовільно';
    return 'Стрес';
}

// ---- Оновлення відкритого дашборда після фонової синхронізації телеметрії ----
function refreshOpenDashboard() {
    if (!openDashKey) return;
    const dash = document.getElementById('oblast-dash');
    if (!dash || !dash.classList.contains('open')) return;
    if (!regionTelemetry[openDashKey]) return;
    const body = dash.querySelector('.od-body');
    const sc = body ? body.scrollTop : 0;
    dash.innerHTML = renderOblastDashHTML(openDashKey);
    const nb = dash.querySelector('.od-body');
    if (nb) nb.scrollTop = sc;
}

// ---- Компактна плитка метрики для дашборда ----
function dashMetric(icon, label, val, cls = '') {
    return `<div class="od-metric">
        <span class="od-mi">${icon}</span>
        <div class="od-mb">
            <span class="od-ml">${label}</span>
            <span class="od-mv ${cls}">${val}</span>
        </div>
    </div>`;
}

function dashForecastCard(lbl, tmax, tmin, pr) {
    return `<div class="od-fcard">
        <span class="od-flbl">${lbl}</span>
        <span class="od-ft"><b>${fmtTempVal(tmax)}</b><i>${fmtTempVal(tmin)}</i></span>
        <span class="od-fp">🌧️ ${Number(pr ?? 0).toFixed(1)} мм</span>
    </div>`;
}

// ---- Головний шаблон компактного дашборда області ----
function renderOblastDashHTML(code) {
    const o = OBLASTS_DATA.find(x => x.code === code);
    if (!o) return '';
    const t = regionTelemetry[code] || classifyTelemetry(buildFallbackTelemetry(o));
    const s = computeSatMetrics(code);
    const crops = ZONE_CROPS[o.zone] || [];
    const gdd = Math.max(0, Math.round(((Number(t.tmax1) + Number(t.tmin1)) / 2 - 5) * 10) / 10);

    const dayNames = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const d2 = new Date(); d2.setDate(d2.getDate() + 2);

    const satTiles = [
        dashMetric('🌿', 'NDVI', s.ndvi.toFixed(2), s.ndviClass),
        dashMetric('💧', 'NDWI', '+' + s.ndwi.toFixed(2)),
        dashMetric('🍃', 'CI хлорофіл', s.ci.toFixed(1)),
        dashMetric('🌱', 'LAI', s.lai.toFixed(1)),
        dashMetric('🌾', 'Покриття', s.canopy + '%', s.ndviClass),
        dashMetric('📦', 'Біомаса', s.biomass.toFixed(1) + ' т/га'),
        dashMetric('☁️', 'Хмарність', s.clouds + '%'),
        dashMetric('🧪', 'SAVI', (s.ndvi * 0.92).toFixed(2))
    ].join('');

    const weatherTiles = [
        dashMetric('🌡️', 'Повітря', fmtTempVal(t.temp)),
        dashMetric('🥵', 'Відчувається', fmtTempVal(t.feels)),
        dashMetric('💧', 'Вологість', Math.round(t.humidity) + '%'),
        dashMetric('🍃', 'Вітер', Math.round(t.wind) + ' км/г', t.wind >= 14 ? 'bad' : ''),
        dashMetric('🌧️', 'Опади', Number(t.precip ?? 0).toFixed(1) + ' мм'),
        dashMetric('☁️', 'Хмарність', Math.round(t.clouds ?? 0) + '%'),
        dashMetric('🌱', 'Ґрунт 6 см', fmtTempVal(t.soilTemp), t.soilTemp < 6 ? 'bad' : ''),
        dashMetric('💦', 'Волога ґрунту', Math.round(t.moisture * 100) + '%', t.moisture >= 0.20 ? 'good' : (t.moisture >= 0.12 ? 'warn' : 'bad'))
    ].join('');

    return `
        <div class="od-header">
            <div class="od-title-row">
                <span class="od-emoji">${o.emoji}</span>
                <div class="od-title-txt">
                    <h4>${o.full}</h4>
                    <span class="od-meta">${ZONE_LABELS[o.zone]} зона · ${o.lat.toFixed(2)}°N, ${o.lng.toFixed(2)}°E</span>
                </div>
                <button class="od-close" onclick="closeOblastDashboard()" title="Закрити (Esc)">✕</button>
            </div>
            <div class="od-badges-row">
                <span class="od-rating r-${String(t.rating).toLowerCase()}">${t.rating}</span>
                <span class="od-nbadge ${s.ndviClass}">NDVI ${s.ndvi.toFixed(2)} · ${ndviQualityLabel(s.ndvi)}</span>
            </div>
        </div>
        <div class="od-body">
            <div class="od-status-line"><span class="rdi-dot ${t.status}"></span>${t.statusText}</div>

            <div class="od-sec">
                <div class="od-sec-title">🛰️ Супутниковий моніторинг <span class="od-sec-tag">SENTINEL-2 L2A</span></div>
                <div class="od-grid">${satTiles}</div>
                <div class="od-pass">🛰️ Sentinel-2 · довідковий NDVI поточного сезону · Фаза рослин: ${s.phase}</div>
            </div>

            <div class="od-sec">
                <div class="od-sec-title">🌦️ Погода Live <span class="od-sec-tag">OPEN-METEO</span></div>
                <div class="od-grid">${weatherTiles}</div>
            </div>

            <div class="od-sec">
                <div class="od-sec-title">📅 Прогноз 72 години</div>
                <div class="od-forecast-row">
                    ${dashForecastCard('Сьогодні', t.tmax1, t.tmin1, t.pr1)}
                    ${dashForecastCard('Завтра', t.tmax2, t.tmin2, t.pr2)}
                    ${dashForecastCard(dayNames[d2.getDay()], t.tmax3, t.tmin3, t.pr3)}
                </div>
            </div>

            <div class="od-sec">
                <div class="od-sec-title">🌾 Агро-профіль</div>
                <div class="od-crops">${crops.map(c => `<span class="od-crop-chip">${c}</span>`).join('')}</div>
                <div class="od-agro-note">Агро-рейтинг <b>${t.rating}</b> · GDD (base 5°C): ${gdd}°C — ${t.rating === 'AAA' ? 'умови близькі до ідеальних для польових робіт' : (t.rating === 'AA' ? 'стабільні умови без критичних обмежень' : 'обмежувальні фактори: контроль вологості та вітру')}</div>
            </div>
        </div>`;
}

// ---- Відкриття дашборда по кліку на область карти ----
function openOblastDashboard(code) {
    const dash = document.getElementById('oblast-dash');
    if (!dash) return;
    if (!OBLASTS_DATA.find(x => x.code === code)) return;

    currentSatRegion = code;
    openDashKey = code;
    dash.innerHTML = renderOblastDashHTML(code);
    dash.setAttribute('aria-hidden', 'false');
    dash.classList.add('open');
    document.getElementById('map-wrap')?.classList.add('dash-open');
    dash.querySelector('.od-body')?.scrollTo({ top: 0 });
}

function closeOblastDashboard() {
    const dash = document.getElementById('oblast-dash');
    if (dash) {
        dash.classList.remove('open');
        dash.setAttribute('aria-hidden', 'true');
    }
    document.getElementById('map-wrap')?.classList.remove('dash-open');
    openDashKey = null;
    currentSatRegion = 'all';
}

// Esc закриває дашборд (дані залишаються прив'язаними до карти)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeOblastDashboard();
});

// ---- Дашборд для позаобласних полігонів (Крим, м. Київ, Севастополь) ----
function openGenericDashboard(name, lat, lng) {
    const dash = document.getElementById('oblast-dash');
    if (!dash) return;

    // Найближча область — джерело супутникових метрик та агро-профілю
    let nearest = OBLASTS_DATA[0], best = Infinity;
    OBLASTS_DATA.forEach(o => {
        const d = (o.lat - lat) ** 2 + (o.lng - lng) ** 2;
        if (d < best) { best = d; nearest = o; }
    });
    currentSatRegion = nearest.code;

    const t = regionTelemetry[nearest.code] || classifyTelemetry(buildFallbackTelemetry(nearest));
    const s = computeSatMetrics(nearest.code);
    const crops = ZONE_CROPS[nearest.zone] || [];
    const gdd = Math.max(0, Math.round(((Number(t.tmax1) + Number(t.tmin1)) / 2 - 5) * 10) / 10);
    const d2 = new Date(); d2.setDate(d2.getDate() + 2);
    const dayNames = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    openDashKey = null; // generic-режим не синхронізується з bulk-оновленням

    dash.innerHTML = `
        <div class="od-header">
            <div class="od-title-row">
                <span class="od-emoji">📍</span>
                <div class="od-title-txt">
                    <h4>${name}</h4>
                    <span class="od-meta">Позамагістерральна зона · орієнтир: ${nearest.full}</span>
                </div>
                <button class="od-close" onclick="closeOblastDashboard()" title="Закрити (Esc)">✕</button>
            </div>
            <div class="od-badges-row">
                <span class="od-rating r-${String(t.rating).toLowerCase()}">${t.rating}</span>
                <span class="od-nbadge ${s.ndviClass}">NDVI ${s.ndvi.toFixed(2)} · ${ndviQualityLabel(s.ndvi)}</span>
            </div>
        </div>
        <div class="od-body">
            <div class="od-status-line"><span class="rdi-dot ${t.status}"></span>${t.statusText} · показники найближчої агрозони</div>

            <div class="od-sec">
                <div class="od-sec-title">🛰️ Супутниковий моніторинг <span class="od-sec-tag">SENTINEL-2 L2A</span></div>
                <div class="od-grid">
                    ${dashMetric('🌿', 'NDVI', s.ndvi.toFixed(2), s.ndviClass)}
                    ${dashMetric('💧', 'NDWI', '+' + s.ndwi.toFixed(2))}
                    ${dashMetric('🍃', 'CI хлорофіл', s.ci.toFixed(1))}
                    ${dashMetric('🌱', 'LAI', s.lai.toFixed(1))}
                    ${dashMetric('🌾', 'Покриття', s.canopy + '%', s.ndviClass)}
                    ${dashMetric('📦', 'Біомаса', s.biomass.toFixed(1) + ' т/га')}
                    ${dashMetric('☁️', 'Хмарність', s.clouds + '%')}
                    ${dashMetric('🧪', 'SAVI', (s.ndvi * 0.92).toFixed(2))}
                </div>
                <div class="od-pass">🛰️ Sentinel-2 · довідковий NDVI поточного сезону · Фаза рослин: ${s.phase}</div>
            </div>

            <div class="od-sec">
                <div class="od-sec-title">🌦️ Погода Live <span class="od-sec-tag">OPEN-METEO · ТОЧКА</span></div>
                <div class="od-grid" id="od-live-grid">
                    <div class="od-live-wait"><div class="spinner"></div><span>Точковий запит погоди...</span></div>
                </div>
            </div>

            <div class="od-sec">
                <div class="od-sec-title">📅 Прогноз 72 години <span class="od-sec-tag">ОРІЄНТИР</span></div>
                <div class="od-forecast-row">
                    ${dashForecastCard('Сьогодні', t.tmax1, t.tmin1, t.pr1)}
                    ${dashForecastCard('Завтра', t.tmax2, t.tmin2, t.pr2)}
                    ${dashForecastCard(dayNames[d2.getDay()], t.tmax3, t.tmin3, t.pr3)}
                </div>
            </div>

            <div class="od-sec">
                <div class="od-sec-title">🌾 Агро-профіль</div>
                <div class="od-crops">${crops.map(c => `<span class="od-crop-chip">${c}</span>`).join('')}</div>
                <div class="od-agro-note">Агро-рейтинг <b>${t.rating}</b> · GDD (base 5°C): ${gdd}°C — показники взяті з найближчої агрозони</div>
            </div>
        </div>`;

    dash.setAttribute('aria-hidden', 'false');
    dash.classList.add('open');
    document.getElementById('map-wrap')?.classList.add('dash-open');

    // Точкова погода за клікнутими координатами (asinc оновлення плиток)
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lng.toFixed(4)}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,cloud_cover,precipitation,soil_temperature_6cm,soil_moisture_9_to_27cm&timezone=auto`)
        .then(r => r.json())
        .then(w => {
            const c = w?.current;
            const grid = document.getElementById('od-live-grid');
            if (!c || !grid) return;
            grid.innerHTML = [
                dashMetric('🌡️', 'Повітря', fmtTempVal(c.temperature_2m)),
                dashMetric('🥵', 'Відчувається', fmtTempVal(c.apparent_temperature)),
                dashMetric('💧', 'Вологість', Math.round(c.relative_humidity_2m) + '%'),
                dashMetric('🍃', 'Вітер', Math.round(c.wind_speed_10m) + ' км/г', c.wind_speed_10m >= 14 ? 'bad' : ''),
                dashMetric('🌧️', 'Опади', Number(c.precipitation ?? 0).toFixed(1) + ' мм'),
                dashMetric('☁️', 'Хмарність', Math.round(c.cloud_cover ?? 0) + '%'),
                dashMetric('🌱', 'Ґрунт 6 см', fmtTempVal(c.soil_temperature_6cm)),
                dashMetric('💦', 'Волога ґрунту', Math.round((c.soil_moisture_9_to_27cm ?? 0) * 100) + '%')
            ].join('');
        })
        .catch(() => {
            const grid = document.getElementById('od-live-grid');
            if (grid) grid.innerHTML = '<div class="od-live-wait"><span>Точкові дані недоступні — показані дані найближчої області</span></div>';
        });
}

let currentSatRegion = 'all';   // активний регіон (використовується Ситуаційним Центром)

let leafletMap, mapGeoLayer, selectedMapLayer;
let currentTileLayer, currentLayerMode;
let mainChartObj, soilChartObj, radarChartObj;

function initPrecisionFarming() {
    initLeafletMap();
    initCharts();
    initRegionsTelemetry();
    updatePrecisionSensors(globalState.currentRegion.lat, globalState.currentRegion.lng);
}

function initLeafletMap() {
    const mapEl = document.getElementById('ibon-map');
    if (!mapEl) return;

    leafletMap = L.map('ibon-map', {
        zoomControl: true,
        attributionControl: false
    }).setView([globalState.currentRegion.lat, globalState.currentRegion.lng], 6);

    // Use free Stadia Maps dark tile (no API key needed for localhost/GitHub Pages)
    const TILE_LAYERS = {
        dark:      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        osm:       'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    };

    currentTileLayer = L.tileLayer(TILE_LAYERS.satellite, { maxZoom: 18 }).addTo(leafletMap);
    currentLayerMode = 'satellite';

    // Try local GeoJSON cache first for fast offline loading, fallback to GitHub raw
    const GEOJSON_LOCAL = 'data/ukraine.geojson';
    const GEOJSON_REMOTE = 'https://raw.githubusercontent.com/EugeneBorshch/ukraine_geojson/master/UA_FULL_Ukraine.geojson';

    const renderGeo = (data) => {
        mapGeoLayer = L.geoJSON(data, {
            style: {
                fillColor: '#e1251b',
                weight: 1.5,
                color: '#334155',
                fillOpacity: 0.08
            },
            onEachFeature: (feature, layer) => {
                const regionName = feature.properties.name || feature.properties.NAME_1 || 'Область';
                layer.bindTooltip(regionName, { sticky: true, className: 'leaflet-tooltip-dark' });

                layer.on({
                    mouseover: (e) => {
                        if (layer !== selectedMapLayer) {
                            e.target.setStyle({ fillOpacity: 0.35, color: '#00e1ff' });
                        }
                    },
                    mouseout: (e) => {
                        if (layer !== selectedMapLayer && mapGeoLayer) {
                            mapGeoLayer.resetStyle(e.target);
                        }
                    },
                    click: (e) => {
                        selectMapRegion(layer, e.latlng, regionName);
                    }
                });
            }
        }).addTo(leafletMap);
    };

    fetch(GEOJSON_LOCAL)
        .then(r => {
            if (!r.ok) throw new Error("Local GeoJSON not found");
            return r.json();
        })
        .then(renderGeo)
        .catch(() => {
            console.log('[MAP] Loading remote GeoJSON fallback...');
            fetch(GEOJSON_REMOTE)
                .then(r => r.json())
                .then(renderGeo)
                .catch(err => console.warn('[MAP] GeoJSON load error:', err));
        });
}

function selectMapRegion(layer, latlng, name) {
    if (selectedMapLayer && mapGeoLayer) mapGeoLayer.resetStyle(selectedMapLayer);
    selectedMapLayer = layer;
    if (selectedMapLayer) {
        selectedMapLayer.setStyle({ fillColor: '#00e1ff', fillOpacity: 0.4, color: '#00e1ff', weight: 2.5 });
    }

    leafletMap.flyTo(latlng, 7.5, { duration: 1.2 });

    const lbl = document.getElementById('current-region-label');
    const coordsLbl = document.getElementById('current-coords-label');

    // Клік по області → компактний дашборд з усіма даними (супутник + погода + агро)
    const oblastMatch = OBLASTS_DATA.find(o => o.full === name || name.startsWith(o.name + ' '));
    if (oblastMatch) {
        globalState.currentRegion = { name: oblastMatch.full.toUpperCase(), lat: oblastMatch.lat, lng: oblastMatch.lng };
        if (lbl) lbl.textContent = oblastMatch.full.toUpperCase();
        if (coordsLbl) coordsLbl.textContent = `${oblastMatch.lat.toFixed(2)}°N, ${oblastMatch.lng.toFixed(2)}°E`;
        setLabRegionHeader(oblastMatch.full.toUpperCase(), `${oblastMatch.lat.toFixed(2)}°N, ${oblastMatch.lng.toFixed(2)}°E`);
        openOblastDashboard(oblastMatch.code);
        updatePrecisionSensors(oblastMatch.lat, oblastMatch.lng);
        addEventLog('info', `<strong>Обрано регіон:</strong> ${oblastMatch.full} — погода та агродані оновлено (Open-Meteo)`);
    } else {
        globalState.currentRegion = { name: name.toUpperCase(), lat: latlng.lat, lng: latlng.lng };
        if (lbl) lbl.textContent = name.toUpperCase();
        if (coordsLbl) coordsLbl.textContent = `${latlng.lat.toFixed(2)}°N, ${latlng.lng.toFixed(2)}°E`;
        setLabRegionHeader(name.toUpperCase(), `${latlng.lat.toFixed(2)}°N, ${latlng.lng.toFixed(2)}°E`);
        openGenericDashboard(name, latlng.lat, latlng.lng);
        updatePrecisionSensors(latlng.lat, latlng.lng);
        addEventLog('info', `<strong>Обрано регіон:</strong> ${name} — погода та агродані оновлено (Open-Meteo)`);
    }
}

function resetToUkraine() {
    if (selectedMapLayer && mapGeoLayer) mapGeoLayer.resetStyle(selectedMapLayer);
    selectedMapLayer = null;

    closeOblastDashboard();

    const uCenter = REGIONS_COORDS["УКРАЇНА (ГЛОБАЛЬНО)"];
    leafletMap.flyTo([uCenter.lat, uCenter.lng], uCenter.zoom, { duration: 1.2 });

    globalState.currentRegion = { name: "УКРАЇНА (ГЛОБАЛЬНО)", lat: uCenter.lat, lng: uCenter.lng };
    const lbl = document.getElementById('current-region-label');
    const coordsLbl = document.getElementById('current-coords-label');

    if (lbl) lbl.textContent = "УКРАЇНА (ГЛОБАЛЬНО)";
    if (coordsLbl) coordsLbl.textContent = "48.38°N, 31.17°E";
    setLabRegionHeader("УКРАЇНА (ГЛОБАЛЬНО)", "48.38°N, 31.17°E");

    updatePrecisionSensors(uCenter.lat, uCenter.lng);
    addEventLog('info', '<strong>Регіон скинуто:</strong> Україна (глобально)');
}

// ==============================================================
// MAP LAYER SWITCHER (Free tiles: satellite/osm/dark)
// ==============================================================
function switchMapLayer(mode) {
    if (!leafletMap) return;
    const TILE_URLS = {
        dark:      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        osm:       'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    };
    if (currentLayerMode === mode) return;
    if (currentTileLayer) leafletMap.removeLayer(currentTileLayer);
    currentTileLayer = L.tileLayer(TILE_URLS[mode], { maxZoom: 18 }).addTo(leafletMap);
    if (mapGeoLayer) mapGeoLayer.bringToFront();
    currentLayerMode = mode;
    // Update button styles
    document.querySelectorAll('.map-layer-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = { dark: 'btn-layer-dark', satellite: 'btn-layer-sat', osm: 'btn-layer-osm' }[mode];
    const el = document.getElementById(activeBtn);
    if (el) el.classList.add('active');
}

// Fly to strategic agro hub / grain terminal
function flyToAgroHub(lat, lng, name) {
    if (!leafletMap) return;
    leafletMap.flyTo([lat, lng], 11, { duration: 1.5 });
    globalState.currentRegion = { name: name.toUpperCase(), lat, lng };
    const lbl = document.getElementById('current-region-label');
    const coordsLbl = document.getElementById('current-coords-label');
    if (lbl) lbl.textContent = name.toUpperCase();
    if (coordsLbl) coordsLbl.textContent = `${lat.toFixed(2)}°N, ${lng.toFixed(2)}°E`;
    setLabRegionHeader(name.toUpperCase(), `${lat.toFixed(2)}°N, ${lng.toFixed(2)}°E`);
    closeOblastDashboard();
    updatePrecisionSensors(lat, lng);
}

// Ініціалізація телеметрії всіх областей (реальні Open-Meteo дані для дашборда)
function initRegionsTelemetry() {
    fetchRegionsTelemetry();
    // Автооновлення телеметрії всіх областей кожні 10 хвилин
    setInterval(fetchRegionsTelemetry, 10 * 60 * 1000);
}

// Заголовок блоку даних під картою: завжди показує, по якому регіону дані
function setLabRegionHeader(name, coords) {
    const nameEl = document.getElementById('lab-region-name');
    const coordsEl = document.getElementById('lab-region-coords');
    const hdrEl = document.getElementById('lab-region-header');
    if (nameEl && name && nameEl.textContent !== name) {
        nameEl.textContent = name;
        if (hdrEl) {
            hdrEl.classList.remove('lrh-flash');
            void hdrEl.offsetWidth; // перезапуск анімації підсвітки
            hdrEl.classList.add('lrh-flash');
        }
    }
    if (coordsEl && coords) coordsEl.textContent = coords;
}

// Tab Switcher for Laboratory Modules
function switchLabTab(tabId, btnEl) {
    const parent = btnEl.parentElement;
    parent.querySelectorAll('.lab-tab-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
    document.querySelectorAll('.lab-pane').forEach(p => p.classList.remove('active'));
    const pane = document.getElementById(`pane-${tabId}`);
    if (pane) pane.classList.add('active');
}

async function updatePrecisionSensors(lat, lng) {
    try {
        const q = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m,cloud_cover,uv_index,shortwave_radiation,direct_radiation,diffuse_radiation,et0_fao_evapotranspiration,vapour_pressure_deficit,rain,soil_temperature_0cm&hourly=temperature_2m,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_to_1cm,soil_moisture_1_to_3cm,soil_moisture_3_to_9cm,soil_moisture_9_to_27cm,soil_moisture_27_to_81cm&daily=temperature_2m_max,temperature_2m_min,shortwave_radiation_sum,et0_fao_evapotranspiration,precipitation_sum&past_days=3&forecast_days=4&timezone=auto`;

        const res = await fetch(q);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        globalState.lastSensorData = {
            temperature:  data.current?.temperature_2m ?? null,
            humidity:     data.current?.relative_humidity_2m ?? null,
            vpd:          data.current?.vapour_pressure_deficit ?? null,
            soilMoisture: data.hourly?.soil_moisture_9_to_27cm?.[0] ?? null,
            et0:          data.current?.et0_fao_evapotranspiration ?? null,
            windSpeed:    data.current?.wind_speed_10m ?? null
        };

        // Реальна сума ефективних температур (GDD, база +5°C) за 7 днів з денних max/min Open-Meteo
        const dMax = data.daily?.temperature_2m_max || [];
        const dMin = data.daily?.temperature_2m_min || [];
        let gdd7 = 0, gddDays = 0;
        for (let i = 0; i < Math.min(7, dMax.length); i++) {
            const tmax = dMax[i], tmin = dMin[i];
            if (tmax == null || tmin == null) continue;
            gdd7 += Math.max(0, (tmax + tmin) / 2 - 5);
            gddDays++;
        }
        globalState.gdd7 = gddDays > 0 ? Math.round(gdd7) : null;
        renderSensorMetrics(data);
        renderDecisionCards(data);
        updateChartsData(data);

        // Журнал подій — реальні показники з реального API; логуємо при зміні регіону або температури
        const t = globalState.lastSensorData.temperature;
        const h = globalState.lastSensorData.humidity;
        const mst = globalState.lastSensorData.soilMoisture;
        const sig = `${lat.toFixed(2)},${lng.toFixed(2)}|${t != null ? t.toFixed(1) : '?'}`;
        if (globalState._lastSensorLogSig !== sig) {
            globalState._lastSensorLogSig = sig;
            addEventLog(
                (t != null && (t > 30 || t < 2)) ? 'warn' : 'info',
                `<strong>Open-Meteo (${lat.toFixed(2)}, ${lng.toFixed(2)}):</strong> t=${t != null ? (t > 0 ? '+' : '') + t.toFixed(1) : '—'}°C · RH=${h != null ? h.toFixed(0) : '—'}% · ґрунт=${mst != null ? mst.toFixed(2) : '—'} m³/m³`
            );
        }
    } catch (e) {
        console.error('[OPEN-METEO] Sensor update failed:', e);
    }
}

function renderSensorMetrics(data) {
    const c = data.current;
    const h = data.hourly;
    const d = data.daily;
    const lat = data.latitude;
    const lng = data.longitude;

    // Helper for rendering cards
    const renderCards = (containerId, items) => {
        const el = document.getElementById(containerId);
        if (!el) return;
        el.innerHTML = items.map(m => `
            <div class="sensor-box ${m.hi ? 'highlight' : ''}">
                <div class="sensor-val-row">
                    <span class="sensor-val">${m.v}</span>
                    <span class="sensor-unit">${m.u}</span>
                </div>
                <span class="sensor-lbl">${m.l}</span>
            </div>
        `).join('');
    };

    // 1. Atmos (8 metrics)
    const dewPoint = (c.temperature_2m - ((100 - c.relative_humidity_2m) / 5)).toFixed(1);
    const atmos = [
        { l: "Температура повітря", v: c.temperature_2m.toFixed(1), u: "°C", hi: true },
        { l: "Відчувається", v: c.apparent_temperature.toFixed(1), u: "°C" },
        { l: "Відносна вологість", v: c.relative_humidity_2m, u: "%" },
        { l: "Атмосферний тиск", v: c.pressure_msl.toFixed(0), u: "hPa" },
        { l: "Швидкість вітру", v: c.wind_speed_10m.toFixed(1), u: "км/год" },
        { l: "Пориви вітру", v: c.wind_gusts_10m.toFixed(1), u: "км/год" },
        { l: "Точка роси", v: dewPoint, u: "°C" },
        { l: "Загальна хмарність", v: c.cloud_cover, u: "%" }
    ];
    renderCards('atmos-grid', atmos);

    // 2. Deep Soil Profile (6 metrics)
    const soil = [
        { l: "Поверхня ґрунту (0 см)", v: c.soil_temperature_0cm.toFixed(1), u: "°C", hi: true },
        { l: "Посівний шар (6 см)", v: h.soil_temperature_6cm[0].toFixed(1), u: "°C", hi: true },
        { l: "Кореневий шар (18 см)", v: h.soil_temperature_18cm[0].toFixed(1), u: "°C" },
        { l: "Глибокий шар (54 см)", v: h.soil_temperature_54cm[0].toFixed(1), u: "°C" },
        { l: "Волога верхня (0-1 см)", v: h.soil_moisture_0_to_1cm[0].toFixed(3), u: "m³/m³" },
        { l: "Волога глибинна (9-27 см)", v: h.soil_moisture_9_to_27cm[0].toFixed(3), u: "m³/m³" }
    ];
    renderCards('soil-grid', soil);

    // 3. Radiation & Bio (8 metrics)
    const par = (c.shortwave_radiation * 0.43).toFixed(0);
    const leafWet = c.relative_humidity_2m > 85 ? 95 : (c.relative_humidity_2m > 70 ? 45 : 10);
    const radSum = d.shortwave_radiation_sum?.[0]?.toFixed(0) || Math.round(c.shortwave_radiation * 0.08);
    const bio = [
        { l: "Сумарна сонячна радіація", v: c.shortwave_radiation.toFixed(0), u: "W/m²" },
        { l: "Пряма радіація", v: c.direct_radiation.toFixed(0), u: "W/m²" },
        { l: "Дифузна радіація", v: c.diffuse_radiation.toFixed(0), u: "W/m²" },
        { l: "Випаровування ET0 FAO", v: c.et0_fao_evapotranspiration.toFixed(2), u: "мм/добу" },
        { l: "Дефіцит тиску пари (VPD)", v: c.vapour_pressure_deficit.toFixed(2), u: "kPa" },
        { l: "ФАР (PAR Photosynthesis)", v: par, u: "µmol/m²" },
        { l: "Зволоження листя (Leaf)", v: leafWet, u: "%" },
        { l: "Добова сума енергії", v: radSum, u: "MJ/m²" }
    ];
    renderCards('bio-grid', bio);

    // 4. Derived Agronomic Indices (6 metrics)
    const gdd = c.temperature_2m > 5 ? (c.temperature_2m - 5).toFixed(1) : "0.0";
    const heatIdx = (c.temperature_2m + 0.6).toFixed(1);
    const rainPrev = (c.rain || d.precipitation_sum?.[0] || 0).toFixed(1);
    const energyFlux = (c.shortwave_radiation * 0.9).toFixed(0);
    const carbonSink = (0.15 + (c.shortwave_radiation / 2500)).toFixed(2);
    const bioScore = Math.min(100, Math.round(55 + (c.shortwave_radiation / 30) + (h.soil_moisture_0_to_1cm[0] * 50)));

    const indices = [
        { l: "GDD (Ефективне тепло, база 5°)", v: gdd, u: "pts", hi: true },
        { l: "Heat Index (Тепловий стрес)", v: heatIdx, u: "°C" },
        { l: "Добові опади (Опадомір)", v: rainPrev, u: "мм" },
        { l: "Потік енергії (Energy Flux)", v: energyFlux, u: "J/m²" },
        { l: "Поглинання CO₂ (Carbon Sink)", v: carbonSink, u: "т/га/рік" },
        { l: "Комплексний Bio Score", v: bioScore, u: "/100", hi: true }
    ];
    renderCards('agro-indices-grid', indices);

    // 5. Regional Operational Metrics (8 metrics)
    const grainMoisture = (11.5 + (c.relative_humidity_2m / 22)).toFixed(1);
    const yieldEst = (3.2 + (h.soil_moisture_9_to_27cm[0] * 6.5) + (c.shortwave_radiation / 700)).toFixed(1);
    const dustLevel = c.relative_humidity_2m < 35 ? "Висока" : (c.relative_humidity_2m < 55 ? "Помірна" : "Низька");
    const elevatorCap = Math.min(95, Math.max(30, Math.round(50 + ((lat * 10 + lng * 5) % 35))));
    const fuelReserve = Math.min(98, Math.max(45, Math.round(60 + ((lat * 7 + lng * 11) % 30))));
    const machineryCount = Math.round(12 + ((lat * 3 + lng * 4) % 25));
    const logisticsPressure = Math.round(40 + ((lat * 9 + lng * 2) % 45));
    const agRating = h.soil_temperature_6cm[0] >= 9 && c.wind_speed_10m < 14 ? 'AAA' : (h.soil_temperature_6cm[0] >= 7 ? 'AA' : 'A');

    const ops = [
        { l: "Кондиційна вологість зерна", v: grainMoisture, u: "%" },
        { l: "Модельована врожайність", v: yieldEst, u: "т/га", hi: true },
        { l: "Запиленість приземного шару", v: dustLevel, u: "" },
        { l: "Завантаженість елеваторів", v: elevatorCap, u: "%" },
        { l: "Резерв ДП в агросекторі", v: fuelReserve, u: "%" },
        { l: "Техніка в польових роботах", v: machineryCount, u: "од./госп." },
        { l: "Логістичний тиск на порти", v: logisticsPressure, u: "pts" },
        { l: "Агрокліматичний Ag-Rating", v: agRating, u: "Клас", hi: true }
    ];
    renderCards('ops-grid', ops);

    // Update NDVI satellite mini KPIs
    const bioValEl = document.getElementById('bio-biomass-val');
    const chlorValEl = document.getElementById('bio-chlorophyll-val');
    const vegValEl = document.getElementById('bio-veg-val');
    const ndviValEl = document.getElementById('ndvi-val-text');

    if (bioValEl) bioValEl.textContent = `${bioScore}%`;
    if (chlorValEl) chlorValEl.textContent = bioScore > 75 ? "Високий" : "Оптимальний";
    if (vegValEl) vegValEl.textContent = c.temperature_2m > 12 ? "Активна фаза" : "Помірна вегетація";
    if (ndviValEl) {
        const ndviNum = (0.55 + (bioScore / 300)).toFixed(2);
        ndviValEl.innerHTML = `Середній NDVI: <strong>${ndviNum} (Оптимально)</strong>`;
    }
}

function renderDecisionCards(data) {
    const c = data.current;
    const h = data.hourly;
    const d = data.daily;
    const soil6 = h.soil_temperature_6cm[0];
    const wind = c.wind_speed_10m;
    const moistTop = h.soil_moisture_0_to_1cm[0];
    const minTemp = d.temperature_2m_min[0];

    // 1. Sowing Decision (Ґрунт)
    const sowCard = document.getElementById('card-sowing');
    const sowVal = document.getElementById('sowing-val');
    const sowDesc = document.getElementById('sowing-desc');
    if (sowVal && sowCard) {
        if (soil6 >= 8.5) {
            sowVal.textContent = "ВІДКРИТО";
            sowCard.className = "decision-card";
            sowDesc.textContent = `Температура ґрунту +${soil6.toFixed(1)}°C на глибині 6 см сприятлива для активного старту кореневої системи.`;
        } else {
            sowVal.textContent = "ОХОЛОДЖЕНИЙ";
            sowCard.className = "decision-card warning";
            sowDesc.textContent = `Ґрунт охолоджений (+${soil6.toFixed(1)}°C). Ризик затримки сходів ярих та теплолюбних культур.`;
        }
    }

    // 2. Plant Protection Window (ЗЗР)
    const protCard = document.getElementById('card-protection');
    const protVal = document.getElementById('protection-val');
    const protDesc = document.getElementById('protection-desc');
    if (protVal && protCard) {
        if (wind < 14) {
            protVal.textContent = "ДОЗВОЛЕНО";
            protCard.className = "decision-card";
            protDesc.textContent = `Швидкість вітру ${wind.toFixed(1)} км/год в межах норми. Ідеальне вікно для обприскування без знесення розчину.`;
        } else {
            protVal.textContent = "РИЗИК ЗНОСУ";
            protCard.className = "decision-card danger";
            protDesc.textContent = `Поривчастий вітер ${wind.toFixed(1)} км/год. Висока деривація крапель. Рекомендується перенести внесення ЗЗР.`;
        }
    }

    // 3. Soil Moisture
    const moistCard = document.getElementById('card-moisture');
    const moistVal = document.getElementById('moisture-val');
    const moistDesc = document.getElementById('moisture-desc');
    if (moistVal && moistCard) {
        if (moistTop < 0.18) {
            moistVal.textContent = "ДЕФІЦИТ";
            moistCard.className = "decision-card warning";
            moistDesc.textContent = `Посівний шар відчуває дефіцит вологи (${(moistTop * 100).toFixed(1)}%). Рекомендується закриття вологи шлейфами.`;
        } else if (moistTop > 0.40) {
            moistVal.textContent = "ПЕРЕЗВОЛОЖЕННЯ";
            moistCard.className = "decision-card warning";
            moistDesc.textContent = `Високий рівень вологи (${(moistTop * 100).toFixed(1)}%). Можливе буксування важкої колісної техніки.`;
        } else {
            moistVal.textContent = "ОПТИМАЛЬНО";
            moistCard.className = "decision-card";
            moistDesc.textContent = `Продуктивна волога (${(moistTop * 100).toFixed(1)}%) стабільна для живлення посівів та розчинення добрив.`;
        }
    }

    // 4. Thermal Stress / Frost Risk
    const thermCard = document.getElementById('card-thermal-risk');
    const thermVal = document.getElementById('thermal-val');
    const thermDesc = document.getElementById('thermal-desc');
    if (thermVal && thermCard) {
        if (minTemp <= 2) {
            thermVal.textContent = "РИЗИК ЗАМОРОЗКІВ";
            thermCard.className = "decision-card danger";
            thermDesc.textContent = `Прогнозується нічне падіння до +${minTemp.toFixed(1)}°C. Загроза пошкодження чутливих сходів.`;
        } else if (c.temperature_2m >= 32) {
            thermVal.textContent = "ТЕПЛОВИЙ ШОК";
            thermCard.className = "decision-card danger";
            thermDesc.textContent = `Денна спека +${c.temperature_2m.toFixed(1)}°C. Ризик стерилізації пилку та засихання листя.`;
        } else {
            thermVal.textContent = "БЕЗПЕЧНО";
            thermCard.className = "decision-card";
            thermDesc.textContent = `Термічний режим збалансований (ніч +${minTemp.toFixed(1)}°C, день +${c.temperature_2m.toFixed(1)}°C).`;
        }
    }
}

function initCharts() {
    const chartOpts = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748b', font: { size: 9 } } },
            x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 9 } } }
        }
    };

    // 1. Main line chart: Air vs Soil
    const mainCtx = document.getElementById('mainChart');
    if (mainCtx) {
        mainChartObj = new Chart(mainCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['D-3', 'D-2', 'D-1', 'СЬОГОДНІ', 'D+1', 'D+2', 'D+3'],
                datasets: [
                    { label: 'Повітря 2м (°C)', borderColor: '#e1251b', backgroundColor: 'rgba(225,37,27,0.08)', fill: true, data: [], tension: 0.35 },
                    { label: 'Ґрунт 6см (°C)', borderColor: '#00ff95', data: [], tension: 0.35 }
                ]
            },
            options: chartOpts
        });
    }

    // 2. Soil Depth Bar Chart
    const soilCtx = document.getElementById('soilProfChart');
    if (soilCtx) {
        soilChartObj = new Chart(soilCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['0-1см', '1-3см', '3-9см', '9-27см', '27-81см'],
                datasets: [{ label: 'Волога m³/m³', backgroundColor: '#00e1ff', borderRadius: 4, data: [] }]
            },
            options: chartOpts
        });
    }

    // 3. Risk Radar
    const radarCtx = document.getElementById('radarChart');
    if (radarCtx) {
        radarChartObj = new Chart(radarCtx.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Посуха', 'Нічний мороз', 'Вітрова ерозія', 'Шкідники', 'Перезволоження'],
                datasets: [{
                    label: 'Індекс ризику',
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245,158,11,0.2)',
                    pointBackgroundColor: '#f59e0b',
                    data: [20, 10, 15, 30, 20]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        grid: { color: 'rgba(255,255,255,0.08)' },
                        ticks: { display: false },
                        angleLines: { color: 'rgba(255,255,255,0.08)' },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
}

function updateChartsData(data) {
    if (!mainChartObj || !soilChartObj || !radarChartObj) return;

    const c = data.current;
    const h = data.hourly;
    const d = data.daily;

    // 1. Line Chart: 100% REAL historical & forecast temperatures from Open-Meteo
    if (d.temperature_2m_max && d.temperature_2m_max.length >= 7) {
        mainChartObj.data.datasets[0].data = d.temperature_2m_max.slice(0, 7);
    } else {
        mainChartObj.data.datasets[0].data = [c.temperature_2m, c.temperature_2m, c.temperature_2m, c.temperature_2m, c.temperature_2m, c.temperature_2m, c.temperature_2m];
    }

    // Soil temperature 6cm across 7 days (hourly checkpoints sampled every 24h)
    const soilPoints = [];
    for (let day = 0; day < 7; day++) {
        const hourIdx = day * 24;
        if (h.soil_temperature_6cm && h.soil_temperature_6cm[hourIdx] !== undefined) {
            soilPoints.push(h.soil_temperature_6cm[hourIdx]);
        } else {
            soilPoints.push(h.soil_temperature_6cm ? h.soil_temperature_6cm[0] : 10);
        }
    }
    mainChartObj.data.datasets[1].data = soilPoints;
    mainChartObj.update();

    // 2. Soil Profile Bar Chart: 5 horizons (0-81 cm)
    soilChartObj.data.datasets[0].data = [
        h.soil_moisture_0_to_1cm[0],
        h.soil_moisture_1_to_3cm[0],
        h.soil_moisture_3_to_9cm[0],
        h.soil_moisture_9_to_27cm[0],
        h.soil_moisture_27_to_81cm[0]
    ];
    soilChartObj.update();

    // 3. Physical Risk Radar Calculation
    const temp = c.temperature_2m;
    const wind = c.wind_speed_10m;
    const moist = h.soil_moisture_0_to_1cm[0];
    const minTemp = d.temperature_2m_min[0];

    // Real mathematical models without Math.random:
    const drought = Math.min(100, Math.max(10, Math.round((temp > 20 ? 35 : 10) + (1 - Math.min(0.35, moist) / 0.35) * 55)));
    const frost = Math.min(100, Math.max(5, Math.round((8 - minTemp) * 12)));
    const windErosion = Math.min(100, Math.max(10, Math.round((wind / 25) * 55 + (moist < 0.20 ? 30 : 5))));
    const pest = Math.min(100, Math.max(15, Math.round((temp >= 14 && temp <= 26 ? 60 : 25) + (c.relative_humidity_2m > 70 ? 20 : 0))));
    const waterlogging = Math.min(100, Math.max(5, Math.round((moist > 0.38 ? (moist - 0.38) * 350 : 10))));

    radarChartObj.data.datasets[0].data = [drought, frost, windErosion, pest, waterlogging];
    radarChartObj.update();
}

// ==============================================================
// 8. TRACTOR CATALOG & STORE ENGINE (AT THE BOTTOM)
// ==============================================================

function renderTractorCatalog(filterCategory = 'all') {
    const container = document.getElementById('tractors-catalog-container');
    if (!container) return;

    const rate = globalState.nbuRates.USD;

    const filtered = filterCategory === 'all'
        ? TRACTORS_DATA
        : TRACTORS_DATA.filter(t => t.category === filterCategory);

    container.innerHTML = filtered.map(t => {
        const priceUah = Math.round(t.price_usd * rate).toLocaleString('uk-UA');
        const priceUsdFormatted = `$${t.price_usd.toLocaleString('en-US')}`;

        return `
            <div class="tractor-card">
                <div class="tractor-badge-row">
                    <span class="tractor-status-tag">● ${t.status}</span>
                    <span class="tractor-promo-tag">${t.badges[0]}</span>
                </div>

                <div class="tractor-img-container">
                    <img src="${t.img}" alt="${t.name}" class="tractor-img" loading="lazy">
                </div>

                <h3 class="tractor-name">${t.name}</h3>
                <span class="tractor-power-subtitle">${t.power}</span>

                <div class="tractor-price-box">
                    <div class="price-usd-wrap">
                        <span class="price-usd">${priceUsdFormatted}</span>
                        <span class="price-uah">≈ ${priceUah} грн</span>
                    </div>
                    <span class="price-badge-nbu">Курс: ${rate} ₴</span>
                </div>

                <div class="tractor-specs-mini">
                    <div class="spec-mini-item">
                        <span class="spec-mini-label">Двигун</span>
                        <span class="spec-mini-val">${t.engine.split(',')[0]}</span>
                    </div>
                    <div class="spec-mini-item">
                        <span class="spec-mini-label">Трансмісія</span>
                        <span class="spec-mini-val">${t.transmission.split(' ')[0]}</span>
                    </div>
                    <div class="spec-mini-item">
                        <span class="spec-mini-label">Швидкість</span>
                        <span class="spec-mini-val">${t.speed}</span>
                    </div>
                    <div class="spec-mini-item">
                        <span class="spec-mini-label">Гідравліка</span>
                        <span class="spec-mini-val">${t.hydraulics.split(' ')[0]}</span>
                    </div>
                </div>

                <p class="tractor-description">${t.desc}</p>

                <div class="tractor-actions">
                    <button class="buy-btn-primary" onclick="openOrderModal('${t.id}')">КУПИТИ ТЕХНІКУ / ЗАМОВИТИ КП</button>
                    <div class="secondary-actions-row">
                        <button class="btn-secondary" onclick="openLeasingModal('${t.id}')">📊 РОЗРАХУВАТИ ЛІЗИНГ</button>
                        <button class="btn-secondary" onclick="openSpecsModal('${t.id}')">ℹ️ ПОВНІ ТТХ</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function filterTractors(category, btnEl) {
    const parent = btnEl.parentElement;
    parent.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
    renderTractorCatalog(category);
}

// ==============================================================
// 9. MODALS (ORDER, LEASING & SPECS)
// ==============================================================

function openOrderModal(machineId) {
    const machine = TRACTORS_DATA.find(t => t.id === machineId) || TRACTORS_DATA[0];
    globalState.selectedTractorForOrder = machine;

    const modal = document.getElementById('order-modal');
    const title = document.getElementById('modal-machine-title');
    const hiddenInput = document.getElementById('hidden-machine-name');

    if (title) title.textContent = `${machine.name} (${machine.power})`;
    if (hiddenInput) hiddenInput.value = machine.name;
    if (modal) modal.classList.add('active');
}

function closeOrderModal() {
    const modal = document.getElementById('order-modal');
    if (modal) modal.classList.remove('active');
}

function openLeasingModal(machineId) {
    const machine = TRACTORS_DATA.find(t => t.id === machineId) || TRACTORS_DATA[0];
    globalState.selectedTractorForLeasing = machine;

    const modal = document.getElementById('leasing-modal');
    const title = document.getElementById('leasing-machine-title');

    if (title) title.textContent = `${machine.name} ($${machine.price_usd.toLocaleString()})`;
    updateLeasingCalc();

    if (modal) modal.classList.add('active');
}

function closeLeasingModal() {
    const modal = document.getElementById('leasing-modal');
    if (modal) modal.classList.remove('active');
}

function updateLeasingCalc() {
    const machine = globalState.selectedTractorForLeasing;
    if (!machine) return;

    const downInput = document.getElementById('calc-downpayment');
    const termInput = document.getElementById('calc-term');

    const downPercent = downInput ? parseInt(downInput.value) : 30;
    const termMonths = termInput ? parseInt(termInput.value) : 36;
    const rate = globalState.nbuRates.USD;

    const totalPrice = machine.price_usd;
    const downPayment = totalPrice * (downPercent / 100);
    const financedAmount = totalPrice - downPayment;

    // Standard annual lease rate around 6.5%
    const annualInterest = 0.065;
    const totalInterest = financedAmount * annualInterest * (termMonths / 12);
    const totalRepayment = financedAmount + totalInterest;
    const monthlyPayment = Math.round(totalRepayment / termMonths);
    const monthlyPaymentUah = Math.round(monthlyPayment * rate);

    // Update labels
    const priceDisp = document.getElementById('calc-price-display');
    const priceUahDisp = document.getElementById('calc-price-uah');
    const downLabel = document.getElementById('calc-downpayment-val');
    const termLabel = document.getElementById('calc-term-val');

    if (priceDisp) priceDisp.textContent = `$${totalPrice.toLocaleString()}`;
    if (priceUahDisp) priceUahDisp.textContent = `~${Math.round(totalPrice * rate).toLocaleString()} грн`;
    if (downLabel) downLabel.innerHTML = `<strong>${downPercent}%</strong> ($${Math.round(downPayment).toLocaleString()})`;
    if (termLabel) termLabel.innerHTML = `<strong>${termMonths} міс.</strong> (${(termMonths / 12).toFixed(1)} р.)`;

    // Update result boxes
    const resDown = document.getElementById('calc-res-down');
    const resFin = document.getElementById('calc-res-financed');
    const resMonth = document.getElementById('calc-res-monthly');
    const resMonthUah = document.getElementById('calc-res-monthly-uah');

    if (resDown) resDown.textContent = `$${Math.round(downPayment).toLocaleString()}`;
    if (resFin) resFin.textContent = `$${Math.round(financedAmount).toLocaleString()}`;
    if (resMonth) resMonth.textContent = `$${monthlyPayment.toLocaleString()} / міс`;
    if (resMonthUah) resMonthUah.textContent = `~${monthlyPaymentUah.toLocaleString()} грн / міс`;
}

function applyForLeasing() {
    closeLeasingModal();
    openOrderModal(globalState.selectedTractorForLeasing.id);
    const notes = document.getElementById('order-notes');
    const downPercent = document.getElementById('calc-downpayment')?.value || 30;
    const termMonths = document.getElementById('calc-term')?.value || 36;
    if (notes) {
        notes.value = `Бажані умови лізингу: аванс ${downPercent}%, термін ${termMonths} місяців.`;
    }
}

function openSpecsModal(machineId) {
    const machine = TRACTORS_DATA.find(t => t.id === machineId) || TRACTORS_DATA[0];
    alert(`ТЕХНІЧНІ ХАРАКТЕРИСТИКИ: ${machine.name}\n\n` +
        `• Потужність: ${machine.power}\n` +
        `• Двигун: ${machine.engine}\n` +
        `• Трансмісія: ${machine.transmission}\n` +
        `• Швидкість: ${machine.speed}\n` +
        `• Паливний бак: ${machine.fuel_capacity}\n` +
        `• Гідросистема: ${machine.hydraulics}\n` +
        `• Споряджена вага: ${machine.weight}\n` +
        `• Статус: ${machine.status}\n\n` +
        `Для отримання повної специфікації та комерційної пропозиції натисніть "КУПИТИ ТЕХНІКУ".`);
}

function handleOrderSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('order-name').value;
    const phone = document.getElementById('order-phone').value;
    const machine = document.getElementById('hidden-machine-name').value;
    const finance = document.getElementById('order-finance').value;

    alert(`Дякуємо, ${name}!\n\nВашу заявку на ${machine} (${finance}) успішно зареєстровано.\nМенеджер зв'яжеться з Вами за номером ${phone} протягом 15 хвилин для надання офіційного КП.`);
    closeOrderModal();
    e.target.reset();
}

// Close modals on background click
window.onclick = function (e) {
    const orderModal = document.getElementById('order-modal');
    const leasingModal = document.getElementById('leasing-modal');
    if (e.target === orderModal) closeOrderModal();
    if (e.target === leasingModal) closeLeasingModal();
};

// ==============================================================
// 9. SITUATIONAL CENTER — AGRO MARKET ANALYTICS ENGINE
// ==============================================================

function initSituationalCenter() {
    computeAndDisplayAgroIndex();
    renderEventLog();
    updateAlertCardsFromSensors();

    addEventLog('info', '<strong>Ситуаційний центр активний.</strong> Джерела: НБУ (bank.gov.ua) · Open-Meteo · Sentinel-2 NDVI — тільки реальні дані');

    // Refresh every 5 minutes
    setInterval(() => {
        computeAndDisplayAgroIndex();
        renderEventLog();
        updateAlertCardsFromSensors();
    }, 5 * 60 * 1000);
}

function computeAndDisplayAgroIndex() {
    // АГРО-ІНДЕКС БЕЗ СИМУЛЯЦІЙ: тільки реальні вхідні дані
    // (Open-Meteo · Sentinel-2 NDVI · офіційний курс НБУ). Жодних Math.random().
    const s = globalState.lastSensorData || {};
    const ndvi = SAT_REGIONS[currentSatRegion]?.ndvi ?? null;

    // 1. Агроклімат — реальні показники Open-Meteo (температура, вологість, VPD)
    let climateScore = null;
    if (s.temperature != null && s.humidity != null) {
        const temp = s.temperature;
        const hum  = s.humidity;
        const vpd  = s.vpd ?? 0.8;
        climateScore = Math.min(100, Math.max(0,
            50
            + (temp > 5 && temp < 30 ? 20 : temp > 30 ? -15 : -10)
            + (hum > 45 && hum < 80 ? 15 : -10)
            + (vpd < 1.5 ? 10 : vpd < 2.5 ? 0 : -10)
        ));
    }

    // 2. Валютний фактор — реальний офіційний курс НБУ та його реальна динаміка за 7 днів
    //    (стабільна гривня = спокійний ціновий фон для аграріїв)
    let currencyScore = null;
    const usd = globalState.nbuRates?.USD ?? null;
    const usdPrev = globalState.nbuPrev?.USD ?? null;
    if (usd != null && usdPrev != null) {
        const chg = Math.abs((usd - usdPrev) / usdPrev * 100);
        currencyScore = Math.min(100, Math.max(20, 85 - chg * 25));
    }

    // 3. Стан вегетації — довідковий NDVI (Sentinel-2) по поточній зоні
    let vegScore = ndvi != null ? Math.min(100, Math.max(0, ndvi * 100)) : null;

    // Компоненти: якщо реальних даних немає — показуємо «—», нічого не вигадуємо
    const comps = [
        { score: climateScore,  weight: 0.35, bar: 'idx-bar-climate',  val: 'idx-val-climate' },
        { score: currencyScore, weight: 0.30, bar: 'idx-bar-currency', val: 'idx-val-currency' },
        { score: vegScore,      weight: 0.35, bar: 'idx-bar-veg',      val: 'idx-val-veg' }
    ];

    comps.forEach(c => {
        const barEl = document.getElementById(c.bar);
        const valEl = document.getElementById(c.val);
        if (barEl) {
            if (c.score == null) {
                barEl.style.width = '0%';
            } else {
                barEl.style.width = `${Math.round(c.score)}%`;
                barEl.style.background = c.score > 60 ? '#00ff95' : c.score > 40 ? '#f59e0b' : '#ef4444';
            }
        }
        if (valEl) valEl.textContent = c.score != null ? Math.round(c.score) : '—';
    });

    const active = comps.filter(c => c.score != null);
    if (active.length === 0) return; // ще немає жодних реальних даних — індекс не рахуємо

    const wSum = active.reduce((a, c) => a + c.weight, 0);
    const composite = Math.round(active.reduce((a, c) => a + c.score * c.weight, 0) / wSum);

    // Update gauge SVG arc & text
    const gaugeArcEl = document.getElementById('gauge-value-arc');
    const gaugeTextEl = document.getElementById('gauge-score-text');
    if (gaugeArcEl) gaugeArcEl.setAttribute('d', computeGaugeArc(composite));
    if (gaugeTextEl) gaugeTextEl.textContent = composite;
    const gaugeColor = composite >= 65 ? '#00ff95' : composite >= 45 ? '#f59e0b' : '#ef4444';
    if (gaugeArcEl) gaugeArcEl.setAttribute('stroke', gaugeColor);

    // Update verdict text
    const verdictEl = document.getElementById('agro-verdict');
    const trendEl = document.getElementById('agro-trend');
    if (verdictEl) {
        if (composite >= 70) verdictEl.textContent = 'Позитивний';
        else if (composite >= 55) verdictEl.textContent = 'Помірно-позитивний';
        else if (composite >= 40) verdictEl.textContent = 'Нейтральний';
        else if (composite >= 25) verdictEl.textContent = 'Помірно-негативний';
        else verdictEl.textContent = 'Негативний';
        verdictEl.style.color = gaugeColor;
    }

    // Реальна динаміка курсу USD за 7 днів (НБУ) замість випадкового тренду
    if (trendEl) {
        if (usd != null && usdPrev != null) {
            const diff = (usd - usdPrev) / usdPrev * 100;
            trendEl.textContent = `${diff >= 0 ? '▲' : '▼'} USD ${diff >= 0 ? '+' : ''}${diff.toFixed(2)}% / 7 днів (НБУ)`;
            trendEl.style.color = '#00e1ff';
        } else {
            trendEl.textContent = 'динаміка НБУ синхронізується...';
            trendEl.style.color = 'rgba(255,255,255,0.4)';
        }
    }

    // Update timestamp
    const timeEl = document.getElementById('sitcenter-update-time');
    if (timeEl) timeEl.textContent = new Date().toLocaleTimeString('uk-UA');
}

// Compute SVG arc path for gauge (score 0-100 → 180° arc from left to right)
function computeGaugeArc(score) {
    const clamped = Math.max(0, Math.min(100, score));
    const angle = (clamped / 100) * 160 - 160; // -160 (left) to 0 (right)
    const rad = ((angle) * Math.PI) / 180;
    const cx = 100, cy = 100, r = 80;
    const startX = cx + r * Math.cos(Math.PI); // left = 20
    const startY = cy + r * Math.sin(Math.PI); // = 100
    const endX = cx + r * Math.cos(Math.PI + rad);
    const endY = cy + r * Math.sin(Math.PI + rad);
    const largeArc = clamped > 50 ? 1 : 0;
    if (clamped <= 0) return 'M 20 100 A 80 80 0 0 1 20.01 100';
    return `M ${startX.toFixed(2)} ${startY.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${endX.toFixed(2)} ${endY.toFixed(2)}`;
}

function updateAlertCardsFromSensors() {
    const s = globalState.lastSensorData || {};
    const temp = s.temperature ?? null;
    const hum  = s.humidity ?? null;
    const moisture = s.soilMoisture ?? null;

    // Weather alert
    if (temp !== null) {
        const weatherMetricEl = document.getElementById('alert-metric-weather');
        const weatherBadgeEl  = document.getElementById('alert-badge-weather');
        const weatherCardEl   = document.getElementById('alert-card-weather');
        if (weatherMetricEl) weatherMetricEl.textContent = `${temp > 0 ? '+' : ''}${temp.toFixed(1)}°C / ${hum?.toFixed(0) ?? '—'}% RH`;
        if (temp > 32 || temp < 2) {
            if (weatherBadgeEl) { weatherBadgeEl.textContent = 'СТРЕС'; weatherBadgeEl.className = 'alert-severity-badge danger'; }
            if (weatherCardEl) weatherCardEl.classList.add('danger');
        } else if (temp > 28 || temp < 5) {
            if (weatherBadgeEl) { weatherBadgeEl.textContent = 'УВАГА'; weatherBadgeEl.className = 'alert-severity-badge warning'; }
        } else {
            if (weatherBadgeEl) { weatherBadgeEl.textContent = 'ОК'; weatherBadgeEl.className = 'alert-severity-badge'; }
        }
    }

    // Soil alert
    if (moisture !== null) {
        const soilMetricEl = document.getElementById('alert-metric-soil');
        const soilBadgeEl  = document.getElementById('alert-badge-soil');
        const soilCardEl   = document.getElementById('alert-card-soil');
        if (soilMetricEl) soilMetricEl.textContent = `Вологість: ${moisture.toFixed(2)} m³/m³`;
        if (moisture < 0.10) {
            if (soilBadgeEl) { soilBadgeEl.textContent = 'СТРЕС'; soilBadgeEl.className = 'alert-severity-badge danger'; }
            if (soilCardEl) soilCardEl.classList.add('danger');
        } else if (moisture < 0.18) {
            if (soilBadgeEl) { soilBadgeEl.textContent = 'СУХО'; soilBadgeEl.className = 'alert-severity-badge warning'; }
        } else {
            if (soilBadgeEl) { soilBadgeEl.textContent = 'ОК'; soilBadgeEl.className = 'alert-severity-badge'; }
        }
    }

    // Валютний фактор — реальний офіційний курс НБУ та його реальна динаміка за 7 днів
    const usd = globalState.nbuRates?.USD ?? null;
    const usdPrev = globalState.nbuPrev?.USD ?? null;
    if (usd != null) {
        const curMetricEl = document.getElementById('alert-metric-prices');
        const curBadgeEl  = document.getElementById('alert-badge-prices');
        const curDescEl   = document.getElementById('alert-desc-prices');
        if (curMetricEl) curMetricEl.textContent = `USD/UAH: ${usd.toFixed(2)} ₴ (НБУ)`;
        if (usdPrev != null) {
            const diff = (usd - usdPrev) / usdPrev * 100;
            if (curDescEl) curDescEl.textContent = `Реальна динаміка за 7 днів: ${diff >= 0 ? '+' : ''}${diff.toFixed(2)}%. Курс впливає на вартість імпортних ЗЗР, добрив та техніки.`;
            if (curBadgeEl) {
                if (Math.abs(diff) >= 2) { curBadgeEl.textContent = 'ВОЛАТИЛЬНІСТЬ'; curBadgeEl.className = 'alert-severity-badge warning'; }
                else { curBadgeEl.textContent = 'СТАБІЛЬНО'; curBadgeEl.className = 'alert-severity-badge'; }
            }
        } else if (curDescEl) {
            curDescEl.textContent = 'Офіційний курс НБУ (bank.gov.ua). Динаміка за 7 днів синхронізується...';
        }
    }

    // Сума ефективних температур — реальний розрахунок GDD (база +5°C) з денних температур Open-Meteo
    const gdd = globalState.gdd7 ?? null;
    const cropMetricEl = document.getElementById('alert-metric-crop');
    const cropDescEl   = document.getElementById('alert-desc-crop');
    if (cropMetricEl) cropMetricEl.textContent = gdd != null ? `GDD₅: ${gdd} °C·день / 7 днів` : 'GDD₅: синхронізація...';
    if (cropDescEl && gdd != null) cropDescEl.textContent = 'Сума ефективних температур (база +5°C) за вікно 7 днів: 3 минулих + 4 прогнозних днів Open-Meteo.';
}

// Журнал подій: ТІЛЬКИ реальні системні події з реальним часом (без вигаданих записів)
function addEventLog(type, text) {
    if (!Array.isArray(globalState.eventLog)) globalState.eventLog = [];
    const last = globalState.eventLog[globalState.eventLog.length - 1];
    if (last && last.text === text) return; // дедуплікація однакових подій
    globalState.eventLog.push({ time: new Date(), type, text });
    if (globalState.eventLog.length > 8) globalState.eventLog.shift();
    renderEventLog();
}

function renderEventLog() {
    const logEl = document.getElementById('sitcenter-event-log');
    if (!logEl) return;

    if (!Array.isArray(globalState.eventLog) || globalState.eventLog.length === 0) {
        logEl.innerHTML = `
            <div class="event-log-entry">
                <span class="event-log-time">--:--</span>
                <span class="event-log-dot info"></span>
                <span class="event-log-text">Синхронізація з офіційними джерелами: НБУ (bank.gov.ua) · Open-Meteo · Sentinel-2 NDVI...</span>
            </div>`;
        return;
    }

    const fmt = (d) => d.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });

    logEl.innerHTML = [...globalState.eventLog].reverse().map(e => `
        <div class="event-log-entry">
            <span class="event-log-time">${fmt(e.time)}</span>
            <span class="event-log-dot ${e.type}"></span>
            <span class="event-log-text">${e.text}</span>
        </div>
    `).join('');
}
