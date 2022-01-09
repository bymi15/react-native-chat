import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { STORAGE_IMAGE_KEY, STORAGE_USERNAME_KEY } from "../utils/constants";

interface AuthContextInterface {
  signIn: (data: AuthState) => Promise<void>;
  signOut: () => Promise<void>;
  state: AuthState;
}

const initialState = {
  username: "",
  profileImage: "",
  loggedIn: false,
};

const initialContext = {
  signIn: async () => {},
  signOut: async () => {},
  state: initialState,
};

export const AuthContext = React.createContext<AuthContextInterface>(initialContext);

export interface AuthState {
  username: string;
  profileImage: string;
  loggedIn?: boolean;
}

export interface AuthAction {
  type: AuthActionType;
  payload?: any;
}

export enum AuthActionType {
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
}

function authReducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case AuthActionType.SIGN_IN:
      return {
        ...state,
        username: action.payload.username,
        profileImage: action.payload.profileImage,
        loggedIn: true,
      };
    case AuthActionType.SIGN_OUT:
      return {
        ...state,
        username: "",
        profileImage: "",
        loggedIn: false,
      };
    default:
      return state;
  }
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  const authContext = {
    signIn: async (data: AuthState) => {
      const { username, profileImage } = data;
      await AsyncStorage.setItem(STORAGE_USERNAME_KEY, username);
      await AsyncStorage.setItem(STORAGE_IMAGE_KEY, profileImage);
      dispatch({ type: AuthActionType.SIGN_IN, payload: { username, profileImage } });
    },
    signOut: async () => {
      await AsyncStorage.setItem(STORAGE_USERNAME_KEY, "");
      await AsyncStorage.setItem(STORAGE_IMAGE_KEY, "");
      dispatch({ type: AuthActionType.SIGN_OUT });
    },
    state,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}
