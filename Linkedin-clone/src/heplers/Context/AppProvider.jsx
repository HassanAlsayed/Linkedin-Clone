/* eslint-disable react/prop-types */
import { createContext, useMemo, useState } from "react";
import { GetCurrentUser } from "../../api/FireStoreAPI";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    GetCurrentUser(setCurrentUser);
  }, []);

  let CurrentUser = {
    userId: currentUser?.userId,
    username: currentUser?.username,
    imageUrl: currentUser?.imageUrl,
    email: currentUser?.email,
  };

  return (
    <AppContext.Provider
      value={{
        CurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
