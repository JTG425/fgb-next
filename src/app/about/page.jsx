"use client";

import "@/styles/pagestyles/about.css";
import Reveal from "@/components/reveal";

export default function About() {
  return (
    <div className="page-container">
      <div className="shell about-container">
        <div className="section-head">
          <p className="eyebrow">Family Owned Since 1980</p>
          <h1>About Us</h1>
        </div>

        <Reveal className="about-hero card">
          <img
            src="/assets/newCap.webp"
            alt="The Capitol Theater today"
            className="about-hero-image"
            decoding="async"
          />
          <p className="about-hero-text">
            FGB Theaters, including the Capitol Theater and Paramount Theater,
            are family owned and operated movie theaters located in the heart
            of Vermont.
          </p>
        </Reveal>

        <Reveal className="about-row card card-hover" delay={0.05}>
          <div className="about-images">
            <img
              src="/assets/oldCap.webp"
              alt="The Capitol Theater in 1980"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/assets/oldParamount.webp"
              alt="The Paramount Theater in 1980"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-text">
            <h3>A Downtown Staple</h3>
            <p>
              Opened in 1980, our two locations have been a staple of downtown
              Montpelier and Barre VT, bringing the most popular and
              anticipated movies to our audience for decades.
            </p>
          </div>
        </Reveal>

        <Reveal className="about-row reverse card card-hover" delay={0.05}>
          <div className="about-images">
            <img
              src="/assets/jiddo.webp"
              alt="Theater founder"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-text">
            <h3>A First Class Experience</h3>
            <p>
              Our theaters are equipped with the latest in digital projection
              and sound technology, providing our customers with a first class
              movie going experience.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
