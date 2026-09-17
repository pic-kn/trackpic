import StaticHeader from "../../components/StaticHeader";
import StaticFooter from "../../components/StaticFooter";
import FAQAccordion from "./FAQAccordion";

export const metadata = {
  title: "よくある質問 (FAQ) - TrackPic",
  description: "TrackPic（トラックピック）の使い方、画像・色の設定、保存、対応端末、プライバシー、著作権、トラブルに関するよくある質問をまとめています。",
};

export default function FAQPage() {
  return (
    <div className="static-page-wrapper">
      <StaticHeader />
      <main className="static-page-card">
        <h1 className="static-page-title">よくある質問 (FAQ)</h1>
        <FAQAccordion />
      </main>
      <StaticFooter />
    </div>
  );
}
