import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container container">
        {/* IZQUIERDA: Logo */}
        <div className="footer-left">
          <Link to="/" className="footer-logo-link">
            <img src="/images/logo.png" alt="Kozzy logo" className="footer-logo" />
          </Link>
        </div>

        {/* CENTRO: Admin */}
        <div className="footer-center">
          <Link to="/admin" className="footer-admin">
            Admin
          </Link>
        </div>

        {/* DERECHA: Redes */}
        <div className="footer-right">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <i className="fa-brands fa-x-twitter"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
