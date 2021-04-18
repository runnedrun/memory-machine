import firebase from "firebase";
import { TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
var provider = new firebase.auth.GoogleAuthProvider();

export default () => {
  const signIn = () => firebase.auth().signInWithPopup(provider);
  return (
    <View>
      <TouchableOpacity onPress={signIn}>
        <Text>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};
