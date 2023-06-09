import axios from 'axios';
import {AgendaSchedule, EventPayload} from '../interfaces/Appointments';
import {UserInterface, UserLoginInterface} from '../interfaces/user';
import {serviceInfoType} from '../components/services/types';

const backendUri = 'https://backend-barber-production.up.railway.app';

export const httpApi = axios.create({
  baseURL: `${backendUri}/api`,
});

export const getCalendar = (): Promise<AgendaSchedule> =>
  httpApi.get<AgendaSchedule>('/google/calendar').then(({data}) => {
    return data;
  });
export const getCalendarAuth = (): Promise<AgendaSchedule> =>
  httpApi.get<AgendaSchedule>('/google/').then(({data}) => {
    return data;
  });
export const AdminLogin = (
  userData: UserInterface,
): Promise<UserLoginInterface> =>
  httpApi
    .post<UserLoginInterface>('/auth/loginBarber', {...userData})
    .then(({data}) => {
      return data;
    });

export const getServicesList = (): Promise<serviceInfoType[]> =>
  httpApi.get<serviceInfoType[]>('/services/').then(({data}) => {
    return data;
  });

export const deleteService = (
  id: number | string,
): Promise<serviceInfoType[]> =>
  httpApi.delete<serviceInfoType[]>(`/services/${id}`).then(({data}) => {
    return data;
  });

export const createService = (payload: FormData): Promise<serviceInfoType> =>
  httpApi
    .post<serviceInfoType>('/services/', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    })
    .then(({data}) => {
      return data;
    });
export const updateService = (
  payload: FormData,
  id: string | number,
): Promise<serviceInfoType> =>
  httpApi
    .patch<serviceInfoType>(`/services/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    })
    .then(({data}) => {
      return data;
    });
export const insertEvent = (payload: EventPayload): Promise<JSON> =>
  httpApi.post<JSON>('/google/insert', payload).then(({data}) => {
    return data;
  });

// httpApi.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${readToken()}`;
//   return config;
// });
