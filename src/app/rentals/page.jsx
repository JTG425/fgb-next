"use client";

import "@/styles/pagestyles/rentals.css";
import { FaPhoneAlt } from "react-icons/fa";
import Reveal from "@/components/reveal";

export default function Rentals() {
  return (
    <div className="page-container">
      <div className="shell rentals-container">
        <div className="section-head">
          <p className="eyebrow">Your Name In Lights</p>
          <h1>Rentals</h1>
          <p className="section-sub">
            Rent the big screen for parties, premieres, presentations — or the
            whole school.
          </p>
        </div>

        <Reveal className="rentals-contact-card card">
          <p className="rentals-contact-lead">
            For more information contact the Capitol Theater
          </p>
          <a href="tel:18025223576" className="btn btn-primary">
            <FaPhoneAlt aria-hidden="true" />
            (802) 522-3576
          </a>
        </Reveal>

        <div className="rentals-content">
          <Reveal className="rentals-info-card card card-hover">
            <h3>Special Events</h3>
            <p>
              Do you have something &quot;Big&quot; planned? Our neon lit
              marquee will leave a lasting memory.
            </p>
            <h3>Business Meetings</h3>
            <p>
              Our auditoriums hold up to 200 people. Captivate your clients
              attention while they sit comfortably in our theater.
            </p>
            <h3>Schools</h3>
            <p>
              Special group rates for parties of 80 or more! We can fit the
              whole school! Our digital projection offers more flexibility
              than ever before!
            </p>
          </Reveal>

          <Reveal className="rentals-info-card card card-hover" delay={0.08}>
            <h3>Birthday Parties</h3>
            <p>Celebrate your child&apos;s birthday at the movies!</p>
            <p className="rentals-note">(6 person minimum)</p>
            <p className="rentals-price">
              <b>$16.75</b> <i>per person</i>
            </p>
            <ul>
              <li>
                <b>Reserved seating</b> to the movie showing of your choice.
              </li>
              <li>
                <b>FREE movie ticket and kids pack for the birthday child!</b>
              </li>
            </ul>
          </Reveal>

          <Reveal className="rentals-info-card card card-hover" delay={0.12}>
            <h3>Advertisements</h3>
            <p>
              Advertise your business on the big screen! Reach a larger
              audience with our digital projection. As the leader in cinema
              advertising, Screenvision connects your business with consumers
              through on-screen advertising available here at FGB Theaters.
              Showcase your business with the power of Hollywood and let
              advertising on our big screens deliver blockbuster results.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
