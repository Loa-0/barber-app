/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useEffect, useCallback} from 'react';
import {AgendaSchedule, CalendarCountType} from '../interfaces/Appointments';
import {DateData, MarkedDates} from 'react-native-calendars';
import {timeToString} from '../helpers/Date';
import {globalColors} from '../theme/AppStyles';

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
    const contador: CalendarCountType = {};
    for (const date in agenda) {
      contador[date] = agenda[date].length;
    }
    setDayCounter(contador);
  };
  const mockAgenda = useCallback((day: DateData): Promise<AgendaSchedule> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newItems: AgendaSchedule = {};
        for (let i = -5; i < 10; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);
          if (!newItems[strTime]) {
            newItems[strTime] = [];
            const numItems = Math.floor(Math.random() * 8 + 1);
            for (let j = 0; j < numItems; j++) {
              newItems[strTime].push({
                name: 'Item for ' + strTime + ' #' + j,
                height: 60,
                day: strTime,
              });
            }
          }
        }
        resolve(newItems);
      }, 1000);
    });
  }, []);

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
    const agendaResponse = await mockAgenda(today);
    setAgenda(agendaResponse);
    console.log(agendaResponse);
  };
  const handleCount = () => {
    const updatedDate: MarkedDates = {};
    for (const date in dayCounter) {
      const eventCount = dayCounter[date];
      if (eventCount < 4) {
        updatedDate[date] = {
          marked: true,
          selected: true,
          selectedColor: '#72a276',
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
          selectedColor: '#800000',
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
