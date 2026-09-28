// Proportions measured from a real Wii Menu screenshot (1200×675).
// Everything is expressed relative to a tile's height so the whole
// screen scales together, like the real thing.
const TILE_RATIO = 130 / 238;     // tile height / width
const GAP = 0.06;                 // gap between tiles, relative to tile width
const ROWS = 3;                   // the Wii always has 3 rows
const PAD_TOP = 0.45;             // space above the first row (× tile height)
const PAD_BOTTOM = 0.15;          // space between the last row and the footer
const FOOTER_MIN = 1.2;           // footer height (× tile height) — the Wii is ~1.42
const FOOTER_MAX = 1.45;
const MAX_COLS = 4;

const MIN_FOOTER_PX = 104;
const MIN_BUTTON_PX = 60;         // comfortable tap target on phones

/** @param {number} v @param {number} lo @param {number} hi */
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/**
 * Works out tile size, columns and footer size for a W×H screen.
 * Tries 1–4 columns and keeps whichever lets the tiles fill the most
 * space, so narrow or tall screens get fewer, bigger tiles instead of
 * small tiles with big empty gaps.
 *
 * @param {number} W
 * @param {number} H
 */
export function computeLayout(W, H) {
    const arrow = clamp(W * 0.04, 44, 72);
    // Side margins must fit the page arrows; the next page peeks through them
    const minSide = Math.max(W * 0.085, arrow + 14);
    const availW = W - 2 * minSide;

    const gapH = (GAP / TILE_RATIO);                     // gap in tile heights
    const gridUnits = ROWS + (ROWS - 1) * gapH + PAD_TOP + PAD_BOTTOM;

    /** @param {number} cols */
    function fit(cols) {
        const tileWFromWidth = availW / (cols + (cols - 1) * GAP);
        const tileHFromHeight = H / (gridUnits + FOOTER_MIN);
        const minFooterTileH = (H - MIN_FOOTER_PX) / gridUnits;
        const tileH = Math.min(tileWFromWidth * TILE_RATIO, tileHFromHeight, minFooterTileH);
        return { cols, tileH, tileW: tileH / TILE_RATIO };
    }

    const options = [];
    for (let c = 1; c <= MAX_COLS; c++) options.push(fit(c));
    const score = (/** @type {{cols:number,tileW:number}} */ o) => o.cols * o.tileW * o.tileW;
    const best = Math.max(...options.map(score));
    // Prefer more columns when it barely costs any tile size
    const pick = options.filter(o => score(o) >= best * 0.9).pop() ?? options[0];

    const tileW = Math.floor(pick.tileW);
    const tileH = Math.floor(pick.tileH);
    const gap = Math.round(tileW * GAP);
    const rowsH = ROWS * tileH + (ROWS - 1) * gap;

    // Footer takes what's left, within Wii-like proportions
    let footerH = clamp(H - rowsH - (PAD_TOP + PAD_BOTTOM) * tileH, FOOTER_MIN * tileH, FOOTER_MAX * tileH);
    footerH = Math.max(MIN_FOOTER_PX, Math.floor(footerH));

    const gridH = H - footerH;
    // Any extra height goes mostly above the tiles, like the Wii
    const spare = Math.max(0, gridH - rowsH - (PAD_TOP + PAD_BOTTOM) * tileH);
    const padTop = Math.round(PAD_TOP * tileH + spare * 0.6);

    const blockW = pick.cols * tileW + (pick.cols - 1) * gap;
    const side = Math.max(minSide, (W - blockW) / 2);

    return {
        cols: pick.cols,
        rows: ROWS,
        tileW,
        tileH,
        gap,
        padTop,
        side,
        arrow,
        footerH,
        // Footer pieces, sized like the Wii but never too small to tap on a phone
        button: Math.round(clamp(Math.min(footerH * 0.58, W * 0.22), MIN_BUTTON_PX, 200)),
        timeFont: Math.round(Math.min(footerH * 0.3, W * 0.1)),
        dateFont: Math.round(Math.min(footerH * 0.15, W * 0.055))
    };
}
