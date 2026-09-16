import Link from "next/link";

export default function FooterNav() {
  return (
    <footer className="site-footer">
      <div className="footer-links">
        <Link href="/about">TrackPicについて</Link>
        <Link href="/guide">使い方</Link>
        <Link href="/privacy">プライバシーポリシー</Link>
        <Link href="/terms">利用規約</Link>
        <Link href="/contact">お問い合わせ</Link>
      </div>
      <p className="copyright">© TrackPic</p>
    </footer>
  );
}
