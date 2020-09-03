export default {
  currentUser: {
    path: "/api/v1/auth/user",
    noAuth: false,
  },
  register: {
    path: "/api/v1/auth/register",
    method: "post",
    noAuth: true,
  },
  login: {
    path: "/api/v1/auth/login",
    method: "post",
    noAuth: true,
  },
  addHotel: {
    path: "/api/v1/restaurant/add-restaurant",
    method: "post",
    noAuth: false,
  },
  allHotels: {
    path: "/api/v1/restaurant/userRestaurants",
    noAuth: false,
  },
  updateHotel: {
    path: "/api/v1/restaurant",
    method: "PATCH",
    noAuth: false,
  },
  deleteHotel: {
    path: "/api/v1/restaurant",
    method: "DELETE",
    noAuth: false,
  },
  deleteMenu: {
    path: "/api/v1/menu",
    method: "DELETE",
    noAuth: false,
  },
  updateMenu: {
    path: "/api/v1/menu/updateMenu",
    method: "POST",
    noAuth: false,
  },
  deleteDish: {
    path: "/api/v1/menu/deletedish",
    method: "POST",
    noAuth: false,
  },
  viewMenu: {
    path: "/api/v1/menu/menu",
    method: "get",
    noAuth: false,
  },
  addDish: {
    path: "/api/v1/menu",
    method: "POST",
    noAuth: false,
  },
  menuItems: {
    path: "/api/v1/menu/dishes",
    method: "get",
    noAuth: false,
  },
  updateDish: {
    path: "/api/v1/menu/updateDish",
    method: "put",
    noAuth: false,
  },
  updateProfile: {
    path: "/api/v1/auth/updateuser",
    method: "POST",
    noAuth: false,
  },
  addMoreDish: {
    path: "/api/v1/menu/addmoredish",
    method: "PATCH",
    noAuth: false,
  },
  hotelBookingDetails: {
    path: "/api/v1/booking/All_Bookings",
    method: "GET",
    noAuth: false,
  },
  bookingDetailsById: {
    path: "/api/v1/booking/GetBookingDetail",
    method: "GET",
    noAuth: false,
  },
  addCustomer: {
    path: "/api/v1/customer/addCustomer",
    method: "POST",
    noAuth: false,
  },
  customerDetails: {
    path: "/api/v1/customer/customerDetails",
    method: "GET",
    noAuth: false,
  },
};
