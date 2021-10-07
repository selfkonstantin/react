import React from "react";
import classes from "./SortingTickets.module.scss";
import AppInput from "../UI/Input/AppInput";

const SortingTickets = ({ filter, setFilter }) => {
  let displaySorting = [
    { text: "Самый дешевый", name: "price" },
    { text: "Самый быстрый", name: "duration" },
    { text: "Оптимальный", name: "optimal" }
  ];

  const changeSort = ({ target: { value } }) => {
    setFilter((filter) => ({
      ...filter,
      sort: value
    }));
  };

  return (
    <div className={classes.Sorting}>
      <fieldset>
        <legend>Соотношение</legend>
        <div className={classes.btnGroup}>
          {displaySorting.map((s) => (
            <div key={s.name} className={classes.btn}>
              <AppInput
                id={s.name}
                type="radio"
                name={s.name}
                value={s.name}
                checked={filter.sort === s.name}
                onChange={changeSort}
              />
              <label htmlFor={s.name}>{s.text}</label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default SortingTickets;
