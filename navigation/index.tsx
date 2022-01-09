import * as React from "react";
import { AuthContext } from "../store";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

export default function Navigation() {
  const { state } = React.useContext(AuthContext);
  return state.loggedIn ? <MainNavigator /> : <AuthNavigator />;
}
