import React, { useState } from "react";
import reservationsData from "../data/mockData.json";
import { Reservation } from "../interfaces/Reservation";
import "../styles/ReservationList.css";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  return formattedDate;
};

const ReservationListWithoutLibrary = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [nameFilter, setNameFilter] = useState("");

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleNameFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNameFilter(event.target.value);
  };

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const filteredAndSortedRows = reservationsData.reservations
    .filter((reservation: Reservation) =>
      Object.values(reservation)
        .join(" ")
        .toLowerCase()
        .includes(filter.toLowerCase())
    )
    .filter(
      (reservation: Reservation) =>
        reservation.customer.firstName
          .toLowerCase()
          .includes(nameFilter.toLowerCase()) ||
        reservation.customer.lastName
          .toLowerCase()
          .includes(nameFilter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy) {
        const fieldA = (a as any)[sortBy];
        const fieldB = (b as any)[sortBy];
        return sortOrder === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      return 0;
    });

  const paginatedRows = filteredAndSortedRows.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <div className="data-grid-container">
      <div className="filters">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter"
        />
        <input
          type="text"
          value={nameFilter}
          onChange={handleNameFilterChange}
          placeholder="Search by name"
        />
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            <th onClick={() => handleSortChange("id")}>ID</th>
            <th onClick={() => handleSortChange("businessDate")}>
              Business Date
            </th>
            <th onClick={() => handleSortChange("status")}>Status</th>
            <th onClick={() => handleSortChange("shift")}>Shift</th>
            <th onClick={() => handleSortChange("start")}>Start</th>
            <th onClick={() => handleSortChange("end")}>End</th>
            <th onClick={() => handleSortChange("quantity")}>Quantity</th>
            <th onClick={() => handleSortChange("customer")}>Customer Name</th>
            <th onClick={() => handleSortChange("area")}>Area</th>
            <th onClick={() => handleSortChange("guestNotes")}>Guest Notes</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.businessDate}</td>
              <td>{row.status}</td>
              <td>{row.shift}</td>
              <td>{formatDate(row.start)}</td>
              <td>{formatDate(row.end)}</td>
              <td>{row.quantity}</td>
              <td>{`${row.customer.firstName} ${row.customer.lastName}`}</td>
              <td>{row.area}</td>
              <td>{row.guestNotes}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
          {[5, 10, 25].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span>{`Showing ${page * rowsPerPage + 1}-${Math.min(
          (page + 1) * rowsPerPage,
          filteredAndSortedRows.length
        )} of ${filteredAndSortedRows.length}`}</span>
        <button
          onClick={() => handleChangePage(page - 1)}
          disabled={page === 0}
        >
          Prev
        </button>
        <button
          onClick={() => handleChangePage(page + 1)}
          disabled={(page + 1) * rowsPerPage >= filteredAndSortedRows.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReservationListWithoutLibrary;
