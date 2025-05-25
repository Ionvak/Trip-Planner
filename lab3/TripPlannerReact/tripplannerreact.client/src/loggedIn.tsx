import React, { createContext } from "react";

// Define the context type
type LoggedinContextType = {
    loggedIn: string;
    setLoggedIn: React.Dispatch<React.SetStateAction<string>>;
};

// Create the context with a default value
export const LoggedinContext = createContext<LoggedinContextType>({
    loggedIn: "",
    setLoggedIn: () => { },
});