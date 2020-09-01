import { fireRequest } from "./fireRequest";

export const login = (body) => {
  return fireRequest("login", [], body);
};
export const getCurrentUser = () => {
  return fireRequest("currentUser");
};

export const register = (body) => {
  return fireRequest("register", [], body);
};

export const addHotel = (body) => {
  //  return fireRequest("addHotel", [], body, "", true);
  return fireRequest("addHotel", [], body);
};

export const updateProfile = (body) => {
  return fireRequest("updateProfile", [], body);
};

export const allHotels = () => {
  return fireRequest("allHotels");
};

export const updateHotel = (id, body) => {
  return fireRequest("updateHotel", [id], body);
};

export const addDish = (id, body) => {
  return fireRequest("addDish", [id], body);
};

export const deleteHotel = (id) => {
  return fireRequest("deleteHotel", [id]);
};
export const deleteMenu = (id) => {
  return fireRequest("deleteMenu", [id]);
};
export const deleteDish = (body) => {
  return fireRequest("deleteDish", [], body);
};
export const viewMenu = (id) => {
  return fireRequest("viewMenu", [id]);
};

export const menuItems = (id) => {
  return fireRequest("menuItems", [id]);
};

export const updateDish = (body) => {
  return fireRequest("updateDish", [], body);
};

export const addMoreDish = (body) => {
  return fireRequest("addMoreDish", [], body);
};

export const hotelBookingDetails = (id) => {
  return fireRequest("hotelBookingDetails", [id]);
};

export const bookingDetailsById = (id) => {
  return fireRequest("bookingDetailsById", [id]);
};
