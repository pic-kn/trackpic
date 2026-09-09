export const WALLPAPER_PRESETS = [
  { id: "iphone", name: "iPhone 壁紙 (1320 × 2868)", width: 1320, height: 2868 },
  { id: "android_fhd", name: "Android FHD+ (1080 × 2400)", width: 1080, height: 2400 },
  { id: "android_wqhd", name: "Android WQHD+ (1440 × 3200)", width: 1440, height: 3200 },
  { id: "standard", name: "標準 9:16 (1080 × 1920)", width: 1080, height: 1920 }
];

export const OUTPUT_CANVAS_SIZE = {
  width: 1320,
  height: 2868
};

export const CANVAS_FONT = 'fot-tsukuardgothic-std, "Zen Maru Gothic", "Hiragino Maru Gothic ProN", "TsukuARdGothic-Regular", "Noto Sans JP", sans-serif';
export const CANVAS_TITLE_FONT = '"Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif';
export const CANVAS_SUB_FONT = '"Helvetica Neue", Helvetica, Arial, sans-serif';

// 粒子・ノイズなし (完全クリアな背景)
export function drawFilmGrain(ctx, width, height, density = 0) {
  return;
}

// ハートアイコン (♡) - 左右完全対称なきれいな形状
function drawHeartIcon(ctx, x, y, color, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3.6;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(18, 9);
  ctx.bezierCurveTo(18, 4, 13.5, 0, 8.5, 0);
  ctx.bezierCurveTo(3.8, 0, 0, 3.8, 0, 8.5);
  ctx.bezierCurveTo(0, 15, 7.5, 21.5, 18, 30);
  ctx.bezierCurveTo(28.5, 21.5, 36, 15, 36, 8.5);
  ctx.bezierCurveTo(36, 3.8, 32.2, 0, 27.5, 0);
  ctx.bezierCurveTo(22.5, 0, 18, 4, 18, 9);
  ctx.closePath();
  ctx.stroke();

  ctx.restore();
}

