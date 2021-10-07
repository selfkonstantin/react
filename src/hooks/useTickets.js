import { useMemo } from "react";

const useFilterTickets = (tickets, transfer) => {
  const filterTickets = useMemo(() => {
    function filterTransfer(
      ticketsCondition,
      transferCondition,
      numberCondition
    ) {
      if (transferCondition) {
        return [...ticketsCondition].filter(
          (ticket) => ticket["number_stops"] === numberCondition
        );
      }
      return [];
    }

    if (transfer.transfer_all) {
      return [...tickets];
    }

    let ticketsTransfer0 = filterTransfer(tickets, transfer.transfer_0, 0);
    let ticketsTransfer1 = filterTransfer(tickets, transfer.transfer_1, 1);
    let ticketsTransfer2 = filterTransfer(tickets, transfer.transfer_2, 2);
    let ticketsTransfer3 = filterTransfer(tickets, transfer.transfer_3, 3);

    return [
      ...ticketsTransfer0,
      ...ticketsTransfer1,
      ...ticketsTransfer2,
      ...ticketsTransfer3
    ];
  }, [tickets, transfer]);

  return filterTickets;
};

export const useTickets = (tickets, sort, transfer) => {
  const filterTickets = useFilterTickets(tickets, transfer);

  const sortedTickets = useMemo(() => {
    switch (sort) {
      case "price":
        return [...filterTickets].sort((a, b) => a["price"] - b["price"]);
      case "duration":
        return [...filterTickets].sort(
          (a, b) => a["total_duration"] - b["total_duration"]
        );
      case "optimal":
        return [...filterTickets].sort(
          (a, b) => a["optimal_variable"] - b["optimal_variable"]
        );
      default:
        return [...filterTickets];
    }
  }, [filterTickets, sort]);

  return sortedTickets;
};
