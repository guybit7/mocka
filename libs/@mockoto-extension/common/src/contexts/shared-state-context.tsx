import React, { createContext, ReactNode, useContext, useState, useMemo } from 'react';
import { SharedState, defaultSharedState } from '../interfaces';

type SharedStateContextType = {
  state: SharedState;
  setState: React.Dispatch<React.SetStateAction<SharedState>>;
};

const SharedStateContext = createContext<SharedStateContextType | undefined>(undefined);

export const SharedStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SharedState>(defaultSharedState);

  const contextValue = useMemo(() => ({ state, setState }), [state]);

  return <SharedStateContext.Provider value={contextValue}>{children}</SharedStateContext.Provider>;
};

export const useSharedState = (): SharedStateContextType => {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return context;
};
