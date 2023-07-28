import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AgendaSchedule, EventPayload} from '../interfaces/Appointments';
import {
  UserInterface,
  UserLoginInterface,
  UserUpdateInterface,
} from '../interfaces/user';
import {serviceInfoType} from '../components/services/types';
import Config from 'react-native-config';

const backendUri = Config.API_URI ?? 'http://192.168.1.103:8080';
// const backendUri = 'http://192.168.1.103:8080';

export const httpApi = axios.create({
  baseURL: `${backendUri}/api`,
});

httpApi.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers['x-token'] = token;
      }
    } catch (error) {
      console.log('Error al obtener el token:', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
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

export const EditAdmin = (
  userData: UserUpdateInterface,
  userName: string,
): Promise<UserLoginInterface> =>
  httpApi
    .put<UserLoginInterface>(`/admin/${userName}`, {...userData})
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
