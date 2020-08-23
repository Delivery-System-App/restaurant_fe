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
