/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useEffect} from 'react';
import {AgendaSchedule, CalendarCountType} from '../interfaces/Appointments';
import {DateData, MarkedDates} from 'react-native-calendars';
// import {timeToString} from '../helpers/Date';
import {globalColors} from '../theme/AppStyles';
import {getCalendar} from '../api/http';

type AgendaContextProps = {
  agenda: AgendaSchedule;
  dayCounter: CalendarCountType;
  markedDates: MarkedDates;
  loadAgenda: (date: DateData) => Promise<void>;
  today: DateData;
};

//Mock Citas

export const AgendaContext = createContext({} as AgendaContextProps);

export const AgendaProvider = ({children}: any) => {
  const today: DateData = {
    dateString: new Date().toISOString().split('T')[0], // Inserta la fecha actual en formato "yyyy-MM-dd"
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    timestamp: new Date().getTime(),
    year: new Date().getFullYear(),
  };
  const [agenda, setAgenda] = useState<AgendaSchedule>({});
  const [dayCounter, setDayCounter] = useState<CalendarCountType>({});
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const countDates = () => {
    if (agenda) {
      const contador: CalendarCountType = {};
      for (const date in agenda) {
        contador[date] = agenda[date].length;
      }
      setDayCounter(contador);
    }
  };

  useEffect(() => {
    countDates();
  }, [agenda]);

  useEffect(() => {
    handleCount();
  }, [dayCounter]);
  useEffect(() => {
    loadAgenda(today);
  }, []);

  const loadAgenda = async (d: DateData) => {
    if (d.dateString in agenda) {
      console.log('not Reload');
      return;
    }
    console.log('Reloaded Calendar');
    try {
      const agendaResponse = await getCalendar();
      setAgenda(agendaResponse);
      console.log(agendaResponse);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCount = () => {
    const updatedDate: MarkedDates = {};
    for (const date in dayCounter) {
      const eventCount = dayCounter[date];
      if (eventCount < 4) {
        updatedDate[date] = {
          marked: true,
          selected: true,
          selectedColor: globalColors.bulletFree,
        };
      } else if (eventCount < 7) {
        updatedDate[date] = {
          marked: true,
          selected: true,
          selectedColor: globalColors.golden,
        };
      } else {
        updatedDate[date] = {
          marked: true,
          selected: true,
          selectedColor: globalColors.bulletOcupied,
        };
      }
    }
    setMarkedDates(updatedDate);
  };

  return (
    <AgendaContext.Provider
      value={{
        dayCounter,
        markedDates,
        agenda,
        loadAgenda,
        today,
      }}>
      {children}
    </AgendaContext.Provider>
  );
};
