import React, { useEffect, useRef } from "react";
import "./FooterModal.css";

export default function FooterModal({ open, title, content, onClose }) {
  const backdropRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="footer-modal-backdrop"
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="footer-modal-title"
    >
      <div className="footer-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="footer-modal-header">
          <h2 id="footer-modal-title" className="footer-modal-title">{title}</h2>
          <button className="footer-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="footer-modal-body">
          {content}
        </div>
        <div className="footer-modal-footer">
          <button className="footer-modal-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

