import React from "react";

const HandleDownload = ({ tableName, sourceDefinition }) => {
  const handleDownload = () => {
    const jsonData = JSON.stringify(sourceDefinition, null, 2);
    const file = new Blob([jsonData], { type: "application/json" });
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = `${tableName}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  };

  return (
    <button className="download-button1" onClick={handleDownload}>
      Download JSON
    </button>
  );
};

export default HandleDownload;
