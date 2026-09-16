import StaticHeader from "../../components/StaticHeader";
import FooterNav from "../../components/FooterNav";

export const metadata = {
  title: "使い方ガイド - TrackPic",
  description: "TrackPicでの音楽プレイヤー風壁紙の簡単な作り方・使い方を解説します。",
};

export default function GuidePage() {
  return (
    <div className="static-page-wrapper">
      <StaticHeader />
      <main className="static-page-card">
        <h1 className="static-page-title">使い方ガイド</h1>
        <div className="static-page-body">
          <p>
            TrackPicを使って音楽プレイヤー風壁紙を作成・保存する手順を分かりやすくご案内します。
          </p>

          <h2>Step 1: 壁紙サイズを選択する</h2>
          <p>
            設定パネルの「SIZE / 壁紙サイズ」から、お使いのスマートフォンの解像度・アスペクト比に合ったサイズを選択します。
          </p>
          <ul>
            <li><strong>iPhone 壁紙：</strong> 1320 × 2868 px</li>
            <li><strong>Android FHD+：</strong> 1080 × 2400 px</li>
            <li><strong>Android WQHD+：</strong> 1440 × 3200 px</li>
            <li><strong>標準 9:16：</strong> 1080 × 1920 px</li>
          </ul>

          <h2>Step 2: お気に入りの写真を選択する</h2>
          <p>
            「IMAGE / 写真」領域の「写真を選択」ボタンをクリック（またはプレビュー画面をタップ）し、端末内の画像ファイルを選択します。写真が読み込まれると、色合いが即座にカラーパレットへ自動反映されます。
          </p>

          <h2>Step 3: 楽曲情報を入力する</h2>
          <p>
            「INFO / 楽曲情報」領域で「曲名」および「アーティスト名」を自由に入力します。お気に入りの楽曲名や思い入れのあるフレーズを入力してみてください。
          </p>

          <h2>Step 4: カラー＆背景色を調整する</h2>
          <p>
            「COLOR / パレット &amp; 背景」領域では、以下の方法で壁紙の色合いを変更できます。
          </p>
          <ul>
            <li><strong>カラーパレット選択：</strong> 自動抽出されたカラーパレット一覧から好きな色をタップ。</li>
            <li><strong>スポイト機能：</strong> 「写真から色を選ぶ (スポイト)」をオンにし、写真上の好きな場所をタップして色をピンポイント抽出。</li>
            <li><strong>カラーピッカー：</strong> 背景色カラーピッカーでお好みのHEX色コードを自由に指定。</li>
          </ul>

          <h2>Step 5: 保存・SNS共有</h2>
          <p>
            完成した壁紙は「PNG保存」ボタンから高画質PNG画像としてダウンロード保存できます（スマホ環境では写真アプリへの保存シートが開きます）。「Xでシェア」から作成した体験をシェアすることもできます。
          </p>
        </div>
      </main>
      <FooterNav />
    </div>
  );
}
