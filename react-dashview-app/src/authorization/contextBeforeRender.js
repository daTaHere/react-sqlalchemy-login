import React, { createContext} from 'react';
import { ContextAuthorizer } from './authorizeContext';

// Create the context
const BeforeRenderContext = createContext();

// Custom hook to access the context
const useBeforeRender = () => React.useContext(BeforeRenderContext);

// AuthorizeProvider component
const BeforeRenderProvider = ({ children }) => {
    const { CheckUserStatus, isAuthorized } = ContextAuthorizer();
        CheckUserStatus();
  return (
    <BeforeRenderContext.Provider value={{}}>
      {children}
    </BeforeRenderContext.Provider>
  );
};

export { useBeforeRender, BeforeRenderProvider };