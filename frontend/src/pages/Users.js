import React, { useState } from "react";
import axios from "axios";
import Columns from "./Columns";
import HandleDownload from "./HandleDownload";
const Users = () => {
  const [inputValue, setInputValue] = useState("");
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState([]);
  const [sourceDefinition, setSourceDefinition] = useState({
    Name: "",
    columns: [],
  });
  const [tableStatus, setTableStatus] = useState();
  const [displayedColumns, setDisplayedColumns] = useState([]);
  // Table name section
  const [tableSection, setTableSection] = useState(true);
  // Hide fetch cloumn button by default passing true or false
  const [fetchButton, setFetchButton] = useState(false);
  // Hide show columns by default
  const [showColumns, setShowColumns] = useState(false);
  // Hide Table section when preview button is clicked.
  const [secTwo, setSecTwo] = useState(true);
  const [goBackButton, setGobackButton] = useState(true);
  // Open and close model to preview
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
    display();
    setSecTwo(false);
    setGobackButton(false);
  };
  const closeModal = () => {
    setIsOpen(false);
    setSecTwo(true);
    setGobackButton(true);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const table_name = inputValue;
    // Send inputValue to server using fetch or axios
    await axios.post("http://localhost:8800/", { table_name });
    setTableName(table_name);
  };
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const fetchColumns = async () => {
    try {
      const response = await axios.get(`http://localhost:8800/`);
      const columns = response.data.map((col) => ({
        column_name: col.column_name,
        data_type: col.data_type,
      }));
      setTableStatus("");
      setColumns(columns);
      setSourceDefinition({
        ...sourceDefinition,
        columns: columns,
        Name: tableName,
      });
    } catch (error) {
      console.log(error);
      setTableStatus("Table not found");
    }
  };
  const handleColumnNameChange = (event, i) => {
    const newColumns = [...sourceDefinition.columns];
    newColumns[i].column_name = event.target.value;
    setSourceDefinition({
      ...sourceDefinition,
      columns: newColumns,
    });
  };
  const handleDataTypeChange = (event, i) => {
    const newColumns = [...sourceDefinition.columns];
    newColumns[i].data_type = event.target.value;
    setSourceDefinition({
      ...sourceDefinition,
      columns: newColumns,
    });
  };
  const display = () => {
    setDisplayedColumns(sourceDefinition.columns);
  };
  const handleButtonClick = () => {
    fetchColumns(); // Retrieve and display data.
    setShowColumns(true); // display section to display columns and dataType.
    setTableSection(false); // Hide table section
  };
  const goBack = () => {
    setTableSection(true); // Show table section on back button click.
    setShowColumns(false); // Hide section to display columns and dataType.
  };
  return (
    <div className="container1">
      {tableSection && (
        <div>
          <h1 className="title">Table Name</h1>

          <form onSubmit={handleSubmit}>
            <input
              className="input-field "
              type="text"
              value={inputValue}
              onChange={handleChange}
            />
            <button
              className="submit-button"
              type="submit"
              onClick={() => setFetchButton(true)}
            >
              Submit
            </button>
          </form>

          {fetchButton && (
            <div className="fetch-section">
              <p>Ready to fetch {tableName} table. </p>
              <h3>Load Table</h3>
              <button
                className="fetch-columns-button"
                onClick={handleButtonClick}
              >
                Fetch Columns
              </button>
            </div>
          )}
        </div>
      )}
      {/*Hide display column Section by default  */}
      <br />
      {showColumns && (
        <div>
          <div className="container2">
            <p className="table-error">{tableStatus}</p>{" "}
            {/* displays error message */}
            <h1 className="title1">Edit Columns</h1>
            {goBackButton && (
              <button className="back-button1" onClick={goBack}>
                Back
              </button>
            )}
            <HandleDownload
              tableName={tableName}
              sourceDefinition={sourceDefinition}
            />
            <div>
              <div>
                <button className="preview-button" onClick={openModal}>
                  Preview
                </button>
                {isOpen && (
                  <div className="modal">
                    <div className="modal-content">
                      <HandleDownload
                        tableName={tableName}
                        sourceDefinition={sourceDefinition}
                      />
                      <button className="close-button" onClick={closeModal}>
                        Close Modal
                      </button>{" "}
                      {displayedColumns.map((col, i) => (
                        <Columns key={i} column={col} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {secTwo && (
            <table className="columns-table">
              <thead>
                <tr>
                  <th>Column Name</th>
                  <th>Data Type</th>
                </tr>
              </thead>
              <tbody>
                {columns.map((col, i) => (
                  <tr key={i}>
                    <td>
                      <input
                        type="text"
                        value={col.column_name}
                        onChange={(event) => handleColumnNameChange(event, i)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={col.data_type}
                        onChange={(event) => handleDataTypeChange(event, i)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
