import React, {createContext, useState, useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import {getServicesList} from '../api/http';
import {serviceInfoType} from '../components/services/types';

const statuses = ['empty', 'fulfilled', 'error', 'updating'];

type serviceListContextProps = {
  servicesList: serviceInfoType[];
  setNewStatus: (newStatus: (typeof statuses)[number]) => any;
};
export const ServiceListContext = createContext({} as serviceListContextProps);

export const ServiceListProvider = ({children}: any) => {
  const [servicesList, setServicesList] = useState<serviceInfoType[]>([]);
  const [status, setStatus] = useState<(typeof statuses)[number]>('empty');

  useEffect(() => {
    if (status !== 'fulfilled') {
      listServices();
    }
  }, [status]);

  const setNewStatus = (newStatus: (typeof statuses)[number]) => {
    setStatus(newStatus);
  };
  const listServices = async () => {
    try {
      const services = await getServicesList();
      const sanitizedServices = services.map(service => ({
        ...service,
        duration:
          typeof service.duration === 'number'
            ? service.duration
            : Number(service.duration),
        price:
          typeof service.price === 'number'
            ? service.price
            : Number(service.price),
      }));
      setStatus('fulfilled');
      setServicesList(sanitizedServices);
    } catch (error) {
      console.log(error);
      ToastAndroid.showWithGravityAndOffset(
        'Error obteniendo servicios',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        210,
      );
      setStatus('error');
    }
  };

  return (
    <ServiceListContext.Provider value={{servicesList, setNewStatus}}>
      {children}
    </ServiceListContext.Provider>
  );
};
