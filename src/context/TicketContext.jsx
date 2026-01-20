import { createContext } from 'react';

const TicketContext = createContext();

export function TicketProvider({ children }) {
  return <TicketContext.Provider>{children}</TicketContext.Provider>;
}
