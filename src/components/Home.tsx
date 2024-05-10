import React from "react";
import ReservationList from "./ReservationList";
// import ReservationListWithoutLibrary from "./ReservationListWithoutLibrary";

const Home: React.FC = () => {
  return (
    <>
      <h3>Reservations</h3>
      <ReservationList />
    </>
  );
};
export default Home;
