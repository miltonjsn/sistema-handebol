import React, { createContext, useState, useContext } from "react";

// Cria o contexto
const TextSizeContext = createContext();

// Hook personalizado para acessar o contexto
export const useTextSize = () => {
  return useContext(TextSizeContext);
};

// Componente que envolve a aplicação e fornece o contexto
export const GlobalState = ({ children }) => {
  const [textSize, setTextSize] = useState("medium"); // medium por padrão

  const increaseTextSize = () => {
    setTextSize("large");
  };

  const decreaseTextSize = () => {
    setTextSize("small");
  };

  return (
    <TextSizeContext.Provider value={{ textSize, increaseTextSize, decreaseTextSize }}>
      {children}
    </TextSizeContext.Provider>
  );
};
