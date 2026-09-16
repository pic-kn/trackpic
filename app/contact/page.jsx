import StaticHeader from "../../components/StaticHeader";
import FooterNav from "../../components/FooterNav";

export const metadata = {
  title: "お問い合わせ - TrackPic",
  description: "TrackPicに関するご質問、バグ報告、ご要望、取材等のお問い合わせ窓口です。",
};

export default function ContactPage() {
  return (
    <div className="static-page-wrapper">
      <StaticHeader />
      <main className="static-page-card">
        <h1 className="static-page-title">お問い合わせ</h1>
        <div className="static-page-body">
          <p>
            TrackPicをご利用いただきありがとうございます。
          </p>
          <p>
            当サービスに関するご質問、バグ報告、機能のご要望、権利関係に関するご連絡、取材や掲載に関するお問い合わせは、公式 X（旧Twitter）アカウントにてお受けしております。
          </p>

          <h2>お問い合わせ窓口</h2>
          <p>
            公式 X アカウント：
            <a href="https://x.com/pic_kn__" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700 }}>
              @pic_kn__ (https://x.com/pic_kn__)
            </a>
          </p>
          <p>
            ダイレクトメッセージ（DM）またはリプライにてお問い合わせ内容をお送りください。
            <strong>DMが利用できない場合は、リプライ等でご連絡ください。</strong>
          </p>

          <h2>主な対応内容</h2>
          <ul>
            <li>不具合（バグ）の報告</li>
            <li>サービスへのご意見・機能のご要望</li>
            <li>権利関係や著作権に関するご相談</li>
            <li>取材・メディア掲載に関するお問い合わせ</li>
            <li>その他TrackPicに関するお問い合わせ</li>
          </ul>

          <h2>ご注意事項</h2>
          <ul>
            <li>お問い合わせ内容により、ご返信までにお時間をいただく場合や、内容によっては個別の返信を行えない場合がございます。あらかじめご了承ください。</li>
            <li>スパム・不適切な内容のメッセージにつきましては返信を差し控えさせていただくことがございます。</li>
          </ul>
        </div>
      </main>
      <FooterNav />
    </div>
  );
}
