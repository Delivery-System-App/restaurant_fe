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

export const addBanner = (id, body) => {
  return fireRequest("addBanner", [id], body);
};

export const updateProfile = (body) => {
  return fireRequest("updateProfile", [], body);
};

export const getHotel = (id) => {
  return fireRequest("getHotel", [id]);
};

export const getReviews = (id) => {
  return fireRequest("getReviews", [id]);
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

export const updateMenu = (body) => {
  return fireRequest("updateMenu", [], body);
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

export const addCustomer = (body) => {
  return fireRequest("addCustomer", [], body);
};

export const customerDetails = () => {
  return fireRequest("customerDetails", []);
};

export const updateCustomerDetails = (id, body) => {
  return fireRequest("updateCustomerDetails", [id], body);
};

export const deleteCustomer = (id) => {
  return fireRequest("deleteCustomer", [id]);
};

export const getAllhotels = () => {
  return fireRequest("hotelsList", []);
};

export const pendingApproval = (id, body) => {
  return fireRequest("pendingApproval", [id], body);
};

export const allCustomers = () => {
  return fireRequest("allCustomers");
};

export const restaurantCount = () => {
  return fireRequest("restaurantCount");
};

export const updateBooking = (id, body) => {
  return fireRequest("updateBooking", [id], body);
};

export const getSalesReport = (id, body) => {
  return fireRequest("getSalesReport", [id], body);
};

export const getItemReport = (id, body) => {
  return fireRequest("getItemReport", [id], body);
};