// 前へ `|◀` アイコン
function drawPrevIcon(ctx, centerX, centerY, color, scale = 1) {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;

  ctx.fillRect(-22, -20, 5.5, 40);

  ctx.beginPath();
  ctx.moveTo(-14, 0);
  ctx.lineTo(16, -20);
  ctx.lineTo(16, 20);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

// 次へ `▶|` アイコン
function drawNextIcon(ctx, centerX, centerY, color, scale = 1) {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;

  ctx.fillRect(16.5, -20, 5.5, 40);

  ctx.beginPath();
  ctx.moveTo(14, 0);
  ctx.lineTo(-16, -20);
  ctx.lineTo(-16, 20);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

// シャッフル `🔀` アイコン
function drawShuffleIcon(ctx, centerX, centerY, color, scale = 1) {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.scale(scale, scale);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 4.5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(-24, -14);
  ctx.lineTo(-8, -14);
  ctx.bezierCurveTo(-2, -14, 2, 14, 8, 14);
  ctx.lineTo(24, 14);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-24, 14);
  ctx.lineTo(-8, 14);
  ctx.bezierCurveTo(-2, 14, 2, -14, 8, -14);
  ctx.lineTo(24, -14);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(16, -20);
  ctx.lineTo(24, -14);
  ctx.lineTo(16, -8);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(16, 8);
  ctx.lineTo(24, 14);
  ctx.lineTo(16, 20);
  ctx.stroke();

  ctx.restore();
}

// Spotifyの正確なリピート/ループ `🔁` アイコン
function drawSpotifyRepeatIcon(ctx, centerX, centerY, color, scale = 1) {
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.scale(scale, scale);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 4.2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const w = 36;
  const h = 24;
  const r = 8;

  ctx.beginPath();
  ctx.moveTo(-w / 2 + r, -h / 2);
  ctx.lineTo(w / 2 - r, -h / 2);
  ctx.arcTo(w / 2, -h / 2, w / 2, -h / 2 + r, r);
  ctx.lineTo(w / 2, h / 2 - r);
  ctx.arcTo(w / 2, h / 2, w / 2 - r, h / 2, r);
  ctx.lineTo(-w / 2 + r, h / 2);
  ctx.arcTo(-w / 2, h / 2, -w / 2, h / 2 - r, r);
  ctx.lineTo(-w / 2, -h / 2 + r);
  ctx.arcTo(-w / 2, -h / 2, -w / 2 + r, -h / 2, r);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(w / 2 - 12, -h / 2 - 7);
  ctx.lineTo(w / 2 + 2, -h / 2);
  ctx.lineTo(w / 2 - 12, -h / 2 + 7);
  ctx.stroke();

  ctx.restore();
}

// 初期画像: シックなモダン・グレーアウトのプレースホルダー
function drawDefaultGreyPlaceholder(ctx, x, y, size) {
  ctx.save();
  // シックなダークグレーの微細グラデーション
  const grad = ctx.createLinearGradient(x, y, x + size, y + size);
  grad.addColorStop(0, "#343d42");
  grad.addColorStop(1, "#222a2e");
  ctx.fillStyle = grad;
  ctx.fillRect(x, y, size, size);

  // 中央にミニマルな薄いグレーの写真アイコン & テキスト
  const cx = x + size / 2;
  const cy = y + size / 2 - size * 0.03; // 少し上にシフトして文字とのバランスを確保
  const iconW = size * 0.22;
  const iconH = size * 0.16;

  ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
  ctx.lineWidth = Math.max(2.5, size * 0.005);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // 写真フレームアイコン
  const rx = cx - iconW / 2;
  const ry = cy - iconH / 2;
  const r = 8;

  ctx.beginPath();
  ctx.moveTo(rx + r, ry);
  ctx.lineTo(rx + iconW - r, ry);
  ctx.arcTo(rx + iconW, ry, rx + iconW, ry + r, r);
  ctx.lineTo(rx + iconW, ry + iconH - r);
  ctx.arcTo(rx + iconW, ry + iconH, rx + iconW - r, ry + iconH, r);
  ctx.lineTo(rx + r, ry + iconH);
  ctx.arcTo(rx, ry + iconH, rx, ry + iconH - r, r);
  ctx.lineTo(rx, ry + r);
  ctx.arcTo(rx, ry, rx + r, ry, r);
  ctx.stroke();

  // 山と太陽のシンプルフォトアイコン
  ctx.beginPath();
  ctx.arc(cx - iconW * 0.22, ry + iconH * 0.35, iconW * 0.09, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(rx + iconW * 0.15, ry + iconH * 0.75);
  ctx.lineTo(rx + iconW * 0.42, ry + iconH * 0.45);
  ctx.lineTo(rx + iconW * 0.62, ry + iconH * 0.62);
  ctx.lineTo(rx + iconW * 0.75, ry + iconH * 0.52);
  ctx.lineTo(rx + iconW * 0.88, ry + iconH * 0.75);
  ctx.stroke();

  // 「タップして写真を選択」テキスト (筑紫A丸ゴシック)
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = `500 ${Math.round(size * 0.038)}px ${CANVAS_FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("タップして写真を選択", cx, ry + iconH + size * 0.07);

  ctx.restore();
}

// メイン描画関数
export function renderMusicPlayerCanvas(ctx, options) {
  const {
    width = 1320,
    height = 2868,
    image = null,
    title = "青色がすき。",
    artist = "keiju",
    account = "@pic_kn__",
    palette = [],
    bgColor = "#2C363D",
    customColors = {},
    imageOffsetX = 0,
    imageOffsetY = 0,
    imageScale = 1.0
  } = options;

  const cBackground = bgColor || "#FFFFFF";

  // 背景色の輝度判定 (白背景 #FFFFFF や明るい色の場合はダーク系テキスト)
  const isLightBg = (() => {
    if (!cBackground) return true;
    const clean = cBackground.replace("#", "");
    if (clean.length === 6) {
      const r = parseInt(clean.substring(0, 2), 16);
      const g = parseInt(clean.substring(2, 4), 16);
      const b = parseInt(clean.substring(4, 6), 16);
      return (0.2126 * r + 0.7152 * g + 0.0722 * b) > 180;
    }
    return true;
  })();

  const defaultText = isLightBg ? "#2C3236" : "#EDF1F3";
  const defaultSubText = isLightBg ? "rgba(44, 50, 54, 0.62)" : "rgba(237, 241, 243, 0.65)";
  const trackBgColor = isLightBg ? "rgba(44, 50, 54, 0.15)" : "rgba(237, 241, 243, 0.25)";

  const cText = customColors.text || defaultText;
  const cSubText = customColors.subText || defaultSubText;

  // 全体背景 (単色)
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = cBackground;
  ctx.fillRect(0, 0, width, height);

  // レイアウト計算 (1080px 基準でのスケーリング)
  const scale = width / 1080;
  const marginX = 76 * scale;
  const contentWidth = width - marginX * 2;

  // 1. アルバムアート (正方形 0px 角丸, 100% コンテンツ幅)
  const jacketSize = contentWidth;
  const jacketX = marginX;

  const infoH = 140 * scale;
  const progressH = 120 * scale;
  const controlsH = 180 * scale;
  const paletteH = 170 * scale;
  const totalContentH = jacketSize + infoH + progressH + controlsH + paletteH;

  // 上下中央配置 (最小上部マージン 100 * scale)
  const jacketY = Math.max(100 * scale, (height - totalContentH) / 2);

  ctx.save();
  ctx.beginPath();
  ctx.rect(jacketX, jacketY, jacketSize, jacketSize);
  ctx.clip();

  if (image) {
    const imgW = image.naturalWidth || image.width;
    const imgH = image.naturalHeight || image.height;

    const scaleCover = Math.max(jacketSize / imgW, jacketSize / imgH);
    const baseW = imgW * scaleCover;
    const baseH = imgH * scaleCover;

    const finalW = baseW * imageScale;
    const finalH = baseH * imageScale;

    const rawX = jacketX + (jacketSize - finalW) / 2 + (imageOffsetX / 100) * (jacketSize / 2);
    const rawY = jacketY + (jacketSize - finalH) / 2 + (imageOffsetY / 100) * (jacketSize / 2);

    ctx.drawImage(image, rawX, rawY, finalW, finalH);
  } else {
    drawDefaultGreyPlaceholder(ctx, jacketX, jacketY, jacketSize);
  }
  ctx.restore();

  // 2. 曲名 & ハート & アーティスト名
  const infoY = jacketY + jacketSize + 56 * scale;

  ctx.save();
  // 曲名 (左寄せ, 太字ゴシック, 文字間 3px スケール)
  ctx.fillStyle = cText;
  ctx.font = `700 ${Math.round(56 * scale)}px ${CANVAS_TITLE_FONT}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  const letterSpacingPx = 3 * scale;
  const getTitleWidth = (str) => {
    if (!str || str.length === 0) return 0;
    let w = 0;
    for (let i = 0; i < str.length; i++) {
      w += ctx.measureText(str[i]).width;
      if (i < str.length - 1) w += letterSpacingPx;
    }
    return w;
  };

  const maxTitleW = contentWidth - 60 * scale;
  let displayTitle = title || "Untitled";
  if (getTitleWidth(displayTitle) > maxTitleW) {
    while (displayTitle.length > 0 && getTitleWidth(displayTitle + "...").width > maxTitleW) {
      displayTitle = displayTitle.slice(0, -1);
    }
    displayTitle += "...";
  }

  let titleX = marginX;
  for (let i = 0; i < displayTitle.length; i++) {
    const char = displayTitle[i];
    ctx.fillText(char, titleX, infoY);
    titleX += ctx.measureText(char).width + letterSpacingPx;
  }

  // 右側のハートアイコン (♡)
  drawHeartIcon(ctx, marginX + contentWidth - 36 * scale, infoY + 12 * scale, cText, scale);

  // アーティスト名
  ctx.fillStyle = cSubText;
  ctx.font = `500 ${Math.round(34 * scale)}px ${CANVAS_SUB_FONT}`;
  let displayArtist = artist || "Unknown Artist";
  ctx.fillText(displayArtist, marginX, infoY + 76 * scale);
  ctx.restore();

  // 3. プログレスバー & タイムスタンプ
  const progressY = infoY + 140 * scale;
  const progressW = contentWidth;

  ctx.save();
  // トラック背景
  ctx.fillStyle = trackBgColor;
  ctx.fillRect(marginX, progressY, progressW, 4 * scale);

  // 再生済みライン (22%)
  const currentProgress = progressW * 0.22;
  ctx.fillStyle = cText;
  ctx.fillRect(marginX, progressY, currentProgress, 4 * scale);

  // ノブ
  ctx.beginPath();
  ctx.arc(marginX + currentProgress, progressY + 2 * scale, 8 * scale, 0, Math.PI * 2);
  ctx.fillStyle = cText;
  ctx.fill();
  ctx.restore();

  // タイムスタンプ (0:42 / 4:18)
  ctx.save();
  ctx.fillStyle = cSubText;
  ctx.font = `400 ${Math.round(24 * scale)}px ${CANVAS_SUB_FONT}`;
  ctx.textAlign = "left";
  ctx.fillText("0:42", marginX, progressY + 36 * scale);
  ctx.textAlign = "right";
  ctx.fillText("4:18", marginX + progressW, progressY + 36 * scale);
  ctx.restore();

  // 4. プレイヤー操作アイコン
  const controlsY = progressY + 140 * scale;
  const centerX = width / 2;

  ctx.save();
  // 中央: 再生ボタン
  const playRadius = 82 * scale;
  ctx.beginPath();
  ctx.arc(centerX, controlsY, playRadius, 0, Math.PI * 2);
  ctx.strokeStyle = cText;
  ctx.lineWidth = 5.5 * scale;
  ctx.stroke();

  // 再生三角 `▶`
  ctx.fillStyle = cText;
  ctx.beginPath();
  ctx.moveTo(centerX - 13 * scale, controlsY - 24 * scale);
  ctx.lineTo(centerX + 23 * scale, controlsY);
  ctx.lineTo(centerX - 13 * scale, controlsY + 24 * scale);
  ctx.closePath();
  ctx.fill();

  // 前へ `|◀`
  drawPrevIcon(ctx, centerX - 210 * scale, controlsY, cText, scale);

  // 次へ `▶|`
  drawNextIcon(ctx, centerX + 210 * scale, controlsY, cText, scale);

  // シャッフル `🔀`
  drawShuffleIcon(ctx, centerX - 380 * scale, controlsY, cSubText, scale);

  // Spotifyリピート `🔁`
  drawSpotifyRepeatIcon(ctx, centerX + 380 * scale, controlsY, cSubText, scale);
  ctx.restore();

  // 5. COLOR PALETTE (タイトル, 帯状パレット & 筑紫A丸ゴシックHEXコード)
  const paletteY = controlsY + 160 * scale;

  ctx.save();
  // タイトル「C O L O R   P A L E T T E」 (筑紫A丸ゴシック)
  ctx.fillStyle = cSubText;
  ctx.font = `500 ${Math.round(18 * scale)}px ${CANVAS_FONT}`;
  ctx.textAlign = "center";

  const paletteTitle = "COLOR PALETTE";
  const charGap = 6 * scale;
  let totalWidth = 0;
  for (let i = 0; i < paletteTitle.length; i++) {
    totalWidth += ctx.measureText(paletteTitle[i]).width + charGap;
  }
  let startX = centerX - totalWidth / 2;
  for (let i = 0; i < paletteTitle.length; i++) {
    const char = paletteTitle[i];
    ctx.fillText(char, startX, paletteY);
    startX += ctx.measureText(char).width + charGap;
  }

  // 5色の連なった長方形カラーバー帯
  const barY = paletteY + 36 * scale;
  const barHeight = 14 * scale;
  const activePalette = (palette && palette.length >= 5) ? palette.slice(0, 5) : [
    { hex: "#2C363D" },
    { hex: "#4C5B64" },
    { hex: "#82939C" },
    { hex: "#D7DFE3" },
    { hex: "#A0B9C6" }
  ];

  const barCount = activePalette.length;
  const singleBarWidth = contentWidth / barCount;

  activePalette.forEach((item, idx) => {
    const bx = marginX + idx * singleBarWidth;
    ctx.fillStyle = item.hex;
    ctx.fillRect(bx, barY, singleBarWidth, barHeight);

    // HEXコード印字 (筑紫A丸ゴシック - 控えめな 18px, 文字間 2px スケール)
    const cleanHex = (item.hex || "").startsWith("#") ? item.hex.toUpperCase() : `#${(item.hex || "").toUpperCase()}`;
    ctx.fillStyle = cSubText;
    ctx.font = `500 ${Math.round(18 * scale)}px ${CANVAS_FONT}`;

    const hexCharGap = 2 * scale;
    let hexTotalW = 0;
    for (let i = 0; i < cleanHex.length; i++) {
      hexTotalW += ctx.measureText(cleanHex[i]).width;
      if (i < cleanHex.length - 1) hexTotalW += hexCharGap;
    }

    const hexCenterX = bx + singleBarWidth / 2;
    let hexStartX = hexCenterX - hexTotalW / 2;
    ctx.textAlign = "left";
    const hexY = barY + barHeight + 28 * scale;

    for (let i = 0; i < cleanHex.length; i++) {
      const char = cleanHex[i];
      ctx.fillText(char, hexStartX, hexY);
      hexStartX += ctx.measureText(char).width + hexCharGap;
    }
  });

  ctx.restore();

  // 6. クレジット表記 (@pic_kn__, 最下部中央, 筑紫A丸ゴシック)
  const creditY = Math.max(paletteY + 140 * scale, height - 76 * scale);
  ctx.save();
  ctx.fillStyle = cSubText;
  ctx.font = `500 ${Math.round(24 * scale)}px ${CANVAS_FONT}`;
  ctx.textAlign = "center";
  ctx.fillText(account || "@pic_kn__", centerX, creditY);
  ctx.restore();
}

