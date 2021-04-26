import { useContext } from "react";
import { UserIdContext } from "../contexts/UserIdContext";

export default () => {
  return useContext(UserIdContext);
};
