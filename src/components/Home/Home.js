import React, { useEffect, useState } from "react";
import Event from "../Event/Event";
import "./Home.css";

const Home = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);
  return (
    <div className="row event-card">
      {events.map((event) => (
        <Event event={event}></Event>
      ))}
    </div>
  );
};

export default Home;
