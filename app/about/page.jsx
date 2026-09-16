import StaticHeader from "../../components/StaticHeader";
import FooterNav from "../../components/FooterNav";

export const metadata = {
  title: "TrackPicについて - TrackPic",
  description: "写真から美しい9:16音楽プレイヤー風壁紙とカラーパレットを自動生成するWebツール「TrackPic」のご紹介です。",
};

export default function AboutPage() {
  return (
    <div className="static-page-wrapper">
      <StaticHeader />
      <main className="static-page-card">
        <h1 className="static-page-title">TrackPicについて</h1>
        <div className="static-page-body">
          <p>
            <strong>TrackPic（トラックピック）</strong>は、お気に入りの写真から美しい 9:16 音楽プレイヤー風壁紙とカラーパレットを自動生成・保存できる無料のWebツールです。
          </p>

          <h2>主な機能と特徴</h2>
          <ul>
            <li>
              <strong>各種壁紙サイズ対応：</strong> iPhone（1320 × 2868）、Android FHD+（1080 × 2400）、Android WQHD+（1440 × 3200）、標準 9:16（1080 × 1920）に対応。
            </li>
            <li>
              <strong>自動カラーパレット抽出：</strong> 読み込んだ写真から最適なカラーパレットを自動抽出。写真にマッチする美しい壁紙デザインを即座に作成できます。
            </li>
            <li>
              <strong>自由なカスタマイズ：</strong> 曲名・アーティスト名の編集、背景色の自由変更、スポイト機能による写真からのダイレクト色選択に対応。
            </li>
            <li>
              <strong>安心のクライアント処理：</strong> アップロードした写真データはお使いのブラウザ内（HTML5 Canvas）でのみ処理されます。外部サーバーへの画像送信や保存は一切ありません。
            </li>
            <li>
              <strong>完全無料・登録不要：</strong> アカウント登録やインストール不要で、ブラウザからすぐにご利用いただけます。
            </li>
          </ul>

          <h2>開発背景・目的</h2>
          <p>
            「思い出の写真やお気に入りの画像を、音楽プレイヤーのようにいつでもスマホ画面で眺めたい」という想いからTrackPicは生まれました。写真の魅力を引き立てるカラー抽出技術と、すっきりとした音楽プレイヤー風デザインを組み合わせ、どなたでも簡単に高品質な壁紙を作れる体験を提供します。
          </p>
        </div>
      </main>
      <FooterNav />
    </div>
  );
}
