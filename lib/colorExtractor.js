function clampColor(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

export function rgbToHex(r, g, b) {
  const toHex = (c) => clampColor(c).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hexToRgb(hex) {
  if (!hex) return { r: 33, g: 79, b: 104 };
  const clean = hex.replace("#", "");
  const num = parseInt(clean.length === 3 ? clean.split("").map(c => c + c).join("") : clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return { h: h / 6, s, l };
}

// 白背景時の初期フォールバックパレット (サイト雰囲気に合わせたカラーパレット)
export function fallbackPalette() {
  return [
    { r: 74, g: 99, b: 112, hex: "#4A6370" },
    { r: 115, g: 160, b: 177, hex: "#73A0B1" },
    { r: 152, g: 182, b: 190, hex: "#98B6BE" },
    { r: 189, g: 203, b: 204, hex: "#BDCBCC" },
    { r: 235, g: 241, b: 242, hex: "#EBF1F2" }
  ];
}

// Simple MMCQ (Median Cut Quantization) for ColorThief equivalent palette generation
function quantizePixels(pixels, maxColors = 25) {
  if (!pixels || pixels.length === 0) return [];

  // VBox (Volume Box) for Median Cut
  class VBox {
    constructor(r1, r2, g1, g2, b1, b2, histo) {
      this.r1 = r1; this.r2 = r2;
      this.g1 = g1; this.g2 = g2;
      this.b1 = b1; this.b2 = b2;
      this.histo = histo;
    }
    volume() {
      return (this.r2 - this.r1 + 1) * (this.g2 - this.g1 + 1) * (this.b2 - this.b1 + 1);
    }
    count() {
      if (this._count !== undefined) return this._count;
      let npix = 0;
      for (let r = this.r1; r <= this.r2; r++) {
        for (let g = this.g1; g <= this.g2; g++) {
          for (let b = this.b1; b <= this.b2; b++) {
            const index = (r << 10) + (g << 5) + b;
            npix += this.histo[index] || 0;
          }
        }
      }
      this._count = npix;
      return npix;
    }
    avg() {
      if (this._avg) return this._avg;
      let ntot = 0;
      const mult = 1 << 3;
      let rsum = 0, gsum = 0, bsum = 0;
      for (let r = this.r1; r <= this.r2; r++) {
        for (let g = this.g1; g <= this.g2; g++) {
          for (let b = this.b1; b <= this.b2; b++) {
            const index = (r << 10) + (g << 5) + b;
            const h = this.histo[index] || 0;
            ntot += h;
            rsum += h * (r + 0.5) * mult;
            gsum += h * (g + 0.5) * mult;
            bsum += h * (b + 0.5) * mult;
          }
        }
      }
      if (ntot) {
        this._avg = [clampColor(rsum / ntot), clampColor(gsum / ntot), clampColor(bsum / ntot)];
      } else {
        this._avg = [clampColor((mult * (this.r1 + this.r2 + 1)) / 2), clampColor((mult * (this.g1 + this.g2 + 1)) / 2), clampColor((mult * (this.b1 + this.b2 + 1)) / 2)];
      }
      return this._avg;
    }
  }

  // 5-bit color histogram
  const histo = new Uint32Array(1 << 15);
  pixels.forEach(([r, g, b]) => {
    const rval = r >> 3;
    const gval = g >> 3;
    const bval = b >> 3;
    const index = (rval << 10) + (gval << 5) + bval;
    histo[index]++;
  });

  let rmin = 32, rmax = 0, gmin = 32, gmax = 0, bmin = 32, bmax = 0;
  for (let i = 0; i < histo.length; i++) {
    if (histo[i] > 0) {
      const r = i >> 10;
      const g = (i >> 5) & 31;
      const b = i & 31;
      if (r < rmin) rmin = r; if (r > rmax) rmax = r;
      if (g < gmin) gmin = g; if (g > gmax) gmax = g;
      if (b < bmin) bmin = b; if (b > bmax) bmax = b;
    }
  }

  const initialBox = new VBox(rmin, rmax, gmin, gmax, bmin, bmax, histo);
  const boxes = [initialBox];

  function cutBox(box) {
    if (!box.count()) return [null, null];
    const rw = box.r2 - box.r1 + 1;
    const gw = box.g2 - box.g1 + 1;
    const bw = box.b2 - box.b1 + 1;
    const maxw = Math.max(rw, gw, bw);

    let total = 0;
    const partialSum = [];
    let axis = "r";
    if (maxw === rw) {
      axis = "r";
      for (let r = box.r1; r <= box.r2; r++) {
        let sum = 0;
        for (let g = box.g1; g <= box.g2; g++) {
          for (let b = box.b1; b <= box.b2; b++) {
            sum += histo[(r << 10) + (g << 5) + b] || 0;
          }
        }
        total += sum;
        partialSum[r] = total;
      }
    } else if (maxw === gw) {
      axis = "g";
      for (let g = box.g1; g <= box.g2; g++) {
        let sum = 0;
        for (let r = box.r1; r <= box.r2; r++) {
          for (let b = box.b1; b <= box.b2; b++) {
            sum += histo[(r << 10) + (g << 5) + b] || 0;
          }
        }
        total += sum;
        partialSum[g] = total;
      }
    } else {
      axis = "b";
      for (let b = box.b1; b <= box.b2; b++) {
        let sum = 0;
        for (let r = box.r1; r <= box.r2; r++) {
          for (let g = box.g1; g <= box.g2; g++) {
            sum += histo[(r << 10) + (g << 5) + b] || 0;
          }
        }
        total += sum;
        partialSum[b] = total;
      }
    }

    const halfTotal = total / 2;
    let cutPoint = axis === "r" ? box.r1 : axis === "g" ? box.g1 : box.b1;
    const endPoint = axis === "r" ? box.r2 : axis === "g" ? box.g2 : box.b2;

    for (let i = cutPoint; i <= endPoint; i++) {
      if (partialSum[i] >= halfTotal) {
        cutPoint = i;
        break;
      }
    }

    let b1 = null, b2 = null;
    if (axis === "r") {
      b1 = new VBox(box.r1, cutPoint, box.g1, box.g2, box.b1, box.b2, histo);
      b2 = new VBox(cutPoint + 1, box.r2, box.g1, box.g2, box.b1, box.b2, histo);
    } else if (axis === "g") {
      b1 = new VBox(box.r1, box.r2, box.g1, cutPoint, box.b1, box.b2, histo);
      b2 = new VBox(box.r1, box.r2, cutPoint + 1, box.g2, box.b1, box.b2, histo);
    } else {
      b1 = new VBox(box.r1, box.r2, box.g1, box.g2, box.b1, cutPoint, histo);
      b2 = new VBox(box.r1, box.r2, box.g1, box.g2, cutPoint + 1, box.b2, histo);
    }

    return [b1, b2];
  }

  let iter = 0;
  const maxIter = 100;
  while (boxes.length < maxColors && iter < maxIter) {
    iter++;
    boxes.sort((a, b) => b.count() - a.count());
    const target = boxes.shift();
    if (!target || !target.count()) {
      if (target && target.count()) boxes.push(target);
      break;
    }
    const [b1, b2] = cutBox(target);
    let added = false;
    if (b1 && b1.count()) {
      boxes.push(b1);
      added = true;
    }
    if (b2 && b2.count()) {
      boxes.push(b2);
      added = true;
    }
    if (!added) {
      boxes.push(target);
      break;
    }
  }

  return boxes.map((box) => box.avg());
}

// color-memo と全く同一のカラーパレット抽出関数 (focusX, focusY によるスポイト抽出対応)
export function extractPalette(image, focusX, focusY) {
  if (!image) {
    return fallbackPalette();
  }

  const iw = image.naturalWidth || image.width || 300;
  const ih = image.naturalHeight || image.height || 300;

  // focusX, focusY が指定された場合は 20% 領域クロップ（スポイト抽出）、未指定の場合は中央 70% クロップ
  const isFocused = typeof focusX === "number" && typeof focusY === "number";
  const cropRatio = isFocused ? 0.2 : 0.7;
  const cropW = Math.max(10, Math.round(iw * cropRatio));
  const cropH = Math.max(10, Math.round(ih * cropRatio));

  const originX = isFocused ? Math.round(focusX * iw) : Math.round(iw / 2);
  const originY = isFocused ? Math.round(focusY * ih) : Math.round(ih / 2);

  const sx = Math.max(0, Math.min(iw - cropW, originX - cropW / 2));
  const sy = Math.max(0, Math.min(ih - cropH, originY - cropH / 2));

  const canvas = document.createElement("canvas");
  canvas.width = cropW;
  canvas.height = cropH;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(image, sx, sy, cropW, cropH, 0, 0, cropW, cropH);

  const imgData = ctx.getImageData(0, 0, cropW, cropH).data;
  const pixels = [];
  const step = 4; // サンプリングステップ

  for (let i = 0; i < imgData.length; i += 4 * step) {
    const r = imgData[i];
    const g = imgData[i + 1];
    const b = imgData[i + 2];
    const a = imgData[i + 3];
    if (a >= 125) {
      pixels.push([r, g, b]);
    }
  }

  if (pixels.length === 0) {
    return fallbackPalette();
  }

  // 2. ColorThief と同じ 25 色量子化パレット取得
  const rawColors = quantizePixels(pixels, 25);
  if (!rawColors || rawColors.length === 0) {
    return fallbackPalette();
  }

  // 3. ドミナントカラー (主色)
  const dominant = rawColors[0];
  const mainHue = rgbToHsl(dominant[0], dominant[1], dominant[2]).h;
  const hueDist = (h1, h2) => {
    const d = Math.abs(h1 - h2);
    return Math.min(d, 1 - d);
  };
  const HUE_RANGE = 0.15;
  const SAT_THRESHOLD = 0.2;

  // 4. マッピングと HSL・明度計算 (color-memo の式: lum = 0.2126*r + 0.7152*g + 0.0722*b)
  const mapped = rawColors.map((rgb) => {
    const { h, s } = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    return {
      r: rgb[0],
      g: rgb[1],
      b: rgb[2],
      hex: rgbToHex(rgb[0], rgb[1], rgb[2]),
      lum: 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2],
      h,
      s
    };
  });

  const inRange = mapped.filter((c) => c.s < SAT_THRESHOLD || hueDist(c.h, mainHue) <= HUE_RANGE);
  const candidates = inRange.length >= 5 ? inRange : mapped;

  // 5. 明度順 (昇順: 暗い色 -> 明るい色) にソートし、重複排除して5色選択 (color-memo と完全同一ロジック)
  candidates.sort((a, b) => a.lum - b.lum);

  const pickN = (list, minDiff) => {
    const result = [list[0]];
    for (const c of list.slice(1)) {
      if (result.every((p) => Math.abs(p.lum - c.lum) >= minDiff)) {
        result.push(c);
        if (result.length === 5) break;
      }
    }
    return result;
  };

  let picked = pickN(candidates, 25);
  if (picked.length < 5) picked = pickN(candidates, 15);
  if (picked.length < 5) picked = pickN(candidates, 8);
  if (picked.length < 5) picked = pickN(candidates, 5);
  if (picked.length < 5) picked = pickN(candidates, 3);

  // 5色に満たない場合の補填
  const result = [...picked];
  while (result.length < 5) {
    const fb = fallbackPalette()[result.length];
    result.push(fb);
  }

  return result.slice(0, 5);
}
