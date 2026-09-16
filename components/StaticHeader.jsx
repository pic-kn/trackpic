import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function StaticHeader() {
  return (
    <header className="static-page-header">
      <Link href="/" className="static-page-brand">
        TRACKPIC
      </Link>
      <Link href="/" className="static-page-back">
        <ArrowLeft size={14} />
        <span>トップページへ戻る</span>
      </Link>
    </header>
  );
}
