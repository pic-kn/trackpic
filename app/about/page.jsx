import StaticHeader from "../../components/StaticHeader";

export const metadata = {
  title: "TrackPicについて - TrackPic",
  description: "写真から9:16音楽プレイヤー風壁紙とカラーパレットを自動生成する無料Webツール「TrackPic」のご紹介です。",
};

export default function AboutPage() {
  return (
    <div className="static-page-wrapper">
      <StaticHeader />
      <main className="static-page-card">
        <h1 className="static-page-title">TrackPicについて</h1>
        <div className="static-page-body">
          <p>
            <strong>TrackPic（トラックピック）</strong>は、お気に入りの写真から 9:16 音楽プレイヤー風壁紙画像とカラーパレットを生成できる無料のWebツールです。
          </p>

          <h2>主な機能と特徴</h2>
          <ul>
            <li>
              <strong>各種壁紙サイズ対応：</strong> iPhone（1320 × 2868）、Android FHD+（1080 × 2400）、Android WQHD+（1440 × 3200）、標準 9:16（1080 × 1920）の各解像度に対応。
            </li>
            <li>
              <strong>カラーパレット抽出：</strong> 読み込んだ写真からカラーパレットを自動抽出。写真にマッチする壁紙デザインをすぐに作成できます。
            </li>
            <li>
              <strong>自由なカスタマイズ：</strong> 曲名・アーティスト名の編集、背景色の自由変更、スポイト機能による写真からのダイレクト色選択に対応。
            </li>
            <li>
              <strong>安心のブラウザ内処理：</strong> アップロードされた画像ファイルそのものを外部サーバーへ送信・アップロード・保存することはありません。処理はすべてお使いのブラウザ内（HTML5 Canvas）で完結します。
            </li>
            <li>
              <strong>完全無料・登録不要：</strong> アカウント登録やインストールの必要なく、ブラウザからすぐにご利用いただけます。
            </li>
          </ul>

          <h2>開発背景・目的</h2>
          <p>
            「大切な思い出の写真やお気に入りの画像を、音楽プレイヤーのジャケットのようにスマホの画面で美しく飾ってほしい」という想いから、個人開発で制作・公開いたしました。写真の色合いを引き立てるシンプルなデザインと使いやすさを追求しています。
          </p>
        </div>
      </main>
    </div>
  );
}
