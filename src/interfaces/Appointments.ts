export interface AgendaEntry {
  name: string;
  height: number;
  day: string;
}

export interface AgendaSchedule {
  [date: string]: AgendaEntry[];
}

export interface CalendarCountType {
  [date: string]: number;
}
