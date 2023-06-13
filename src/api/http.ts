import axios from 'axios';
import {AgendaSchedule} from '../interfaces/Appointments';

const backendUri = 'https://1a1a-177-249-160-162.ngrok-free.app';

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
