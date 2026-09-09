"use client";

import { Copy, Download, Image as ImageIcon, Link as LinkIcon, Maximize2, Music, Palette, Pipette, Share2, Trash2, Type, Upload, User } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { renderMusicPlayerCanvas, WALLPAPER_PRESETS } from "../lib/canvasMath";
import { extractPalette } from "../lib/colorExtractor";

// X (Twitter) アイコン
function XIcon({ size = 16 }) {
  return (
    <svg aria-hidden="true" height={size} viewBox="0 0 24 24" width={size} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function MusicPlayerMaker() {
  // 設定ステート
  const [imageSrc, setImageSrc] = useState(null);
  const [loadedImage, setLoadedImage] = useState(null);
  const [title, setTitle] = useState("青色がすき。");
  const [artist, setArtist] = useState("keiju");

  // 壁紙サイズプリセット (iPhone, Android FHD+, Android WQHD+, 標準9:16)
  const [selectedPresetId, setSelectedPresetId] = useState("iphone");
  const currentPreset = WALLPAPER_PRESETS.find((p) => p.id === selectedPresetId) || WALLPAPER_PRESETS[0];

  // カラー関連 (写真抽出 & スポイト機能)
  const [palette, setPalette] = useState([]);
  const [selectedBgHex, setSelectedBgHex] = useState("#FFFFFF");
  const [isDropperActive, setIsDropperActive] = useState(false);

  // モバイルパネル
  const [activeMobilePanel, setActiveMobilePanel] = useState("");

  // UI状態
  const [toastMessage, setToastMessage] = useState("");
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // トースト表示
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  // 写真ロード & 自動カラー抽出
  useEffect(() => {
    if (!imageSrc) {
      setLoadedImage(null);
      const defaultPal = extractPalette(null);
      setPalette(defaultPal);
      setSelectedBgHex("#FFFFFF");
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setLoadedImage(img);
      const extracted = extractPalette(img);
      setPalette(extracted);
      if (extracted.length > 0) {
        setSelectedBgHex(extracted[0].hex);
      }
      showToast("写真から色を抽出しました");
    };
    img.onerror = () => {
      showToast("画像の読み込みに失敗しました");
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Canvas再描画
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    renderMusicPlayerCanvas(ctx, {
      width: currentPreset.width,
      height: currentPreset.height,
      image: loadedImage,
      title,
      artist,
      palette,
      bgColor: selectedBgHex
    });
  }, [currentPreset, loadedImage, title, artist, palette, selectedBgHex]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // 写真選択処理
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("画像ファイルを選択してください");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // 画像クリア
  const handleClearImage = () => {
    setImageSrc(null);
    setLoadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    showToast("写真をクリアしました");
  };

  // 画像変更ダイアログを開く
  const triggerImageSelect = () => {
    fileInputRef.current?.click();
  };

  // スポイトモード切替
  const toggleDropper = () => {
    if (!imageSrc) {
      showToast("先に写真を選択してください");
      return;
    }
    setIsDropperActive((prev) => !prev);
  };

  // キャンバスクリック (スポイト抽出 or 写真変更)
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDropperActive && loadedImage) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      const clickX = (clientX - rect.left) * (currentPreset.width / rect.width);
      const clickY = (clientY - rect.top) * (currentPreset.height / rect.height);

      const scale = currentPreset.width / 1080;
      const marginX = 76 * scale;
      const contentWidth = currentPreset.width - marginX * 2;
      const jacketSize = contentWidth;
      const jacketX = marginX;

      const infoH = 140 * scale;
      const progressH = 120 * scale;
      const controlsH = 180 * scale;
      const paletteH = 170 * scale;
      const totalContentH = jacketSize + infoH + progressH + controlsH + paletteH;
      const jacketY = Math.max(100 * scale, (currentPreset.height - totalContentH) / 2);

      // ジャケット領域内のクリックか判定
      if (
        clickX >= jacketX &&
        clickX <= jacketX + jacketSize &&
        clickY >= jacketY &&
        clickY <= jacketY + jacketSize
      ) {
        const focusX = (clickX - jacketX) / jacketSize;
        const focusY = (clickY - jacketY) / jacketSize;

        const extracted = extractPalette(loadedImage, focusX, focusY);
        setPalette(extracted);
        if (extracted.length > 0) {
          setSelectedBgHex(extracted[0].hex);
        }
        showToast("選択位置から色を抽出しました");
      } else {
        showToast("写真の上をタップして色を選択してください");
      }
      return;
    }

    triggerImageSelect();
  };

  // PNG保存
  const saveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const filename = `music_player_${title ? title.replace(/\s+/g, "_") : "card"}_${currentPreset.id}.png`;
      link.download = filename;
      link.href = dataUrl;
      link.click();
      showToast(`${currentPreset.name} のPNG画像を保存しました`);
    } catch (err) {
      console.error(err);
      showToast("画像の保存に失敗しました");
    }
  };

  // サイト自体の X (Twitter) シェア機能
  const shareSiteOnX = () => {
    const siteUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareText = "お気に入りの写真と曲名で音楽プレイヤー風壁紙画像を作ろう！ #MusicPlayerMaker";
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`, "_blank");
  };

  return (
    <main className="page-shell">
      {/* 非表示のファイルインプット */}
      <input
        accept="image/*"
        className="hidden-file-input"
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
      />

      {/* プレビューエリア (左) */}
      <section className="preview-panel" aria-label="プレビューエリア">
        <header className="preview-toolbar">
          <span>Music Player Maker</span>
          <span>{currentPreset.name}</span>
        </header>

        <div className="canvas-wrapper">
          {/* 画像タップで写真変更またはスポイト抽出 */}
          <canvas
            ref={canvasRef}
            width={currentPreset.width}
            height={currentPreset.height}
            title={isDropperActive ? "写真上をタップして色を抽出" : "タップして画像を変更"}
            style={{ cursor: isDropperActive ? "crosshair" : "pointer" }}
            onClick={handleCanvasClick}
          />

          {isDropperActive && (
            <div style={{
              position: "absolute",
              top: 16,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0, 0, 0, 0.75)",
              color: "#ffffff",
              padding: "6px 16px",
              borderRadius: 20,
              fontSize: 12,
              letterSpacing: "0.05em",
              pointerEvents: "none",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: 6
            }}>
              <Pipette size={14} />
              <span>写真の上をタップして色を選択</span>
            </div>
          )}

          <div className="canvas-actions">
            <button className="share-button" type="button" onClick={shareSiteOnX}>
              <XIcon size={16} />
              <span>Xでシェア</span>
            </button>
            <button className="download-button" type="button" onClick={saveImage}>
              <Download size={16} />
              <span>PNG保存</span>
            </button>
          </div>
        </div>
      </section>

      {/* 設定エリア (右・デスクトップ) */}
      <section className="control-panel" aria-label="設定エリア">
        <div className="brand-row">
          <p className="eyebrow">MUSIC PLAYER MAKER</p>
        </div>

        {/* 壁紙サイズ選択 */}
        <div className="control-section">
          <h2 className="control-section-title">SIZE / 壁紙サイズ</h2>
          <div className="control-card">
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {WALLPAPER_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className={`icon-button ${selectedPresetId === preset.id ? "active" : ""}`}
                  style={{ justifyContent: "flex-start", padding: "0 12px", height: 38, fontSize: 12 }}
                  onClick={() => setSelectedPresetId(preset.id)}
                >
                  <Maximize2 size={13} />
                  <span>{preset.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 写真アップロード */}
        <div className="control-section">
          <h2 className="control-section-title">IMAGE / 写真</h2>
          <div className="control-card">
            {imageSrc ? (
              <div className="thumbnail-preview-container">
                <img
                  src={imageSrc}
                  alt="アップロード画像"
                  className="thumbnail-img"
                  onClick={triggerImageSelect}
                  title="クリックして画像を変更"
                />
                <button
                  type="button"
                  className="clear-btn"
                  onClick={handleClearImage}
                  title="写真を削除"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ) : (
              <div
                className="upload-placeholder"
                onClick={triggerImageSelect}
              >
                <Upload size={20} />
                <span>写真を選択</span>
              </div>
            )}
          </div>
        </div>

        {/* 楽曲情報 */}
        <div className="control-section">
          <h2 className="control-section-title">INFO / 楽曲情報</h2>
          <div className="control-card">
            <div className="input-label">
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Music size={13} /> 曲名
              </span>
              <input
                type="text"
                className="text-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="曲名"
              />
            </div>

            <div className="input-label">
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Type size={13} /> アーティスト名
              </span>
              <input
                type="text"
                className="text-input"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="アーティスト名"
              />
            </div>

            <div className="input-label">
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <User size={13} /> クレジット表記 (固定)
              </span>
              <input
                type="text"
                className="text-input"
                value="@pic_kn__"
                readOnly
                disabled
                style={{ opacity: 0.75, cursor: "not-allowed" }}
              />
            </div>
          </div>
        </div>

        {/* カラーパレット / 背景色選択 */}
        <div className="control-section">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 className="control-section-title" style={{ margin: 0 }}>COLOR / パレット & 背景</h2>
            {imageSrc && (
              <button
                type="button"
                className={`icon-button ${isDropperActive ? "active" : ""}`}
                style={{ height: 28, padding: "0 10px", fontSize: 11, gap: 5 }}
                onClick={toggleDropper}
              >
                <Pipette size={12} />
                <span>{isDropperActive ? "解除する" : "色を選ぶ"}</span>
              </button>
            )}
          </div>
          <div className="control-card" style={{ marginTop: 8 }}>
            <div className="palette-swatches">
              {palette.map((item, idx) => (
                <div
                  key={idx}
                  className={`swatch-item ${selectedBgHex === item.hex ? "selected" : ""}`}
                  onClick={() => setSelectedBgHex(item.hex)}
                  title={item.hex}
                >
                  <div
                    className="swatch-circle"
                    style={{ backgroundColor: item.hex }}
                  />
                  <span className="swatch-hex">{item.hex}</span>
                </div>
              ))}
            </div>

            <div className="color-picker-row" style={{ marginTop: 4 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--ink-dim)" }}>
                <Palette size={13} /> 背景色
              </span>
              <input
                type="color"
                className="color-picker-input"
                value={selectedBgHex}
                onChange={(e) => setSelectedBgHex(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* サイト自体の X シェアボタン */}
        <div className="control-section">
          <h2 className="control-section-title">SHARE SITE / サイト共有</h2>
          <div className="control-card">
            <button
              type="button"
              className="icon-button"
              style={{ width: "100%", gap: 8, height: 44, fontSize: 13, fontWeight: 500 }}
              onClick={shareSiteOnX}
            >
              <XIcon size={16} />
              <span>X でシェアする</span>
            </button>
          </div>
        </div>

        {/* エクスポート */}
        <div className="control-section">
          <div className="control-card" style={{ marginTop: 8 }}>
            <button
              type="button"
              className="icon-button active"
              style={{ width: "100%", gap: 8, height: 48, fontSize: 13, fontWeight: 600 }}
              onClick={saveImage}
            >
              <Download size={18} />
              <span>PNG保存</span>
            </button>
          </div>
        </div>
      </section>

      {/* モバイル表示時のボトムツールバー & ボトムシート */}
      <section className="mobile-editor" aria-label="モバイル画像設定">
        {activeMobilePanel && (
          <div className="mobile-sheet">
            <div className="mobile-sheet-title">
              <span>
                {activeMobilePanel === "size" && "Wallpaper Size"}
                {activeMobilePanel === "image" && "Photo"}
                {activeMobilePanel === "text" && "Track Info"}
                {activeMobilePanel === "color" && "Color Palette"}
                {activeMobilePanel === "share" && "Share Site"}
              </span>
              <button
                type="button"
                className="mobile-sheet-close"
                onClick={() => setActiveMobilePanel("")}
              >
                ×
              </button>
            </div>

            {/* モバイル: 壁紙サイズ */}
            {activeMobilePanel === "size" && (
              <div className="control-card" style={{ border: 0, boxShadow: "none", padding: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {WALLPAPER_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      className={`icon-button ${selectedPresetId === preset.id ? "active" : ""}`}
                      style={{ justifyContent: "flex-start", padding: "0 12px", height: 38, fontSize: 12 }}
                      onClick={() => setSelectedPresetId(preset.id)}
                    >
                      <Maximize2 size={13} />
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* モバイル: 写真 */}
            {activeMobilePanel === "image" && (
              <div className="control-card" style={{ border: 0, boxShadow: "none", padding: 0 }}>
                {imageSrc ? (
                  <div className="thumbnail-preview-container">
                    <img src={imageSrc} alt="Preview" className="thumbnail-img" onClick={triggerImageSelect} />
                    <button type="button" className="clear-btn" onClick={handleClearImage}><Trash2 size={14} /></button>
                  </div>
                ) : (
                  <div className="upload-placeholder" onClick={triggerImageSelect}>
                    <Upload size={20} />
                    <span>写真を選択</span>
                  </div>
                )}
              </div>
            )}

            {/* モバイル: テキスト */}
            {activeMobilePanel === "text" && (
              <div className="control-card" style={{ border: 0, boxShadow: "none", padding: 0 }}>
                <div className="input-label">曲名 <input type="text" className="text-input" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                <div className="input-label">アーティスト <input type="text" className="text-input" value={artist} onChange={(e) => setArtist(e.target.value)} /></div>
                <div className="input-label">クレジット <input type="text" className="text-input" value="@pic_kn__" readOnly disabled style={{ opacity: 0.75 }} /></div>
              </div>
            )}

            {/* モバイル: カラー */}
            {activeMobilePanel === "color" && (
              <div className="control-card" style={{ border: 0, boxShadow: "none", padding: 0 }}>
                {imageSrc && (
                  <button
                    type="button"
                    className={`icon-button ${isDropperActive ? "active" : ""}`}
                    style={{ width: "100%", height: 38, marginBottom: 12, fontSize: 12, gap: 6 }}
                    onClick={() => {
                      toggleDropper();
                      setActiveMobilePanel("");
                    }}
                  >
                    <Pipette size={14} />
                    <span>{isDropperActive ? "スポイトを解除" : "写真から色を選ぶ (スポイト)"}</span>
                  </button>
                )}
                <div className="palette-swatches">
                  {palette.map((item, idx) => (
                    <div key={idx} className={`swatch-item ${selectedBgHex === item.hex ? "selected" : ""}`} onClick={() => setSelectedBgHex(item.hex)}>
                      <div className="swatch-circle" style={{ backgroundColor: item.hex }} />
                      <span className="swatch-hex">{item.hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* モバイル: Xシェア */}
            {activeMobilePanel === "share" && (
              <div className="control-card" style={{ border: 0, boxShadow: "none", padding: 0 }}>
                <button
                  type="button"
                  className="icon-button"
                  style={{ width: "100%", gap: 8, height: 44, fontSize: 13, fontWeight: 500 }}
                  onClick={shareSiteOnX}
                >
                  <XIcon size={16} />
                  <span>X でシェアする</span>
                </button>
              </div>
            )}
          </div>
        )}

        <nav className="mobile-toolbar">
          <button type="button" className={`mobile-tool ${activeMobilePanel === "size" ? "active" : ""}`} onClick={() => setActiveMobilePanel(activeMobilePanel === "size" ? "" : "size")}>
            <Maximize2 size={18} />
            <span>サイズ</span>
          </button>

          <button type="button" className={`mobile-tool ${activeMobilePanel === "text" ? "active" : ""}`} onClick={() => setActiveMobilePanel(activeMobilePanel === "text" ? "" : "text")}>
            <Type size={18} />
            <span>楽曲</span>
          </button>

          <button type="button" className={`mobile-tool ${activeMobilePanel === "color" ? "active" : ""}`} onClick={() => setActiveMobilePanel(activeMobilePanel === "color" ? "" : "color")}>
            <Palette size={18} />
            <span>カラー</span>
          </button>

          <button type="button" className={`mobile-tool ${activeMobilePanel === "share" ? "active" : ""}`} onClick={() => setActiveMobilePanel(activeMobilePanel === "share" ? "" : "share")}>
            <Share2 size={18} />
            <span>共有</span>
          </button>

          <button type="button" className="mobile-tool save" onClick={saveImage}>
            <Download size={18} />
            <span>保存</span>
          </button>
        </nav>
      </section>

      {/* トースト通知 */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">{toastMessage}</div>
        </div>
      )}
    </main>
  );
}
