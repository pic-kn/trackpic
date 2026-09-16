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
            TrackPic（トラックピック）をご利用いただきありがとうございます。
          </p>
          <p>
            当サービスに関するご質問、不具合（バグ）の報告、新機能のご要望、その他取材・メディア掲載に関するお問い合わせは、公式 X（旧Twitter）アカウントにて受け付けております。
          </p>

          <h2>お問い合わせ窓口</h2>
          <p>
            公式 X アカウント：
            <a href="https://x.com/pic_kn__" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700 }}>
              @pic_kn__ (https://x.com/pic_kn__)
            </a>
          </p>
          <p>
            上記アカウント宛に、ダイレクトメッセージ（DM）またはリプライにてお問い合わせ内容をお送りください。
          </p>

          <h2>ご注意事項</h2>
          <ul>
            <li>お問い合わせ内容により、ご返信までにお時間をいただく場合や、すべてのご意見に個別の返信を行えない場合がございます。あらかじめご了承ください。</li>
            <li>スパム・不適切な内容メッセージにつきましては返信を差し控えさせていただくことがございます。</li>
          </ul>
        </div>
      </main>
      <FooterNav />
    </div>
  );
}
