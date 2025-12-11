import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ offset = 0, behavior = "auto" }) {
  const { pathname } = useLocation();
  useEffect(() => {
    // scroll to top (con posibilidad de compensar header fijo)
    window.scrollTo({ top: Math.max(0, 0 + offset), left: 0, behavior });
  }, [pathname, offset, behavior]);

  return null;
}