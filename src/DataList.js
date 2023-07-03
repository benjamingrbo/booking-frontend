import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import './DataList.css'


const DataList = ({data}) => {
    const rows = Math.ceil(data.length / 3); // Calculate the number of rows

  const createRows = () => {
    const rowsArray = [];

    for (let i = 0; i < rows; i++) {
      const startIndex = i * 3;
      const endIndex = startIndex + 3;
      const rowData = data.slice(startIndex, endIndex);

      const row = (
        <div className="row" key={i}>
          {rowData.map((item, index) => (
            <div className="card" key={index}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {/* Add more elements as needed */}
            </div>
          ))}
        </div>
      );

      rowsArray.push(row);
    }

    return rowsArray;
  };

  return <div className="DataListComponent">
    <h6>Pogledajte najpopularnije usluge</h6>
    {createRows()}
    </div>;
};

export default DataList;