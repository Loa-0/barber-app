import React, {createContext, useState} from 'react';

type Service = {
  id: string;
  title: string;
  image: {
    uri: any;
  };
  duration: number;
  price: number;
};
type SelectedService = {
  services: Service[];
  totalCost: number;
  totalDuration: number; // .5- 1 -1.5
  start: string;
  end: string;
  nameEvent: string;
  description: string;
  clientName: string;
  email: string;
};

type AgendaContextProps = {
  servicesFinal: SelectedService;
  updateTotalCost: (servicesParam: SelectedService) => void;
  setInitialServices: () => void;
};

export const ServiceContext = createContext({} as AgendaContextProps);
export const ServiceProvider = ({children}: any) => {
  const initialServicesVal = {
    services: [],
    totalCost: 0,
    totalDuration: 0,
    start: '00:00',
    end: '00:00',
    nameEvent: '',
    description: '',
    clientName: '',
    email: '',
  };
  const [servicesFinal, setServices] =
    useState<SelectedService>(initialServicesVal);

  const updateTotalCost = (payload: SelectedService) => {
    if (payload.services.length > 0) {
      let totalCost: number = 0;
      let totalDuration: number = 0;
      payload.services.map(serv => {
        totalDuration += serv.duration;
        totalCost += serv.price;
      });
      setServices({
        ...payload,
        totalCost,
        totalDuration,
      });
    }
  };
  const setInitialServices = () => {
    setServices({...initialServicesVal});
  };

  return (
    <ServiceContext.Provider
      value={{servicesFinal, updateTotalCost, setInitialServices}}>
      {children}
    </ServiceContext.Provider>
  );
};
