export const actions = {
  CHANGE_HEADING: "CHANGE_HEADING",
  CHANGE_THEME: "CHANGE_THEME",
  FETCH_REQUEST: "FETCH_REQUEST",
  FETCH_REQUEST_SUCCESS: "FETCH_REQUEST_SUCCESS",
  FETCH_REQUEST_ERROR: "FETCH_REQUEST_ERROR",
  SET_DATA: "SET_DATA",
};

export const changeHeading = (heading) => {
  return {
    type: actions.CHANGE_HEADING,
    data: heading,
  };
};

export const changeTheme = (theme) => {
  return {
    type: actions.CHANGE_THEME,
    data: theme,
  };
};

export const setStoreData = (key, value) => {
  return {
    type: actions.SET_DATA,
    key,
    value,
  };
};

export const fetchDataRequest = (key) => {
  return {
    type: actions.FETCH_REQUEST,
    key,
  };
};

export const fetchDataRequestError = (key, error) => {
  return {
    type: actions.FETCH_REQUEST_ERROR,
    key,
    error,
  };
};

export const fetchResponseSuccess = (key, data) => {
  return {
    type: actions.FETCH_REQUEST_SUCCESS,
    key,
    data,
  };
};
