import React, { useEffect, useState } from "react";
import classes from "./CurrentDate.module.css";

const CurrentDate = () => {
  const [date, setDate] = useState(0);

  useEffect(() => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dateNow = Date.now();
    setDate(new Intl.DateTimeFormat("en-US", options).format(dateNow));

    const id = setInterval(() => {
      setDate(new Intl.DateTimeFormat("en-US", options).format(dateNow));
    }, 1000 * 60);

    return () => clearInterval(id);
  }, []);

  return (
    <div className={classes.date}>
      <article className={classes.article}>
        <p>
          <span>Hello user</span>
        </p>
        <p>{date}</p>
      </article>
    </div>
  );
};

export default CurrentDate;
