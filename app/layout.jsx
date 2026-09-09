import "./globals.css";

export const metadata = {
  title: "TrackPic - 写真で作る 9:16 音楽プレイヤー風壁紙メーカー",
  description: "お気に入りの写真から美しい9:16音楽プレイヤー風壁紙とカラーパレットを生成・保存できるWebツール",
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
