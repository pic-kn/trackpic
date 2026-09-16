export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-L473FCY7DX";

// ページビュー計測
export const pageview = (url) => {
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX") {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// カスタムイベント計測 (画像アップロード・PNG保存・Xシェア・スポイト利用など)
export const event = ({ action, category, label, value }) => {
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
