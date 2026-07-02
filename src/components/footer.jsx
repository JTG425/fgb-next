"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { useSite } from "@/context/SiteProvider";

const SOCIALS = [
  {
    label: "FGB Theaters on Facebook",
    href: "https://www.facebook.com/profile.php?id=61556431721748",
    Icon: FaFacebookF,
  },
  {
    label: "FGB Theaters on Instagram",
    href: "https://www.instagram.com/fgbtheaters/",
    Icon: FaInstagram,
  },
];

export default function Footer() {
  const { loading } = useSite();

  return (
    <AnimatePresence mode="sync">
      {!loading && (
        <motion.footer
          className="footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p className="footer-brand">FGB Theaters</p>
          <p className="footer-tagline">
            Family owned &amp; operated in the heart of Vermont since 1980.
          </p>
          <span className="footer-socials">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={href}
                className="footer-social-link"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </span>
          <p className="footer-copyright">
            © {new Date().getFullYear()} FGB Theaters
          </p>
        </motion.footer>
      )}
    </AnimatePresence>
  );
}
