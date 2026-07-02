"use client";

import "@/styles/pagestyles/locations.css";
import dynamic from "next/dynamic";
import { FaPhoneAlt } from "react-icons/fa";
import Reveal from "@/components/reveal";

// mapbox-gl touches `window` at import time, so the map must only load
// in the browser (never during server rendering).
const TheaterMap = dynamic(() => import("@/components/theaterMap"), {
  ssr: false,
  loading: () => <div className="map-loading">Loading map…</div>,
});

const THEATERS = [
  {
    name: "Capitol Theater",
    address: "93 State St, Montpelier, VT 05602",
    longitude: -72.57836915903455,
    latitude: 44.26092378286133,
    phoneHref: "tel:18022290343",
    phoneDisplay: "(802) 229-0343",
  },
  {
    name: "Paramount Theater",
    address: "237 N Main St, Barre, VT 05641",
    longitude: -72.50370899940566,
    latitude: 44.19952086200256,
    phoneHref: "tel:18024790078",
    phoneDisplay: "(802) 479-0078",
  },
];

export default function Locations() {
  return (
    <div className="page-container">
      <div className="shell locations">
        <div className="section-head">
          <p className="eyebrow">Two Historic Marquees</p>
          <h1>Locations</h1>
          <p className="section-sub">
            <b>Hours of operation:</b> the box office opens 30 minutes before
            the show and remains open for 20 minutes after the last show of
            the day.
          </p>
        </div>

        <div className="maps">
          {THEATERS.map((theater, index) => (
            <Reveal
              className="map card card-hover"
              key={theater.name}
              delay={index * 0.08}
            >
              <h3>{theater.name}</h3>
              <p className="map-address">{theater.address}</p>
              <div className="map-container">
                <TheaterMap
                  longitude={theater.longitude}
                  latitude={theater.latitude}
                />
              </div>
              <a href={theater.phoneHref} className="btn btn-outline call">
                <FaPhoneAlt aria-hidden="true" />
                {theater.phoneDisplay}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
