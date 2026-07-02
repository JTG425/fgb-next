"use client";

import "@/styles/componentstyles/slideshow.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundTransition from "./BackgroundTransition";

// Wrap an index into [min, max)
const wrap = (min, max, value) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

const AUTOPLAY_MS = 5000;
// Fallback unlock in case an animation gets interrupted and
// onAnimationComplete never fires — the show can never wedge shut.
const ANIMATION_SAFETY_MS = 800;

const slideContentVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "25%" : "-25%",
    opacity: 0,
    scale: 0.85,
  }),
  center: { x: "0%", opacity: 1, scale: 1 },
  exit: (direction) => ({
    x: direction > 0 ? "-25%" : "25%",
    opacity: 0,
    scale: 0.85,
  }),
};

// Spring drives x only; opacity/scale run on tweens. The old config ran a
// single duration-based spring across all three, and the spring overshoot
// on scale/opacity read as flicker/wobble at the end of every swap.
const slideTransition = {
  x: { type: "spring", stiffness: 300, damping: 32, mass: 0.9 },
  opacity: { duration: 0.35, ease: "easeInOut" },
  scale: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
};

export default function Slideshow({ slideshowData }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // The lock is mirrored in a ref so timers never read stale state.
  const lockRef = useRef(false);
  const unlockTimer = useRef(null);

  const slideCount = slideshowData?.length || 0;
  // If slideshowData ever shrinks underneath us, never index out of bounds.
  const safeIndex = slideCount > 0 ? wrap(0, slideCount, currentSlide) : 0;
  const slide = slideshowData?.[safeIndex];

  // Preload slide images (backgrounds excluded, as before)
  useEffect(() => {
    if (!slideshowData?.length) return;
    let cancelled = false;
    setImagesLoaded(false);

    const preload = (url) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // one broken image shouldn't block the show
        img.src = url;
      });

    const urls = slideshowData
      .map((s) => s.Image)
      .filter((url) => url && url.trim() !== "");

    Promise.all(urls.map(preload)).then(() => {
      if (!cancelled) setImagesLoaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, [slideshowData]);

  const releaseLock = useCallback(() => {
    clearTimeout(unlockTimer.current);
    lockRef.current = false;
    setIsAnimating(false);
  }, []);

  const move = useCallback(
    (dir) => {
      if (lockRef.current || !imagesLoaded || slideCount <= 1) return;
      lockRef.current = true;
      setIsAnimating(true);
      setDirection(dir);
      setCurrentSlide((curr) => wrap(0, slideCount, curr + dir));
      clearTimeout(unlockTimer.current);
      unlockTimer.current = setTimeout(releaseLock, ANIMATION_SAFETY_MS);
    },
    [imagesLoaded, slideCount, releaseLock]
  );

  // Autoplay: a fresh 5s timeout after *every* slide change (auto or manual),
  // paused while a mouse is hovering. The old interval was torn down and
  // rebuilt on every isAnimating flip, which drifted the pacing and risked
  // a stale-closure deadlock that silently killed autoplay.
  useEffect(() => {
    if (!imagesLoaded || slideCount <= 1 || isHovering) return;
    const t = setTimeout(() => move(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [safeIndex, imagesLoaded, slideCount, isHovering, move]);

  // Clear the safety timer on unmount
  useEffect(() => () => clearTimeout(unlockTimer.current), []);

  if (!slide) return null;

  const hasImage = Boolean(slide.Image && slide.Image.trim() !== "");

  return (
    <div
      className="slideshow"
      // pointerType check: a touch tap no longer sticks the slideshow in a
      // permanent paused state the way :hover matching did on mobile.
      onPointerEnter={(e) => e.pointerType === "mouse" && setIsHovering(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setIsHovering(false)}
    >
      <AnimatePresence initial={false} mode="popLayout">
        <BackgroundTransition
          key={`bg-${safeIndex}`}
          slide={slide}
          transitionKey={safeIndex}
        />
      </AnimatePresence>

      {/* Slides are absolutely stacked, so the default (sync) mode is the
          right fit here — popLayout's position snapshotting could cause a
          one-frame jump on each swap. */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`slide-${safeIndex}`}
          className="slide-layer"
          custom={direction}
          variants={slideContentVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTransition}
          onAnimationComplete={(definition) => {
            // This also fires on the exiting copy (with "exit") — only
            // unlock once the incoming slide has actually settled.
            if (definition === "center") releaseLock();
          }}
        >
          <div className="slide-content">
            {hasImage && (
              <span className="slide-left">
                <img
                  className="slide-image"
                  src={slide.Image}
                  alt={slide.Title || ""}
                  draggable={false}
                  decoding="async"
                />
              </span>
            )}
            <span className="slide-right">
              <h2>{slide.Title}</h2>
              <p>{slide.Description}</p>
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Moved outside AnimatePresence: the buttons previously lived inside
          the animating slide, so the click targets slid, scaled, and faded
          along with the content on every transition. */}
      <div className="slideshow-controls">
        <button
          type="button"
          disabled={isAnimating || !imagesLoaded}
          onClick={() => move(-1)}
          aria-label="Previous slide"
        />
        <button
          type="button"
          disabled={isAnimating || !imagesLoaded}
          onClick={() => move(1)}
          aria-label="Next slide"
        />
      </div>
    </div>
  );
}