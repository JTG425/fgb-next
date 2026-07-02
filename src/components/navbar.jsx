"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import "@/styles/componentstyles/navbar.css";
import DropDown from "./dropdown";
import Logo from "./logo";

export const NAV_PAGES = [
  { name: "Home", path: "/" },
  { name: "Tickets", path: "/tickets" },
  { name: "Locations", path: "/locations" },
  { name: "Rentals", path: "/rentals" },
  { name: "About", path: "/about" },
];

// Deriving the active page from the URL (instead of component state)
// keeps the highlight correct on back/forward navigation and deep links.
export const usePageName = () => {
  const pathname = usePathname();
  const match = NAV_PAGES.find(
    (page) => page.path !== "/" && pathname.startsWith(page.path)
  );
  return match ? match.name : "Home";
};

function NavBar() {
  const currentPage = usePageName();

  return (
    <>
      <DropDown />
      <motion.nav
        className="nav-container"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="nav-content-container">
          <Link href="/" aria-label="FGB Theaters home">
            <Logo />
          </Link>
          <div className="nav-buttons-container">
            {NAV_PAGES.map(({ name, path }) => (
              <Link
                href={path}
                key={name}
                className={`nav-link${currentPage === name ? " active" : ""}`}
                aria-current={currentPage === name ? "page" : undefined}
              >
                {/* The shared layoutId makes the red pill glide between
                    links instead of blinking on navigation. */}
                {currentPage === name && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="nav-active-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="nav-link-label">{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </motion.nav>
    </>
  );
}

export default NavBar;
