import React, { useMemo } from "react";
import Ticket from "./Ticket/Ticket";

const TicketList = ({ tickets, limit, page }) => {
  const pageTickets = useMemo(() => {
    return tickets.slice((page - 1) * limit, page * limit);
  }, [tickets, limit, page]);

  return (
    <div>
      {pageTickets.map((ticket) => (
        <Ticket key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketList;
