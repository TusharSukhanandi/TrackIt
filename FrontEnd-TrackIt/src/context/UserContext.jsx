import {createContext, useContext, useState } from "react";

const userContext = createContext()

export const useUserContext = () => useContext(userContext)

export const UserProvider = ({children}) => {

const [user, setUser] = useState(JSON.parse(localStorage.getItem("TrackIt-User")) || null)

return (
    <userContext.Provider value={{user, setUser}}>
        {children}
    </userContext.Provider>
)
}