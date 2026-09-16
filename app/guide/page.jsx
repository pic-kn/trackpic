import StaticHeader from "../../components/StaticHeader";

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
            TrackPicを使って音楽プレイヤー風壁紙を作成・保存する手順をご案内します。
          </p>

          <h2>Step 1: 壁紙サイズを選択する</h2>
          <p>
            設定パネルの「SIZE / 壁紙サイズ」から、お使いのスマートフォンの解像度・アスペクト比に合ったサイズ（iPhone、Android FHD+、Android WQHD+、標準 9:16）を選択します。
          </p>

          <h2>Step 2: 写真を選択する</h2>
          <p>
            「IMAGE / 写真」領域の「写真を選択」ボタンをクリック（またはプレビュー画面をタップ）し、端末内の画像ファイルを選択します。写真が読み込まれると、色合いに応じたカラーパレットが自動抽出されます。
          </p>

          <h2>Step 3: 楽曲情報を入力する</h2>
          <p>
            「INFO / 楽曲情報」領域で、「曲名」および「アーティスト名」をお好みの文字に入力・編集します。
          </p>

          <h2>Step 4: カラー＆背景色を調整する</h2>
          <p>
            抽出されたカラーパレットから色を選択するか、「スポイト」機能を有効にして写真上の好きな場所をタップし、背景色を指定します。カラーピッカーで直接指定することも可能です。
          </p>

          <h2>Step 5: 保存・共有する</h2>
          <p>
            「PNG保存」ボタンを押すと、作成した壁紙画像がダウンロード保存されます（スマートフォン環境では写真保存シートが開きます）。また、「Xでシェア」ボタンからSNSで共有することもできます。
          </p>
        </div>
      </main>
    </div>
  );
}
