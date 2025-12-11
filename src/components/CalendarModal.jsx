import React, { useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarModal.css";

export default function CalendarModal({ open, selectedDate, onChange, onClose, onConfirm }) {
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
      className="calendar-backdrop"
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
    >
      <div className="calendar-content" onClick={(e) => e.stopPropagation()}>
        <div className="calendar-wrap">
          <Calendar
            onChange={onChange}
            value={selectedDate}
            selectRange={false}
            //showDoubleView
            showNeighboringMonth={false}
            className="custom-react-calendar"
          />
        </div>

        <div className="calendar-actions">
          <button className="calendar-btn ghost" onClick={onClose}>Cancel</button>
          <button
            className="calendar-btn primary"
            onClick={() => onConfirm(selectedDate)}
            disabled={!selectedDate}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}