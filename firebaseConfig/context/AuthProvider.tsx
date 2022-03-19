import React, { useContext } from "react";
import { authentication } from "./firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  signOut,
  sendPasswordResetEmail,
  User,
  updateEmail,
  updatePassword,
  UserInfo,
} from "firebase/auth";

export interface AuthContextInterface {
  checkingSession: boolean;
  token: string | null;
  idToken: string | null;
  expiresAt: number | null;
  isAuthenticated: boolean;
  loadingAuthState: boolean;
  handleAuthentication: () => void;
  currentUser: UserCredential["user"] | undefined;
  signUp: (email: any, password: any) => Promise<UserCredential>;
  signIn: (email: any, password: any) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const authContextDefaults: AuthContextInterface = {
  checkingSession: false,
  expiresAt: null,
  token: null,
  idToken: null,
  isAuthenticated: false,
  loadingAuthState: true,
  handleAuthentication: () => null,
  currentUser: undefined,
  signUp: (email: any, password: any): Promise<UserCredential> => {
    const auth = getAuth();
    console.log(email, password);
    return createUserWithEmailAndPassword(auth, email, password);
  },
  signIn: (email: any, password: any) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  },
  signOut: () => {
    const auth = getAuth();
    return signOut(auth);
  },
  resetPassword: (email: string) => {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email);
  },
  updateEmail: (email: string) => {
    const auth = getAuth();
    if (auth.currentUser) return updateEmail(auth.currentUser, email);
    else
      return new Promise((resolve, reject) => {
        reject();
      });
  },
  updatePassword: (password: string) => {
    const auth = getAuth();
    if (auth.currentUser) return updatePassword(auth.currentUser, password);
    else
      return new Promise((resolve, reject) => {
        reject();
      });
  },
};

export const AuthContext =
  React.createContext<AuthContextInterface>(authContextDefaults);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = React.useState<User>();

  const [loadingAuthState, setLoadingAuthState] = React.useState<boolean>(
    authContextDefaults.loadingAuthState
  );
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(
    authContextDefaults.isAuthenticated
  );

  React.useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(
      (user: User | null) => {
        if (user) {
          setCurrentUser(user);
          setIsAuthenticated(true);
          setLoadingAuthState(false);
        } else {
          setCurrentUser(undefined);
          setIsAuthenticated(false);
          setLoadingAuthState(false);
        }
      }
    );
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authContextDefaults,
        loadingAuthState: loadingAuthState,
        currentUser: currentUser,
        isAuthenticated: isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
