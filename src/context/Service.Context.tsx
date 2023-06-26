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
  start: Date;
  end: Date;
  nameEvent: string;
  description: string;
  clientName: string;
  email: string;
};

type AgendaContextProps = {
  servicesFinal: SelectedService;
  // setSelectedServices: (service: Service) => void;
  updateTotalCost: (servicesParam: Service[]) => void;
};

export const ServiceContext = createContext({} as AgendaContextProps);
export const ServiceProvider = ({children}: any) => {
  const [servicesFinal, setServices] = useState<SelectedService>({
    services: [],
    totalCost: 0,
    totalDuration: 0,
    start: new Date(),
    end: new Date(),
    nameEvent: '',
    description: '',
    clientName: '',
    email: '',
  });
  // useEffect(() => {
  //   updateTotalCost(servicesSelected);
  // }, [servicesSelected]);

  const updateTotalCost = (servicesParam: Service[]) => {
    if (servicesParam.length > 0) {
      let totalCost: number = 0;
      let totalDuration: number = 0;
      servicesParam.map(serv => {
        totalDuration += serv.duration;
        totalCost += serv.price;
      });
      setServices({
        services: servicesParam,
        totalCost,
        totalDuration,
        start: new Date(),
        end: new Date(),
        nameEvent: 'Servcio para',
        description: 'Pending... ',
        clientName: 'Isaac',
        email: 'vazisaac9508@gmail.com',
      });
    }
  };
  // const setSelectedServices = (service: Service) => {
  //   setSelectedServices1(prev => [...prev, service]);
  // };

  return (
    <ServiceContext.Provider value={{servicesFinal, updateTotalCost}}>
      {children}
    </ServiceContext.Provider>
  );
};
