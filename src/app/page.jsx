"use client";

import { useState } from "react";
import "@/styles/pagestyles/home.css";
import SlideShow from "@/components/slideshow";
import MovieCard from "@/components/movieCard";
import SelectTheater from "@/components/selecttheater";
import Upcoming from "@/components/upcoming";
import CustomDatepicker from "@/components/customDatePicker";
import { motion, AnimatePresence } from "framer-motion";
import { useSite } from "@/context/SiteProvider";

const handleDateFormating = (date) => {
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month.toString();
  const formattedDay = day < 10 ? `0${day}` : day.toString();
  return `${formattedMonth}${formattedDay}${year}`;
};

export default function Home() {
  const { capShows, parShows, upcoming, loading, slideshow } = useSite();
  const [date, setDate] = useState(handleDateFormating(new Date()));
  const [selectedTheater, setSelectedTheater] = useState("capitol");

  const handleDateChange = (newDate) => {
    setDate(handleDateFormating(newDate));
  };

  return (
    <AnimatePresence mode="wait">
      {!loading && (
        <motion.div
          className="page-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SlideShow slideshowData={slideshow} />
          <div className="shell home-shell">
            <div className="section-head">
              <p className="eyebrow">Fresh Popcorn Daily</p>
              <h2>Now Showing</h2>
            </div>
            <div className="home-controls">
              <SelectTheater
                selected={selectedTheater}
                setSelected={setSelectedTheater}
              />
              <CustomDatepicker setDate={handleDateChange} />
            </div>
            <div className="movies-container">
              <MovieCard
                date={date}
                capShows={capShows}
                parShows={parShows}
                selectedTheater={selectedTheater}
              />
            </div>
          </div>
          <Upcoming upcoming={upcoming} handleDateChange={handleDateChange} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
