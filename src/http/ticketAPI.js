import { $host } from "./index";

export const getSearchId = async () => {
  let { data, status } = await $host.get("search");
  if (status === 200) {
    localStorage.setItem("searchId", data.searchId);
  }
};

export const getTickets = async () => {
  let searchId = localStorage.getItem("searchId");

  if (!searchId) {
    await getSearchId();
    return {
      tickets: [],
      stop: false
    };
  }

  let { data, status } = await $host.get("tickets", {
    params: {
      searchId: searchId
    }
  });

  if (data.stop === true) {
    localStorage.removeItem("searchId");
  }
  if (status === 200) {
    return data;
  }
};
