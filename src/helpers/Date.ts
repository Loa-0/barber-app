import {LocaleConfig} from 'react-native-calendars';

export const timeToString = (time: number) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

export const displayDate = (fechaString: string): string => {
  const [anio, mes, dia] = fechaString.split('-');
  const mesIndex = parseInt(mes, 10) - 1;
  const nombreMes = LocaleConfig.locales.es.monthNames[mesIndex];
  const nombreDiaIndex = new Date(
    parseInt(anio, 10),
    mesIndex,
    parseInt(dia, 10),
  ).getDay();
  const nombreDia = LocaleConfig.locales.es.dayNames[nombreDiaIndex];
  return `${nombreDia}, ${parseInt(dia, 10)} de ${nombreMes}`;
};

export const mostrarHora = (timeDecimal: number): string => {
  const h = Math.floor(timeDecimal);
  const m = (timeDecimal % 1) * 60;
  const timeStr = m === 0 ? `${h}h` : `${h}h${m}m`;
  return timeStr;
};
