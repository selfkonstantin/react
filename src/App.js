import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import TicketList from "./components/TicketList/TicketList";
import { ReactComponent as Logo } from "./img/logo.svg";
import classes from "./styles/App.module.scss";
import { useFetching } from "./hooks/useFetching";
import { getTickets } from "./http/ticketAPI";
import { useTickets } from "./hooks/useTickets";
import SortingTickets from "./components/SortingTickets/SortingTickets";
import FilterTickets from "./components/FilterTickets/FilterTickets";
import Loader from "./components/UI/Loader/Loader";

function App() {
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState({
    sort: "price",
    transfer: {
      transfer_all: false,
      transfer_0: false,
      transfer_1: true,
      transfer_2: false,
      transfer_3: false
    }
  });

  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const [fetchTickets, isLoading, Error] = useFetching(async () => {
    let stop = false;

    while (!stop) {
      let response = await getTickets();
      stop = response.stop;
      if (response.tickets.length) {
        let new_tickets = response.tickets.map((ticket) => {
          ticket["id"] = nanoid();
          ticket["total_duration"] =
            ticket.segments[0].duration + ticket.segments[1].duration;
          ticket["optimal_variable"] = ticket["total_duration"] * ticket.price;
          ticket["number_stops"] =
            ticket.segments[0].stops.length + ticket.segments[1].stops.length;
          return ticket;
        });
        setTickets((tickets) => [...tickets, ...new_tickets]);
      } else {
        setTickets([]);
      }
    }
  });

  useEffect(() => {
    localStorage.removeItem("searchId");
    fetchTickets();
  }, []);

  const sortedAndFilteredTickets = useTickets(
    tickets,
    filter.sort,
    filter.transfer
  );

  return (
    <div>
      <Logo className={classes.logo} />
      <Loader loading={isLoading} />
      <div className={classes.App}>
        <div>
          <FilterTickets filter={filter} setFilter={setFilter} />
        </div>
        <div className={classes.content}>
          <SortingTickets filter={filter} setFilter={setFilter} />
          {sortedAndFilteredTickets.length ? (
            <TicketList
              tickets={sortedAndFilteredTickets}
              limit={limit}
              page={page}
            />
          ) : (
            <div style={{ textAlign: "center" }}>Установите нужный фильтр</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
