"use client";

import { User } from "@/types";
import { createContext, useContext, useState } from "react";

const UserContext = createContext({
  user: null as unknown as User,
  setUser: (user: any) => {},
});

// create a provider for components to consume and subscribe to changes
// add values that you want to expose to components
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null as unknown as User);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export const useUserContext = () => useContext(UserContext);
