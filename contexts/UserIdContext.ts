import * as React from "react";
import firebase from "firebase";

export const UserIdContext = React.createContext<string>("");
export const UserIdContextProvider = UserIdContext.Provider;
