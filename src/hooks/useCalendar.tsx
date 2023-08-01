/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useEffect} from 'react';
import {
  AgendaSchedule,
  CalendarCountType,
  SelectedHour,
} from '../interfaces/Appointments';

// type MarkedDates = {
//   [key: string]: MarkingProps;
// }
import {DateData, MarkedDates} from 'react-native-calendars';
import {globalColors} from '../theme/AppStyles';
import {getCalendar} from '../api/http';

type AgendaContextProps = {
  agenda: AgendaSchedule;
  dayCounter: CalendarCountType;
  markedDates: MarkedDates;
  loadAgenda: (date: DateData, reload?: boolean) => Promise<void>;
  today: DateData;
  loadedEvents: SelectedEvent;
  internetConnected: boolean;
};

interface SelectedEvent {
  [date: string]: SelectedHour[];
}

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

  const [loadedEvents, setLoadedEvents] = useState<SelectedEvent>({});
  const [internetConnected, setInternetConnected] = useState<boolean>(true);
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
    constructAgendaDaily();
  }, [agenda]);

  useEffect(() => {
    handleCount();
  }, [dayCounter]);

  useEffect(() => {
    loadAgenda(today);
  }, []);

  const loadAgenda = async (d: DateData, reload = false) => {
    if (d.dateString in agenda && !reload) {
      console.log('Not Reload');
      setInternetConnected(true);
      return;
    }
    try {
      console.log('Reloaded Calendar');
      const agendaResponse = await getCalendar();
      setAgenda({...agendaResponse});
      setInternetConnected(true);
    } catch (error) {
      setInternetConnected(false);
      console.log(error);
    }
  };
  const constructAgendaDaily = () => {
    if (agenda) {
      const raw: SelectedEvent = {};
      Object.keys(agenda).forEach(date => {
        const events = agenda[date];
        const eventsByDate: SelectedHour[] = [];
        events.forEach(event => {
          const [startHour, startMinute] = event.startDate.split(':');
          const startTotalMinutes =
            parseInt(startHour, 10) * 60 + parseInt(startMinute, 10);
          const [endHour, endMinute] = event.endDate.split(':');
          const endTotalMinutes =
            parseInt(endHour, 10) * 60 + parseInt(endMinute, 10);
          const differenceMinutes = endTotalMinutes - startTotalMinutes;
          const differenceHours = Math.floor(differenceMinutes / 60);
          for (let i = 0; i < differenceHours * 2; i++) {
            const minutesToAdd = i * 30;
            const totalMinutes = startTotalMinutes + minutesToAdd;
            const hour = Math.floor(totalMinutes / 60);
            const minute = totalMinutes % 60;
            const timeDisplay = `${hour.toString().padStart(2, '0')}:${minute
              .toString()
              .padStart(2, '0')}`;

            const selectedHour = {
              timeDisplay: timeDisplay,
              index: i / 2, // índice ajustado para ser decimal (0.5, 1, 1.5, ...)
            };
            eventsByDate.push(selectedHour);
          }
          raw[date] = eventsByDate;
        });
      });
      setLoadedEvents(raw);
    }
  };
  useEffect(() => {
    loadAgenda(today);
  }, [internetConnected]);
  const handleCount = () => {
    const updatedDate: MarkedDates = {};
    for (const date in dayCounter) {
      const eventCount = dayCounter[date];
      if (eventCount < 2) {
        updatedDate[date] = {
          marked: true,
          selected: true,
          selectedColor: globalColors.bulletFree,
        };
      } else if (eventCount < 4) {
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
        loadedEvents,
        today,
        internetConnected,
      }}>
      {children}
    </AgendaContext.Provider>
  );
};
