"use client";

import "@/styles/pagestyles/tickets.css";
import Prices from "@/components/prices";
import Reveal from "@/components/reveal";

const TERMS = [
  {
    heading: "Print At Home",
    body: [
      <p key="p1">
        When you purchase your tickets online, a confirmation email will be
        sent to you, accompanied by a set of bar codes, and 12 numbers. These
        can be brought straight to the ticket-taker stationed in front of the
        theatre or the will call window.
      </p>,
    ],
  },
  {
    heading: "Order & Pick-up Online Tickets",
    body: [
      <p key="p1">
        Please make sure to check the date and showtime of the movie you wish
        to buy tickets for. Tickets are valid only for the date and showtime
        purchased. You will need a credit card to purchase online tickets, and
        there is a non-refundable $1.00 service fee for each ticket.
      </p>,
      <p key="p2">
        You will receive an email confirmation receipt with the purchase
        number and a set of bar codes. Some ISP&apos;s will block the
        confirmation email, but that does NOT mean that there was a problem
        with the transaction.
      </p>,
      <p key="p3" className="terms-important">
        *You need the confirmation email and/or credit card you used to
        purchase the tickets in order to pick them up at the theatre.*
      </p>,
    ],
  },
  {
    heading: "Cancellations",
    body: [
      <p key="p1">
        You will need to present the same credit card at the theatre to
        process any refunds, cancellations or exchanges. Service charges are
        not refundable due to 3rd party fees.
      </p>,
      <p key="p2" className="terms-important">
        Refunds can only be issued on or before the specific start time on the
        ticket purchased. Please contact the theatre prior to showtime if
        unable to attend (802-223-4778).
      </p>,
    ],
  },
];

export default function Tickets() {
  return (
    <div className="page-container">
      <div className="shell tickets">
        <div className="section-head">
          <p className="eyebrow">Skip The Line</p>
          <h1>Buy Tickets</h1>
          <p className="section-sub">
            Grab your seats online and head straight for the popcorn.
          </p>
        </div>

        <Reveal className="buy-ticket-container card">
          <h3>Today&apos;s Prices</h3>
          <Prices />
          <a
            href="https://app.formovietickets.com/?id=fgbtheatres"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn btn-primary buy-button">
              Buy Tickets Now
            </button>
          </a>
        </Reveal>

        <Reveal className="tickets-terms card" delay={0.08}>
          <h2 className="terms-title">The Fine Print</h2>
          {TERMS.map(({ heading, body }) => (
            <section className="terms-section" key={heading}>
              <h3>{heading}</h3>
              {body}
            </section>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
