import React from "react";
import classes from "./FilterTickets.module.scss";
import AppInput from "../UI/Input/AppInput";

const FilterTickets = ({ filter, setFilter }) => {
  let displayTransfer = [
    { text: "Все", name: "transfer_all" },
    { text: "Без пересадок", name: "transfer_0" },
    { text: "1 пересадка", name: "transfer_1" },
    { text: "2 пересадки", name: "transfer_2" },
    { text: "3 пересадки", name: "transfer_3" }
  ];

  const changeTransfer = ({ target: { name, checked } }) => {
    setFilter((filter) => ({
      ...filter,
      transfer: {
        ...filter.transfer,
        [name]: checked
      }
    }));
  };

  return (
    <div className={classes.Aside}>
      <fieldset>
        <legend>Количество пересадок</legend>
        {displayTransfer.map((t) => (
          <label key={t.name} htmlFor={t.name}>
            <AppInput
              id={t.name}
              type="checkbox"
              name={t.name}
              defaultChecked={filter.transfer[t.name]}
              onChange={changeTransfer}
            />
            {t.text}
          </label>
        ))}
      </fieldset>
    </div>
  );
};

export default FilterTickets;
