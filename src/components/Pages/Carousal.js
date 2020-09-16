import React, { useState, useEffect } from "react";
import {
  Card,
  makeStyles,
  CardMedia,
  CardActionArea,
  Button,
} from "@material-ui/core";
import { ChevronRight, ChevronLeft } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";

const CarouselSlide = ({ images, props = null }) => {
  const useStyles = makeStyles(() => ({
    media: {
      height: 180,
      backgroundImage: "url(" + images.image + ")",
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "50% 50%",
    },
    delete: {
      width: "100",
      textAlign: "right",
      padding: 5,
    },
  }));

  const classes = useStyles();

  return (
    <Card>
      <CardMedia className={classes.media} title="Hotel image"></CardMedia>
      {props ? (
        <CardActionArea style={{ outline: "none" }} className={classes.delete}>
          <Button
            onClick={() => props.deleteFunction(images.index)}
            size="small"
            style={{ outline: "none" }}
          >
            Delete
            <DeleteIcon color="secondary" />
          </Button>
        </CardActionArea>
      ) : (
        ""
      )}
    </Card>
  );
};

const Carousal = ({ images, props }) => {
  function Arrow(props) {
    const { direction, clickFunction } = props;
    const icon = direction === "left" ? <ChevronLeft /> : <ChevronRight />;

    return (
      <button style={{ outline: "none" }} onClick={clickFunction}>
        {icon}
      </button>
    );
  }

  const [index, setIndex] = useState(0);
  const [Len, setLen] = useState(0);
  if (typeof images === "string") {
    images = [images];
  }

  const content = { index: index, image: images[index] };
  const numSlides = images.length;
  useEffect(() => {
    setLen(numSlides);
  }, [images, numSlides]);

  const onArrowClick = (direction) => {
    const increment = direction === "left" ? -1 : 1;
    const newIndex = (index + increment + numSlides) % numSlides;
    setIndex(newIndex);
  };
  return (
    <div className="flex">
      <div
        style={{ width: "10%", marginTop: "60px" }}
        className={`${Len > 1 ? "block" : "text-transparent"} text-left`}
      >
        <Arrow direction="left" clickFunction={() => onArrowClick("left")} />
      </div>
      <div style={{ width: "80%" }}>
        <CarouselSlide props={props} images={content} />
      </div>
      <div
        style={{ width: "10%", marginTop: "60px" }}
        className={`${Len > 1 ? "block" : "text-transparent"} text-right`}
      >
        <Arrow direction="right" clickFunction={() => onArrowClick("right")} />
      </div>
    </div>
  );
};

export default Carousal;
