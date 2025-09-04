// 'use client';
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useSession } from "next-auth/react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const { data: session } = useSession();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (session?.user) {
//       const storedUser = JSON.parse(localStorage.getItem("JobportalUser")) || session.user;
//       setUser(storedUser);
//     } else {
//       const storedUser = localStorage.getItem("JobportalUser");
//       if (storedUser) setUser(JSON.parse(storedUser));
//     }
//   }, [session]);

//   const login = (userData) => {
//     localStorage.setItem("JobportalUser", JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("JobportalUser");
//     setUser(null);
//   };

//   const updateUser = (updatedUserData) => {
//     localStorage.setItem("JobportalUser", JSON.stringify(updatedUserData));
//     setUser(updatedUserData);
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout, updateUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);
// ----------------------------------------------------------------------------------------
'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("JobportalUser");
    const storedUser = stored ? JSON.parse(stored) : null;

    if (session?.user) {
      setUser(storedUser || session.user);
    } else {
      setUser(storedUser || null);
    }
  }, [session]);

  const login = useCallback((userData) => {
    localStorage.setItem("JobportalUser", JSON.stringify(userData));
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("JobportalUser");
    setUser(null);
  }, []);

  const updateUser = useCallback((updatedUserData) => {
    localStorage.setItem("JobportalUser", JSON.stringify(updatedUserData));
    setUser(updatedUserData);
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
