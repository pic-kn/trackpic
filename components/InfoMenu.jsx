"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Info, X } from "lucide-react";

export default function InfoMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // メニュー外クリックで閉じる
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="info-menu-wrapper" ref={menuRef}>
      {/* トリガーボタン */}
      <button
        type="button"
        className={`info-menu-button ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="サイト情報メニュー"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={15} /> : <Info size={15} />}
        <span>Info</span>
      </button>

      {/* ポップオーバーメニュー */}
      {isOpen && (
        <div className="info-menu-popover" role="dialog" aria-label="インフォメーション">
          <div className="info-menu-header">
            <span>TRACKPIC INFO</span>
          </div>
          <nav className="info-menu-links">
            <Link href="/about" onClick={() => setIsOpen(false)}>
              TrackPicについて
            </Link>
            <Link href="/guide" onClick={() => setIsOpen(false)}>
              使い方ガイド
            </Link>
            <Link href="/privacy" onClick={() => setIsOpen(false)}>
              プライバシーポリシー
            </Link>
            <Link href="/terms" onClick={() => setIsOpen(false)}>
              利用規約
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              お問い合わせ
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
