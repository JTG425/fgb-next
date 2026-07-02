"use client";

import "@/styles/componentstyles/upcoming.css";

const handleUpcomingDate = (date) => {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  return `${month} / ${day} / ${year}`;
};

const handleUpcomingDateFormatting = (date) => {
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);
  return new Date(year, month - 1, day);
};

function UpcomingShowCard({ show, onSelect, ariaHidden }) {
  return (
    <button
      className="upcoming-show"
      onClick={onSelect}
      tabIndex={ariaHidden ? -1 : 0}
      aria-hidden={ariaHidden || undefined}
      title={`Jump to showtimes for ${show.name}`}
    >
      <span className="upcoming-title">
        <h4>{show.name}</h4>
        <p>{show.rating}</p>
      </span>
      <img
        src={show.poster}
        alt={ariaHidden ? "" : `${show.name} poster`}
        loading="lazy"
        decoding="async"
      />
      <p className="upcoming-date">{handleUpcomingDate(show.StartDate)}</p>
    </button>
  );
}

function Upcoming({ upcoming, handleDateChange }) {
  if (!upcoming || upcoming.length === 0) return null;

  const selectShow = (show) => {
    handleDateChange(handleUpcomingDateFormatting(show.StartDate));
    // The showtime list this updates lives at the top of the page.
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // The track is rendered twice so the loop is seamless; the second copy is
  // hidden from assistive tech and keyboard focus.
  const marqueeDuration = `${Math.max(upcoming.length * 6, 18)}s`;

  return (
    <section className="upcoming-container">
      <div className="curtains" aria-hidden="true">
        <img
          className="leftcurtain"
          src="/assets/leftcurtain.webp"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <img
          className="rightcurtain"
          src="/assets/rightcurtain.webp"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="upcoming">
        <div className="section-head">
          <p className="eyebrow">On The Marquee Soon</p>
          <h2>Coming Soon</h2>
        </div>
        <div className="marquee">
          <div
            className="marquee-track"
            style={{ animationDuration: marqueeDuration }}
          >
            {[false, true].map((ariaHidden) =>
              upcoming.map((show, index) => (
                <UpcomingShowCard
                  key={`upcoming-${ariaHidden ? "dup" : "main"}-${index}`}
                  show={show}
                  ariaHidden={ariaHidden}
                  onSelect={() => selectShow(show)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Upcoming;
