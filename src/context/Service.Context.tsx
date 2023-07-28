import React, {createContext, useState} from 'react';
import {serviceInfoType} from '../components/services/types';

type SelectedService = {
  services: serviceInfoType[];
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
  updateTotalCost: (
    payload: Pick<SelectedService, 'services'> & Partial<SelectedService>,
  ) => void;
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

  const updateTotalCost = (
    payload: Pick<SelectedService, 'services'> & Partial<SelectedService>,
  ) => {
    if (payload.services!.length > 0) {
      let totalCost: number = 0;
      let totalDuration: number = 0;
      payload.services!.map(serv => {
        totalDuration += Number(serv.duration);
        totalCost += Number(serv.price);
      });
      setServices({
        totalCost,
        totalDuration,
        services: payload.services,
        start: payload.start ?? '00:00',
        end: payload.end ?? '00:00',
        nameEvent: payload.nameEvent ?? '',
        description: payload.description ?? '',
        clientName: payload.clientName ?? '',
        email: payload.email ?? '',
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
