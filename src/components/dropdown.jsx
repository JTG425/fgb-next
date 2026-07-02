"use client";

import "@/styles/componentstyles/dropdown.css";
import Logo from "./logo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { FiHome } from "react-icons/fi";
import {
  FaTicketSimple,
  FaMapLocation,
  FaRegCircleQuestion,
} from "react-icons/fa6";
import { RiMovie2Line } from "react-icons/ri";

const dropdownVariants = {
  hidden: { height: "72px" },
  visible: { height: "440px" },
};

const buttons = [
  { route: "/", label: "Home", Icon: FiHome },
  { route: "/tickets", label: "Buy Tickets", Icon: FaTicketSimple },
  { route: "/locations", label: "Our Locations", Icon: FaMapLocation },
  { route: "/rentals", label: "Rentals", Icon: RiMovie2Line },
  { route: "/about", label: "About Us", Icon: FaRegCircleQuestion },
];

function DropDown() {
  const [isContainerOpen, setIsContainerOpen] = useState(false);
  const [areChildrenVisible, setAreChildrenVisible] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = () => {
    if (!isContainerOpen) {
      setIsContainerOpen(true);
      setTimeout(() => {
        setAreChildrenVisible(true);
      }, 200);
    } else {
      setAreChildrenVisible(false);
    }
  };

  return (
    <motion.div
      className="dropdown-top-bar"
      initial="hidden"
      animate={isContainerOpen ? "visible" : "hidden"}
      variants={dropdownVariants}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="dropdown-header">
        <Link href="/" aria-label="FGB Theaters home">
          <Logo />
        </Link>
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="show-dropdown-button"
          onClick={toggleDropdown}
          aria-label="Toggle navigation menu"
          aria-expanded={isContainerOpen}
        >
          {isContainerOpen ? <RxCross1 /> : <RxHamburgerMenu />}
        </motion.button>
      </span>
      <div className="dropdown-content">
        <AnimatePresence
          mode="popLayout"
          onExitComplete={() => setIsContainerOpen(false)}
        >
          {areChildrenVisible &&
            buttons.map(({ route, label, Icon }, index) => (
              <motion.span
                key={route}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: 14,
                  transition: {
                    duration: 0.18,
                    delay: (buttons.length - 1 - index) * 0.05,
                  },
                }}
                transition={{ duration: 0.25, delay: index * 0.06 }}
              >
                <Link href={route}>
                  <button
                    className={`dropdown-button${
                      pathname === route ? " active" : ""
                    }`}
                    onClick={toggleDropdown}
                  >
                    <p>{label}</p>
                    <Icon className="icon" />
                  </button>
                </Link>
              </motion.span>
            ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default DropDown;
