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
export const viewMenu = (id) => {
  return fireRequest("viewMenu", [id]);
};
