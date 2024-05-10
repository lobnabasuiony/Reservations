import React from "react";
import reservationsData from "../data/mockData.json";
import { Reservation } from "../interfaces/Reservation";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../styles/ReservationList.css";

const ReservationList = () => {
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString(undefined, options).replace(/\//g, ".");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "businessDate", headerName: "Business Date", width: 120 },
    { field: "status", headerName: "Status", width: 140 },
    { field: "shift", headerName: "Shift", width: 110 },
    { field: "start", headerName: "Start", width: 180 },
    { field: "end", headerName: "End", width: 180 },
    { field: "quantity", headerName: "Quantity", width: 90 },
    { field: "customer", headerName: "Customer Name", width: 200 },
    { field: "area", headerName: "Area", width: 100 },
    { field: "guestNotes", headerName: "Guest Notes", width: 300 },
  ];

  const rows = reservationsData.reservations.map(
    (reservation: Reservation) => ({
      id: reservation.id,
      businessDate: reservation.businessDate,
      status: reservation.status,
      shift: reservation.shift,
      start: formatDate(reservation.start),
      end: formatDate(reservation.end),
      quantity: reservation.quantity,
      customer: `${reservation.customer.firstName} ${reservation.customer.lastName}`,
      area: reservation.area,
      guestNotes: reservation.guestNotes,
    })
  );

  return (
    <>
      <div className="data-grid-container">
        <DataGrid
          rows={rows}
          columns={columns}
          className="custom-table"
          disableColumnSelector
          disableDensitySelector
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
        />
      </div>
    </>
  );
};

export default ReservationList;
