import axios from 'axios';
import {AgendaSchedule} from '../interfaces/Appointments';

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

// httpApi.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${readToken()}`;
//   return config;
// });
