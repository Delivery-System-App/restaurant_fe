import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeHeading } from "../../redux/actions";

export default function useHeading(heading) {
  const dispatch = useDispatch();
  console.log("called");
  useEffect(() => {
    document.title = heading;
    dispatch(changeHeading(heading));
  }, [heading, dispatch]);
}
