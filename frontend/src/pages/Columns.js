import React from "react";

function Columns({ column }) {
  // Accessing the values from the column prop
  const { column_name, data_type } = column;
  return (
    <ul className="column-row">
      <li className="column-item">{column_name}</li>
      <li className="column-item">{data_type}</li>
    </ul>
  );
}

export default Columns;
