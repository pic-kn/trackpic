import StaticHeader from "../../components/StaticHeader";
import StaticFooter from "../../components/StaticFooter";

export const metadata = {
  title: "プライバシーポリシー - TrackPic",
  description: "TrackPicにおける個人情報の取り扱い、Cookieの使用、画像データの安全性について定めたプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <div className="static-page-wrapper">
      <StaticHeader />
      <main className="static-page-card">
        <h1 className="static-page-title">プライバシーポリシー</h1>
        <div className="static-page-body">
          <p>
            TrackPic（以下「当サービス」）は、ユーザーのプライバシーの保護を非常に重要なものと考えています。本プライバシーポリシーでは、当サービスにおける個人情報・アクセスデータ・画像データの取り扱いについて規定します。
          </p>

          <h2>1. 画像データの取り扱いについて</h2>
          <p>
            ユーザーが選択した画像ファイルそのものは、当サービスのサーバーへ送信・保存されません。カラー抽出や画像生成等の処理はすべて、ユーザーのお使いのブラウザ内（HTML5 Canvas技術）でローカルに実行されます。
          </p>

          <h2>2. アクセス解析ツールについて</h2>
          <p>
            当サービスでは、サービスの利用状況の把握および改善を目的として、Googleによるアクセス解析ツール「Google アナリティクス 4（GA4）」を利用しています。
          </p>
          <p>
            Google アナリティクスはデータ収集のためにCookie（クッキー）を使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
          </p>
          <p>
            Cookieの収集は、お使いのブラウザの設定により無効化することが可能です。Googleによるデータの収集および処理の仕組みについては、<a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noopener noreferrer">Googleのサービスを使用するサイトやアプリから収集された情報のGoogleによる使用</a>をご確認ください。
          </p>

          <h2>3. 広告の配信について</h2>
          <p>
            当サービスでは、第三者配信事業者（Google AdSense等）による広告配信サービスを利用する場合があります。
          </p>
          <p>
            第三者配信事業者は、ユーザーの過去のアクセス情報等に基づいて適切な広告を表示するためにCookieを使用することがあります。
          </p>
          <p>
            ユーザーは、<a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Googleの広告設定</a>にてパーソナライズ広告を無効にできます。また、<a href="https://www.aboutads.info/" target="_blank" rel="noopener noreferrer">aboutads.info</a>にアクセスすることで、第三者配信事業者のCookieを無効化することも可能です。
          </p>

          <h2>4. 免責事項</h2>
          <p>
            当サービスに掲載されている情報やコンテンツについて、可能な限り正確性を保つよう努めておりますが、その完全性・正確性・有用性を保証するものではありません。当サービスの利用により生じた損害等について、当サービスは法令上認められる範囲で責任を負いません。
          </p>

          <h2>5. お問い合わせ窓口</h2>
          <p>
            プライバシーポリシーに関するご質問・ご相談は、公式Xアカウント（<a href="https://x.com/pic_kn__" target="_blank" rel="noopener noreferrer">@pic_kn__</a>）までお願いいたします。
          </p>
        </div>
      </main>
      <StaticFooter />
    </div>
  );
}
