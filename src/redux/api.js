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
};
