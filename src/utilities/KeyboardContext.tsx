/*
<--------------- Imports and Interface --------------->
*/

import React, { createContext, useContext, useState } from "react";

interface KeyboardContextType {
  disableKeyBindings: boolean;
  setDisableKeyBindings: (disable: boolean) => void;
  children?: React.ReactNode;
}

/*
<--------------- Context --------------->
*/

const KeyboardContext = createContext<KeyboardContextType>({
  disableKeyBindings: false,
  setDisableKeyBindings: () => {},
});

/*
<--------------- Exports --------------->
*/

export const useKeyboardContext = () => useContext(KeyboardContext);

export const KeyboardProvider: React.FC<KeyboardContextType> = ({
  children,
}) => {
  const [disableKeyBindings, setDisableKeyBindings] = useState(false);

  return (
    <KeyboardContext.Provider
      value={{ disableKeyBindings, setDisableKeyBindings }}
    >
      {children}
    </KeyboardContext.Provider>
  );
};
