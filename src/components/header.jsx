import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./header.css";
import logo from "../img/logo/logo_sinletras_sinfonfo.png";
import CartDropdown from "./CartDropdown";
import { Profile } from "./profile";

function Header() {
  const location = useLocation();
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  // Detectar scroll para hacer el header más estrecho y ocultar el logo
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lógica de botones de autenticación
  const authButtons = !isAuthenticated ? (
    <button className="btn neutral" onClick={() => loginWithRedirect()}>Sign in</button>
  ) : (
    <div className="profile-container" ref={profileRef}>
      <button className="btn primary" onClick={() => setShowProfile(!showProfile)}>
        Profile
      </button>
      <button className="btn primary" onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
      {showProfile && (
        <div className="profile-dropdown" onClick={(e) => e.stopPropagation()}>
          <Profile />
        </div>
      )}
    </div>
  );

  return (
    <header className={`header-container ${isScrolled ? "scrolled" : ""}`}>
      <img
        className="logo"
        src={logo}
        alt="Logo"
      />

      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <nav className={`nav-menu ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <Link
          to="/"
          className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </Link>

        <Link
          to="/program"
          className={`nav-item ${location.pathname === "/program" ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Programming
        </Link>


        <Link
          to="/history"
          className={`nav-item ${location.pathname === "/history" ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          History
        </Link>

        <Link
          to="/shop"
          className={`nav-item ${location.pathname === "/shop" ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Shop
        </Link>
      </nav>

      <div className="auth-buttons">
        {authButtons}

      <div className="carrito">
        <svg
          width="32"
          height="32"
          viewBox="0 0 902.86 902.86"
          fill="currentColor"
          className="cart-icon-svg"
        >
          <g>
            <g>
              <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
                  M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"/>
              <path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
                c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
                c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
                C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
                c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
                M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
                S619.162,694.432,619.162,716.897z"/>
            </g>
          </g>
        </svg>
        <CartDropdown />
      </div>
    </div>

    </header>
  );
}

export default Header;
