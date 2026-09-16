"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Info, X } from "lucide-react";

export default function InfoMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState(null); // { x, y } when dragged
  const [isDragging, setIsDragging] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, btnX: 0, btnY: 0, moved: false });

  // ドラッグ開始（マウス / タッチ）
  const handleStart = (clientX, clientY) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      btnX: rect.left,
      btnY: rect.top,
      moved: false
    };
    setIsDragging(true);
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    handleStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    if (touch) handleStart(touch.clientX, touch.clientY);
  };

  // ドラッグ中処理
  useEffect(() => {
    const handleMove = (clientX, clientY) => {
      if (!isDragging) return;
      const dx = clientX - dragStartRef.current.mouseX;
      const dy = clientY - dragStartRef.current.mouseY;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        dragStartRef.current.moved = true;
      }

      let newX = dragStartRef.current.btnX + dx;
      let newY = dragStartRef.current.btnY + dy;

      const padding = 8;
      const btnW = buttonRef.current ? buttonRef.current.offsetWidth : 80;
      const btnH = buttonRef.current ? buttonRef.current.offsetHeight : 36;

      newX = Math.max(padding, Math.min(window.innerWidth - btnW - padding, newX));
      newY = Math.max(padding, Math.min(window.innerHeight - btnH - padding, newY));

      setPos({ x: newX, y: newY });
    };

    const handleMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleEnd = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("mouseup", handleEnd);
      window.addEventListener("touchend", handleEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging]);

  // クリック（移動しなかった場合のみメニュー開閉）
  const handleClick = (e) => {
    if (dragStartRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setIsOpen((prev) => !prev);
  };

  // メニュー外クリック＆Escキーで閉じる
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

  // 初期配置：左下 (bottom: 24px, left: 24px)
  const wrapperStyle = pos
    ? { position: "fixed", left: `${pos.x}px`, top: `${pos.y}px`, bottom: "auto", right: "auto" }
    : { position: "fixed", bottom: "24px", left: "24px", right: "auto", top: "auto" };

  // ポップオーバーの表示位置（画面上半分のときは下側、下半分のときは上側に表示）
  const isUpperHalf = pos ? pos.y < window.innerHeight / 2 : false;
  const popoverStyle = isUpperHalf
    ? { top: "44px", bottom: "auto", left: 0 }
    : { bottom: "44px", top: "auto", left: 0 };

  return (
    <div className="info-menu-wrapper" style={wrapperStyle} ref={menuRef}>
      {/* ドラッグ可能な半透明Infoボタン */}
      <button
        ref={buttonRef}
        type="button"
        className={`info-menu-button ${isOpen ? "active" : ""} ${isDragging ? "dragging" : ""}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
        aria-label="サイト情報メニュー (ドラッグで移動可能)"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={15} /> : <Info size={15} />}
        <span>Info</span>
      </button>

      {/* ポップオーバーメニュー */}
      {isOpen && (
        <div className="info-menu-popover" style={popoverStyle} role="dialog" aria-label="インフォメーション">
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
          {/* © 著作権者名 発行年 */}
          <div className="info-menu-footer-copyright">
            © TrackPic 2026
          </div>
        </div>
      )}
    </div>
  );
}
