import axios from 'axios';
import {AgendaSchedule} from '../interfaces/Appointments';

const backendUri = 'https://2ec4-177-249-161-15.ngrok-free.app';

export const httpApi = axios.create({
  baseURL: `${backendUri}/api`,
});

export const getCalendar = (): Promise<AgendaSchedule> =>
  httpApi.get<AgendaSchedule>('google/calendar').then(({data}) => {
    return data;
  });

// httpApi.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${readToken()}`;
//   return config;
// });
