/* eslint-disable react/destructuring-assignment */
import React, { createContext, useState } from 'react';

export const mainContext = createContext("");

const Context = (props) => {  // Receive props to access children
    const [loginData, setLoginData] = useState({});

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <mainContext.Provider value={{ loginData, setLoginData }}>
            {props.children}  {/* Render props.children here */}
        </mainContext.Provider>
    );
}

export default Context;
