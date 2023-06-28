import {DateData} from 'react-native-calendars';

type ExportUseDate = {
  nextMonth: DateData;
  prevMonth: DateData;
};

const useDates = (): ExportUseDate => {
  const today = new Date();
  const getNextMonth = (): DateData => {
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
    const nextMont: DateData = {
      year: nextMonth.getFullYear(),
      month: nextMonth.getMonth() + 1, // Sumamos 1 ya que los meses en JavaScript son indexados desde 0
      day: nextMonth.getDate(),
      timestamp: nextMonth.getTime(),
      dateString: nextMonth.toDateString(),
    };
    return nextMont;
  };
  const getPrevMonth = (): DateData => {
    const prevMonth = new Date(today.getFullYear(), today.getMonth() + 1);
    const nextMont: DateData = {
      year: prevMonth.getFullYear(),
      month: prevMonth.getMonth() + 1, // Sumamos 1 ya que los meses en JavaScript son indexados desde 0
      day: prevMonth.getDate(),
      timestamp: prevMonth.getTime(),
      dateString: prevMonth.toDateString(),
    };
    return nextMont;
  };
  const nextMonth = getNextMonth();
  const prevMonth = getPrevMonth();

  return {nextMonth, prevMonth};
};

export default useDates;
