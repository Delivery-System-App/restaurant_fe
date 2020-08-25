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
  restaurantDishes: {
    path: "/api/v1/menu/redishes",
    method: "get",
    noAuth: false,
  },
};
