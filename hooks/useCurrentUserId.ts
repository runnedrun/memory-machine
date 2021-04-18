import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";

export default () => {
  return ["111", false];
  // const [user, loading] = useAuthState(firebase.auth());
  // return [user?.uid, loading];
};
