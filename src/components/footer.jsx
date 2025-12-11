import React, { useState } from "react";
import "./footer.css";
import FooterModal from "./FooterModal";
import logo from '../img/logo/logo_letrasblancas_sinfondo.png';

function Footer() {
  const [openModal, setOpenModal] = useState(null);

  const modalContents = {
    "company-details": {
      title: "Company Details",
      content: (
        <>
          <h3>About Us</h3>
          <p>
            Headout is a leading platform for booking tickets to musicals, theater shows, and live entertainment experiences. We are committed to providing our customers with the best selection of shows and exceptional service.
          </p>
          <h3>Company Information</h3>
          <p>
            <strong>Company Name:</strong> Headout Entertainment Ltd.<br />
            <strong>Registered Address:</strong> 123 Theater Street, Entertainment District, City, Country<br />
            <strong>Registration Number:</strong> ENT-2024-001234<br />
            <strong>VAT Number:</strong> VAT-123456789
          </p>
          <h3>Contact Information</h3>
          <p>
            <strong>Email:</strong> info@headout.com<br />
            <strong>Phone:</strong> +1 (555) 123-4567<br />
            <strong>Customer Service:</strong> Available 24/7
          </p>
          <h3>Mission</h3>
          <p>
            Our mission is to make live entertainment accessible to everyone by providing a seamless booking experience and connecting audiences with unforgettable performances.
          </p>
        </>
      )
    },
    "privacy-policy": {
      title: "Privacy Policy",
      content: (
        <>
          <h3>Introduction</h3>
          <p>
            At Headout, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>
          <h3>Information We Collect</h3>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Name, email address, and phone number</li>
            <li>Payment information (processed securely through third-party providers)</li>
            <li>Booking history and preferences</li>
            <li>Account credentials</li>
          </ul>
          <h3>How We Use Your Information</h3>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and manage your bookings</li>
            <li>Send you booking confirmations and updates</li>
            <li>Improve our services and user experience</li>
            <li>Send promotional communications (with your consent)</li>
            <li>Comply with legal obligations</li>
          </ul>
          <h3>Data Security</h3>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <h3>Your Rights</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
          </ul>
          <h3>Cookies</h3>
          <p>
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie preferences through your browser settings.
          </p>
          <h3>Contact Us</h3>
          <p>
            If you have questions about this Privacy Policy, please contact us at privacy@headout.com
          </p>
          <p><em>Last updated: January 2024</em></p>
        </>
      )
    },
    "terms-of-usage": {
      title: "Terms of Usage",
      content: (
        <>
          <h3>Acceptance of Terms</h3>
          <p>
            By accessing and using the Headout website and services, you accept and agree to be bound by these Terms of Usage. If you do not agree to these terms, please do not use our services.
          </p>
          <h3>Use of Service</h3>
          <p>You agree to use our service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul>
            <li>Use the service in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the service</li>
            <li>Use automated systems to access the service without permission</li>
            <li>Resell tickets purchased through our platform without authorization</li>
          </ul>
          <h3>Booking and Payment</h3>
          <p>
            All bookings are subject to availability. Prices are displayed in the currency specified and are subject to change without notice until payment is confirmed. Payment must be made at the time of booking.
          </p>
          <h3>Ticket Validity</h3>
          <p>
            Tickets are valid only for the date, time, and event specified. Tickets are non-transferable unless otherwise stated. Lost or stolen tickets may not be replaced.
          </p>
          <h3>Intellectual Property</h3>
          <p>
            All content on this website, including text, graphics, logos, and software, is the property of Headout or its content suppliers and is protected by copyright and trademark laws.
          </p>
          <h3>Limitation of Liability</h3>
          <p>
            Headout shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services, including but not limited to event cancellations or changes.
          </p>
          <h3>Modifications</h3>
          <p>
            We reserve the right to modify these Terms at any time. Continued use of our services after changes constitutes acceptance of the modified Terms.
          </p>
          <h3>Governing Law</h3>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Headout operates.
          </p>
          <p><em>Last updated: January 2024</em></p>
        </>
      )
    },
    "cancellation-policy": {
      title: "Cancellation Policy",
      content: (
        <>
          <h3>General Cancellation Policy</h3>
          <p>
            Our cancellation policy is designed to be fair to both customers and event organizers. Please review the specific cancellation terms for your booking, as policies may vary by event.
          </p>
          <h3>Customer Cancellations</h3>
          <p><strong>Standard Cancellation Terms:</strong></p>
          <ul>
            <li><strong>More than 48 hours before the event:</strong> Full refund minus a 10% processing fee</li>
            <li><strong>24-48 hours before the event:</strong> 50% refund</li>
            <li><strong>Less than 24 hours before the event:</strong> No refund available</li>
          </ul>
          <h3>Event Cancellations</h3>
          <p>
            If an event is cancelled by the organizer, you will receive a full refund to your original payment method within 5-10 business days. We will notify you via email if an event is cancelled.
          </p>
          <h3>Event Postponements</h3>
          <p>
            If an event is postponed, your tickets will remain valid for the new date. If you cannot attend the new date, you may request a refund within 7 days of the postponement announcement.
          </p>
          <h3>Refund Processing</h3>
          <p>
            Refunds will be processed to the original payment method used for the booking. Processing times may vary:
          </p>
          <ul>
            <li>Credit/Debit cards: 5-10 business days</li>
            <li>PayPal: 3-5 business days</li>
            <li>Bank transfers: 7-14 business days</li>
          </ul>
          <h3>Special Events</h3>
          <p>
            Some events may have special cancellation policies that differ from our standard terms. These will be clearly stated at the time of booking.
          </p>
          <h3>How to Cancel</h3>
          <p>
            To cancel your booking, please contact our customer service team:
          </p>
          <ul>
            <li>Email: support@headout.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Live Chat: Available 24/7 on our website</li>
          </ul>
          <p>
            Please have your booking reference number ready when contacting us.
          </p>
          <h3>Force Majeure</h3>
          <p>
            In cases of force majeure (natural disasters, pandemics, government restrictions, etc.), refund policies may be adjusted. We will communicate any changes clearly to affected customers.
          </p>
          <p><em>Last updated: January 2024</em></p>
        </>
      )
    }
  };

  return (
    <>
      <footer className="footer-container">
        <img
          className="footer-logo"
          src={logo}
          alt="Logo"
        />

        <div className="footer-section">
          <h3>GET HELP 24/7</h3>
          <p>Chat with us<br />Call us<br />Email us</p>
        </div>

        <div className="footer-section">
          <h3>HEADOUT</h3>
          <p>
            <button 
              className="footer-link" 
              onClick={() => setOpenModal("company-details")}
            >
              Company details
            </button>
            <br />
            <button 
              className="footer-link" 
              onClick={() => setOpenModal("privacy-policy")}
            >
              Privacy Policy
            </button>
            <br />
            <button 
              className="footer-link" 
              onClick={() => setOpenModal("terms-of-usage")}
            >
              Terms of usage
            </button>
            <br />
            <button 
              className="footer-link" 
              onClick={() => setOpenModal("cancellation-policy")}
            >
              Cancellation policy
            </button>
          </p>
        </div>

        <div className="footer-section">
          <h3>COLLABORATORS</h3>
        </div>
      </footer>

      {openModal && modalContents[openModal] && (
        <FooterModal
          open={!!openModal}
          title={modalContents[openModal].title}
          content={modalContents[openModal].content}
          onClose={() => setOpenModal(null)}
        />
      )}
    </>
  );
}

export default Footer;
