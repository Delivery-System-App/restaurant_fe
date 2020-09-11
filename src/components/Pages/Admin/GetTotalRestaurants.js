import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { restaurantCount } from "../../../redux/apiActions";
import { useDispatch } from "react-redux";
const GetTotalRestaurants = () => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    dispatch(restaurantCount()).then((resp) => {
      if (resp.status === 200) {
        setTotal(resp.data);
      }
    });
  }, [dispatch]);
  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        style={{
          outline: "none",
          marginRight: 3,
        }}
      >
        Total:{total}
      </Button>
    </>
  );
};
export default GetTotalRestaurants;
