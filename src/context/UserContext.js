// "use client";
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useSession } from "next-auth/react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const { data: session } = useSession(); // 👈 Getting session from NextAuth
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (session?.user) {
//       localStorage.setItem("JobportalUser", JSON.stringify(session.user));
//       setUser(session.user);
//     } else {
//       const storedUser = localStorage.getItem("JobportalUser");
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
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

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);
'use client';
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session?.user) {
      const storedUser = JSON.parse(localStorage.getItem("JobportalUser")) || session.user;
      setUser(storedUser);
    } else {
      const storedUser = localStorage.getItem("JobportalUser");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, [session]);

  const login = (userData) => {
    localStorage.setItem("JobportalUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("JobportalUser");
    setUser(null);
  };

  const updateUser = (updatedUserData) => {
    localStorage.setItem("JobportalUser", JSON.stringify(updatedUserData));
    setUser(updatedUserData);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
