"use client";

import React, { useState } from "react";
import Button from "./Button";

const Columns = ({ data }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<any>({});
  const rowsPerPage = 10;

  // Create table headers from keys
  const headers = Object.keys(data[0] || {});

  // Filter data based on filters
  const filteredData = data.filter((row: any) => {
    return headers.every((header: any) => {
      if (!filters[header]) return true;
      return String(row[header])
        .toLowerCase()
        .includes(filters[header].toLowerCase());
    });
  });

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = filteredData.slice(
    indexOfFirstRow,
    indexOfFirstRow + rowsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleFilterChange = (header: string, value: string) => {
    setFilters({ ...filters, [header]: value });
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <>
      <Button
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        totalColumns={headers.length}
      />
      <div className="table-container overflow-x-auto my-6 w-full">
        <table className="px-10 w-full">
          <thead className="border border-gray-400">
            <tr className="border border-gray-400">
              {headers.map((header) => (
                <th
                  className="border-r pt-5 border-gray-400 text-green-400 text-sm px-6 w-full"
                  key={header}
                >
                  <label className="text-base uppercase font-medium">
                    {header}
                  </label>
                  <br />
                  <input
                    type="text"
                    placeholder={`Filter ${header}`}
                    className="font-medium w-auto border my-8 bg-transparent border-gray-600 rounded-md p-2 outline-none"
                    value={filters[header] || ""}
                    onChange={(e) => handleFilterChange(header, e.target.value)}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((ele: any, idx: any) => (
              <tr key={idx}>
                {headers.map((header) => (
                  <td
                    className="border border-gray-500 text-green-50 text-sm px-3 py-3"
                    key={header}
                  >
                    {ele[header] === null ? "No Data" : ele[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
        totalColumns={headers.length}
      />
    </>
  );
};

export default Columns;
