import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [busy, setBusy] = useState(true);

  const register = async (email, password) => {
    const create = await auth.createUserWithEmailAndPassword(email, password);

    if (!auth.currentUser.emailVerified) {
      await sendEmailVerification();
    }

    return create;
  };

  const sendEmailVerification = async () => {
    await auth.currentUser.sendEmailVerification();
  };

  const logIn = async (email, password) => {
    return await auth.signInWithEmailAndPassword(email, password);
  };

  const logOut = () => {
    auth.signOut();
  };

  const refreshToken = () => {
    return auth.currentUser.getIdToken(true);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      setBusy(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    logIn,
    logOut,
    register,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!busy && children}
    </AuthContext.Provider>
  );
};
