"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Info, X } from "lucide-react";

export default function InfoMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const firstLinkRef = useRef(null);
  const wasOpenRef = useRef(false);

  // ポップオーバーのフォーカス管理（開いた時は最初のリンク、閉じた時はInfoボタン）
  useEffect(() => {
    if (isOpen) {
      if (firstLinkRef.current) {
        firstLinkRef.current.focus();
      }
      wasOpenRef.current = true;
    } else if (wasOpenRef.current) {
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
      wasOpenRef.current = false;
    }
  }, [isOpen]);

  // メニュー外クリック（pointerdown）＆Escキーで閉じる
  useEffect(() => {
    function handlePointerDown(event) {
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
      document.addEventListener("pointerdown", handlePointerDown);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="info-menu-wrapper" ref={menuRef}>
      {/* 固定位置の半透明Infoボタン */}
      <button
        ref={buttonRef}
        type="button"
        className={`info-menu-button ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="サイト情報メニュー"
        aria-haspopup="true"
        aria-controls="trackpic-info-menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={15} /> : <Info size={15} />}
        <span className="info-menu-text">Info</span>
      </button>

      {/* ポップオーバーメニュー（<nav> 要素として配置） */}
      {isOpen && (
        <nav
          className="info-menu-popover"
          id="trackpic-info-menu"
          aria-label="サイト情報"
        >
          <div className="info-menu-header">
            <span>TRACKPIC INFO</span>
          </div>
          <div className="info-menu-links">
            <Link
              ref={firstLinkRef}
              href="/about/"
              onClick={() => setIsOpen(false)}
            >
              TrackPicについて
            </Link>
            <Link href="/guide/" onClick={() => setIsOpen(false)}>
              使い方ガイド
            </Link>
            <Link href="/faq/" onClick={() => setIsOpen(false)}>
              よくある質問
            </Link>
            <Link href="/privacy/" onClick={() => setIsOpen(false)}>
              プライバシーポリシー
            </Link>
            <Link href="/terms/" onClick={() => setIsOpen(false)}>
              利用規約
            </Link>
            <Link href="/contact/" onClick={() => setIsOpen(false)}>
              お問い合わせ
            </Link>
          </div>
          {/* モバイル表示時のみ表示される © 著作権者名 発行年 */}
          <div className="info-menu-footer-copyright">
            © TrackPic 2026
          </div>
        </nav>
      )}
    </div>
  );
}

