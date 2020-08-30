import React from "react";
import BackButton from "../buttons/BackButton";

const Listbookings = ({ resid }) => {
  return (
    <>
      <BackButton />
      <div className="w-full text-center">
        <h1>bookings list for restaurant id: #{resid}</h1>
      </div>
    </>
  );
};
export default Listbookings;
