import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { getReviews } from "../../redux/apiActions";
import RatingCard from "./RatingCard";
import Loader from "../../utils/Loader";
import UseHeading from "./useHeading";
import { Grid, Typography, Card } from "@material-ui/core";
import BackButton from "../buttons/BackButton";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: 25,
    fontWeight: "bold",
  },
  container: {
    marginTop: "10px",
  },
}));

const ViewReviews = ({ id, hotelName }) => {
  UseHeading("Reviews");
  const classes = useStyles();
  const [reviews, setreviews] = useState([]);
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const [name, setname] = useState(hotelName);

  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const replaceAll = (str, term, replacement) => {
    return str.replace(new RegExp(escapeRegExp(term), "g"), replacement);
  };
  useEffect(() => {
    let mount = true;
    setLoading(true);
    if (mount) {
      setname(replaceAll(hotelName, "%20", " "));
      dispatch(getReviews([id])).then((res) => {
        if (res && res.data) {
          setreviews(res.data);
          setLoading(false);
        }
        setLoading(false);
      });
    }
    return () => {
      mount = false;
    };
    //eslint-disable-next-line
  }, [dispatch, id, hotelName]);
  return (
    <>
      <BackButton />
      {Loading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full">
            <div className="w-full text-center">
              <Typography className={classes.heading}>
                <p className="truncate">Reviews of {name}</p>
              </Typography>
            </div>
            <Grid container className={classes.container}>
              {reviews.map((value, index) => {
                if (value.star && value.star !== "")
                  return (
                    <Grid key={index + 1} item xs={12} md={6} lg={4}>
                      <RatingCard
                        stars={Number(value.star)}
                        name={value.username}
                        review={value.feedback}
                      />
                    </Grid>
                  );
                else {
                  return null;
                }
              })}
              {reviews.length === 0 && (
                <Grid
                  direction="column"
                  alignItems="center"
                  justify="center"
                  style={{ width: "100%" }}
                  container
                >
                  <Card
                    style={{
                      textAlign: "center",
                      padding: 15,
                      width: 230,
                      fontSize: 15,
                    }}
                  >
                    No Reviews for this hotel
                  </Card>
                </Grid>
              )}
            </Grid>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewReviews;
