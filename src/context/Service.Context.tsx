import React, {createContext} from 'react';

type Service = {
  nameEvent: string;
  start: string;
  end: string;
  description: string;
  clientName: string;
  email: string;
  duration: number;
};

type AgendaContextProps = {
  services: Service;
};

export const ServiceContext = createContext({} as AgendaContextProps);

export const ServiceProvider = ({children}: any) => {
  const services: Service = {
    nameEvent: 'Corte Evento',
    start: '00:00',
    end: '00:00',
    description: '00:00',
    clientName: 'Isaac',
    email: 'vazisaac9508@gmail.com',
    duration: 1.5,
  };
  return (
    <ServiceContext.Provider value={{services}}>
      {children}
    </ServiceContext.Provider>
  );
};
