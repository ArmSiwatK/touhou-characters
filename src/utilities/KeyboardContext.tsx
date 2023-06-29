/*
<--------------- Imports --------------->
*/

import React, { createContext, useContext, useState } from "react";
import { KeyboardContextType } from "./utilities";

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
