"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQItem({ id, question, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const answerId = `faq-answer-${id}`;

  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <button
        type="button"
        className="faq-question-button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <span className="faq-question-text">{question}</span>
        <ChevronDown className={`faq-chevron ${isOpen ? "open" : ""}`} size={18} />
      </button>
      <div
        id={answerId}
        className={`faq-answer-container ${isOpen ? "open" : ""}`}
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className="faq-answer-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function FAQAccordion() {
  return (
    <div className="faq-accordion">
      <h2>■ 基本</h2>

      <FAQItem id="q1" question="Q1. TrackPicは無料ですか？">
        <p>A. 現在、TrackPicは無料でご利用いただけます。アカウント登録も必要ありません。</p>
      </FAQItem>

      <FAQItem id="q2" question="Q2. アカウント登録は必要ですか？">
        <p>A. いいえ、アカウント登録やログイン、アプリのインストールは不要です。ブラウザを開いてすぐにお使いいただけます。</p>
      </FAQItem>

      <FAQItem id="q3" question="Q3. スマホでも使えますか？">
        <p>A. iPhone・Androidの主要なブラウザで利用できます。ただし、端末やブラウザの環境によって一部機能が正常に動作しない場合があります。うまく動作しない場合は、SafariまたはGoogle Chromeの最新版でお試しください。</p>
      </FAQItem>

      <FAQItem id="q4" question="Q4. iPadでも使えますか？">
        <p>A. iPadでブラウザからTrackPicを開いて利用することはできますが、現在はスマートフォン向けの壁紙サイズを中心に提供しており、iPad専用の壁紙サイズには対応していません。</p>
      </FAQItem>

      <h2>■ 画像について</h2>

      <FAQItem id="q5" question="Q5. 写真を選択しても画像が読み込まれません">
        <p>A. 一般的な画像ファイルをご利用ください。形式や端末によっては正常に読み込めない場合があります。</p>
      </FAQItem>

      <FAQItem id="q6" question="Q6. Androidで画像を選択できません">
        <p>A. 以下の手順をお試しください。</p>
        <ol>
          <li>X（旧Twitter）、LINE、Instagramなどのアプリ内ブラウザを使用している場合は、Google Chrome等の外部ブラウザで開く</li>
          <li>Google Chromeを最新版に更新する</li>
          <li>ページを再読み込み（リロード）する</li>
          <li>それでも改善しない場合は、公式Xアカウント（<a href="https://x.com/pic_kn__" target="_blank" rel="noopener noreferrer">@pic_kn__</a>）までご連絡ください</li>
        </ol>
      </FAQItem>

      <FAQItem id="q7" question="Q7. 画像の位置や大きさを変更できますか？">
        <p>A. 現在は対応していません。選択した写真の中央部分が正方形（1:1）で自動トリミング配置される仕様となっております。今後の改善候補として検討しています。</p>
      </FAQItem>

      <FAQItem id="q8" question="Q8. 画像を上下左右に移動できますか？">
        <p>A. 現在は対応していません。今後の改善候補として検討しています。</p>
      </FAQItem>

      <FAQItem id="q9" question="Q9. iPhoneの壁紙にすると時計と画像が重なります">
        <p>A. 現在のTrackPicでは画像位置を細かく調整できないため、写真によってはiPhoneの時計表示と重なる場合があります。今後の改善候補として検討しています。</p>
      </FAQItem>

      <FAQItem id="q10" question="Q10. 黒い画像などで背景との境界が分かりづらい場合はどうすればいいですか？">
        <p>A. 設定パネルの「COLOR / パレット &amp; 背景」から、写真とコントラストのある背景色（パレット内の明るい色や、カラーピッカーで指定した色）に変更してみてください。</p>
      </FAQItem>

      <h2>■ 色について</h2>

      <FAQItem id="q11" question="Q11. 背景色はどうやって変更できますか？">
        <p>A. 写真を読み込んだ際に自動抽出される5色のパレットからタップして選択するか、カラーピッカー（色選択）を使ってお好みの色を自由に変更できます。</p>
      </FAQItem>

      <FAQItem id="q12" question="Q12. 青系以外の背景色にもできますか？">
        <p>A. はい。写真は選択時の初期サンプルが青系なだけで、読み込ませた写真に応じてさまざまなカラーパレットが自動生成されます。また、カラーピッカーで好きな色に変更可能です。</p>
      </FAQItem>

      <FAQItem id="q13" question="Q13. 写真から好きな色を選べますか？">
        <p>A. はい。「スポイト（色を選ぶ）」ボタンを押し、プレビュー写真上の好きな場所をタップ・クリックすることで、その場所の色を直接背景色に指定できます。</p>
      </FAQItem>

      <h2>■ デザインについて</h2>

      <FAQItem id="q14" question="Q14. 曲名・アーティスト名は変更できますか？">
        <p>A. はい。「INFO / 楽曲情報」の入力欄から、お好きな曲名やアーティスト名を自由に入力・編集できます。</p>
      </FAQItem>

      <FAQItem id="q15" question="Q15. 再生時間や再生バーは変更できますか？">
        <p>A. 現在は再生時間や再生バーのデザイン変更に対応していません。今後の改善候補として検討しています。</p>
      </FAQItem>

      <FAQItem id="q16" question="Q16. レイアウトを自由に変更できますか？">
        <p>A. 現在は音楽プレイヤー風の固定レイアウトとなっており、各要素を自由に移動する機能には対応していません。今後の改善候補として検討しています。</p>
      </FAQItem>

      <FAQItem id="q17" question="Q17. iPad用の壁紙サイズはありますか？">
        <p>A. 現在はスマートフォン向けの壁紙サイズを中心に提供しており、iPad専用の壁紙サイズには対応していません。今後の改善候補として検討しています。</p>
      </FAQItem>

      <h2>■ 保存・共有</h2>

      <FAQItem id="q18" question="Q18. 作った画像はどうやって保存しますか？">
        <p>A. PNG保存ボタンを押すと画像を保存できます。保存方法はお使いの端末やブラウザによって異なり、スマートフォンでは共有・保存メニューが表示される場合があります。</p>
      </FAQItem>

      <FAQItem id="q19" question="Q19. 作った画像をXやInstagramなどへ投稿できますか？">
        <p>A. 作成した画像はSNSへ投稿できます。ただし、使用した写真・イラスト等について、ご自身が投稿・利用する権利を有していることをご確認ください。TrackPicを利用することで第三者コンテンツの利用権が付与されるわけではありません。</p>
      </FAQItem>

      <h2>■ プライバシー</h2>

      <FAQItem id="q20" question="Q20. 選択した写真はTrackPicのサーバーへアップロードされますか？">
        <p>A. ユーザーが選択した画像ファイルそのものは、当サービスのサーバーへ送信・保存されず、お使いのブラウザ内で処理されます。なお、サービス改善のためGoogle Analytics 4を利用しており、Cookie等を用いてアクセス状況を計測しています。</p>
      </FAQItem>

      <h2>■ 著作権・画像利用</h2>

      <FAQItem id="q21" question="Q21. 他人の写真やイラストを使ってもいいですか？">
        <p>A. TrackPicを利用することで、第三者の写真・イラスト・ロゴ等の著作物を利用する権利が付与されるわけではありません。利用方法によっては著作権、肖像権等を侵害する可能性があります。自ら権利を有する画像、または適法に利用する権限のある画像をご使用ください。</p>
      </FAQItem>

      <FAQItem id="q22" question="Q22. PinterestやSNS等で見つけた画像を使ってもいいですか？">
        <p>A. インターネットやSNS上で見つけた画像であっても、利用方法によっては著作権、肖像権等を侵害する可能性があります。必ず自ら権利を所有している画像、または二次利用・利用許諾が明記されている画像をご使用ください。</p>
      </FAQItem>

      <h2>■ トラブル</h2>

      <FAQItem id="q23" question="Q23. TrackPicにアクセスできません">
        <p>A. 以下の順でお試しください。</p>
        <ol>
          <li>ページを再読み込み（リロード）する</li>
          <li>X（旧Twitter）やLINE等のアプリ内ブラウザでお使いの場合は、SafariまたはGoogle Chrome等の外部ブラウザで開く</li>
          <li>お使いのブラウザ（Safari / Chrome）を最新版に更新する</li>
          <li>それでも改善しない場合は、公式Xアカウント（<a href="https://x.com/pic_kn__" target="_blank" rel="noopener noreferrer">@pic_kn__</a>）までご連絡ください</li>
        </ol>
      </FAQItem>

      <FAQItem id="q24" question="Q24. 保存ボタンが動きません">
        <p>A. 以下の順でお試しください。</p>
        <ol>
          <li>ページを再読み込み（リロード）する</li>
          <li>X（旧Twitter）やLINE等のアプリ内ブラウザでお使いの場合は、SafariまたはGoogle Chrome等の外部ブラウザで開く</li>
          <li>お使いのブラウザ（Safari / Chrome）を最新版に更新する</li>
          <li>それでも改善しない場合は、公式Xアカウント（<a href="https://x.com/pic_kn__" target="_blank" rel="noopener noreferrer">@pic_kn__</a>）までご連絡ください</li>
        </ol>
      </FAQItem>
    </div>
  );
}
