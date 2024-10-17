import React from "react";

const isInService = (room) => {
  const today = new Date();
  for (let booking of room.bookings) {
    if (
      today >= new Date(booking.check_in) &&
      today <= new Date(booking.check_out)
    ) {
      return true;
    }
  }
  return false;
};

const availableOn = (room) => {
  const today = new Date();

  const sortedBookings = room.bookings.sort((a, b) => {
    new Date(a.check_out) - new Date(b.check_out);
  });

  for (let booking of sortedBookings) {
    if (today <= new Date(booking.check_out)) {
      return new Date(booking.check_out).toISOString().split("T")[0];
    }
  }
  return "Available";
};

const Room = ({ room, checked, roomType }) => {
  return (
    <div
      className="room relative flex justify-between px-[20px] py-[10px] bg-inputColor rounded-[8px] border-solid border-[1px] border-[#D7D9DD] after:content[''] after:absolute after:h-2/3 after:w-[2px] after:bg-mainColor after:top-1/2 after:left-2 after:translate-y-[-50%] text-center 
    "
    >
      {checked ? (
        <input
          type="checkbox"
          name="checkRoom"
          id="checkRoom"
          checked={true}
          className="w-[16.667%] toBeHidden"
        />
      ) : (
        <input
          type="checkbox"
          name="checkRoom"
          id="checkRoom"
          className="w-[16.667%] toBeHidden"
        />
      )}
      <div className="number w-[16.667%]">{room.room_number}</div>
      <div className="type w-[16.667%]">{roomType}</div>
      <div className="in-service w-[16.667%] toBeHidden">
        {isInService(room) ? "Yes" : "No"}
      </div>
      <div className="cleaned w-[16.667%] toBeHidden">
        {room.status == "cleaned" ? "Yes" : "No"}
      </div>
      <div className="available-on text-center w-[16.667%] max-[720px]:text-[12px]">
        {availableOn(room)}
      </div>
    </div>
  );
};

export default Room;
