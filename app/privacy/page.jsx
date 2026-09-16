import StaticHeader from "../../components/StaticHeader";
import FooterNav from "../../components/FooterNav";

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

          <h2>1. 画像データの処理と安全保護（クライアントサイド完結）</h2>
          <p>
            当サービスにおいてユーザーが選択・選択解除・アップロードした画像ファイルおよび生成された壁紙画像は、<strong>すべてユーザーのお使いの端末・ブラウザ内（HTML5 Canvas技術）でのみローカルに処理・生成されます。</strong>
          </p>
          <p>
            画像データやカラー抽出データが当サービスのサーバーにアップロードされたり、外部の第三者サーバーへ送信・保存されることは一切ありません。どうぞ安心してご利用ください。
          </p>

          <h2>2. アクセス解析ツールについて</h2>
          <p>
            当サービスでは、サービスの利用状況の把握および利便性向上のため、Googleによるアクセス解析ツール「Google アナリティクス (GA4)」を利用しています。
          </p>
          <p>
            Google アナリティクスはデータの収集のために Cookie（クッキー）を使用しています。このデータは匿名で収集されており、個人を特定する情報は含まれておりません。
          </p>
          <p>
            Cookieの収集は、お使いのブラウザの設定により無効化することが可能です。詳細は<a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noopener noreferrer">Googleポリシーと規約ページ</a>をご確認ください。
          </p>

          <h2>3. 広告配信について</h2>
          <p>
            当サービスでは、第三者配信の広告サービス（Google AdSense等）を利用する場合があります。
          </p>
          <p>
            広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サービスや他サイトへのアクセスに関する情報 Cookie（氏名、住所、メール アドレス、電話番号は含まれません）を使用することがあります。
          </p>

          <h2>4. 免責事項</h2>
          <p>
            当サービスからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
          </p>
          <p>
            当サービスのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が混入する場合や、情報が古くなっている場合があります。当サービスに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
          </p>

          <h2>5. プライバシーポリシーの変更</h2>
          <p>
            当サービスは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。
          </p>

          <h2>6. お問い合わせ先</h2>
          <p>
            本プライバシーポリシーに関するご質問やお問い合わせは、公式X（旧Twitter）アカウント（<a href="https://x.com/pic_kn__" target="_blank" rel="noopener noreferrer">@pic_kn__</a>）までご連絡ください。
          </p>
        </div>
      </main>
      <FooterNav />
    </div>
  );
}
