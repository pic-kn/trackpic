import "./globals.css";

export const metadata = {
  title: "Music Player Maker - 9:16 音楽プレイヤー風画像ジェネレーター",
  description: "お気に入りの写真や曲名から美しい9:16音楽プレイヤー風画像を生成・エクスポートできるWebツール",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
