import React from "react";
import classes from "./Ticket.module.scss";
import moment from "moment";
import "moment-duration-format";

const Ticket = ({ ticket }) => {
  const currencyFormat = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0
  });

  return (
    <div className={classes.Ticket}>
      <div className={classes.info}>
        <div className={classes.price}>
          {currencyFormat.format(ticket.price)}
        </div>
        <div>
          <img
            src={`http://pics.avs.io/99/36/${ticket.carrier}.png`}
            alt={`${ticket.carrier}`}
          />
        </div>
      </div>
      <div className={classes.desc}>
        {ticket.segments.map((segment, index) => (
          <div key={ticket.id + index} className={classes.line}>
            <div className={classes.cell}>
              <div>
                {segment.origin} - {segment.destination}
              </div>
              <div>
                {moment(segment.date).format("HH:mm")}
                {" - "}
                {moment(segment.date)
                  .add(segment.duration, "minutes")
                  .format("HH:mm")}
              </div>
            </div>
            <div className={classes.cell}>
              <div>В пути</div>
              <div>
                {moment
                  .duration(segment.duration, "minutes")
                  .format("H[ч] m[м]")}
              </div>
            </div>
            <div className={classes.cell}>
              <div>{segment.stops.length} пересадки</div>
              <div>{segment.stops.join(",")}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticket;
