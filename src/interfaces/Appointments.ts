export interface AgendaEntry {
  name: string;
  height: number;
  day: string;
  startDate: string;
  endDate: string;
}

export interface AgendaSchedule {
  [Date: string]: AgendaEntry[];
}

export interface CalendarCountType {
  [Date: string]: number;
}
export interface EventPayload {
  summary: string; // Optional
  description: string; // Optional
  start: string;
  end: string;
  email: string;
}
export interface EventGoogle {
  kind: 'calendar#event';
  id?: string; // Optional
  status?: string; // Optional
  htmlLink?: string; // Optional
  created?: Date; // Optional
  updated?: Date; // Optional
  summary: string; // Optional
  description?: string; // Optional
  location?: string; // Optional
  colorId?: string; // Optional
  creator?: {
    id?: string; // Optional
    email?: string; // Optional
    displayName?: string; // Optional
    self?: boolean; // Optional
  };
  organizer?: {
    id?: string; // Optional
    email?: string; // Optional
    displayName?: string; // Optional
    self?: boolean; // Optional
  };
  start: {
    date?: Date; // Optional
    dateTime: Date;
    timeZone: string; // Optional
  };
  end: {
    date?: Date; // Optional
    dateTime: Date;
    timeZone: string; // Optional
  };
  endTimeUnspecified?: boolean; // Optional
  recurrence?: [string]; // Optional
  recurringEventId?: string; // Optional
  originalStartTime?: {
    date?: Date; // Optional
    dateTime: Date;
    timeZone?: string; // Optional
  };
  transparency?: string; // Optional
  visibility?: string; // Optional
  iCalUID?: string; // Optional
  sequence?: number; // Optional
  attendees?: [
    {
      id?: string; // Optional
      email: string;
      displayName?: string; // Optional
      organizer?: boolean; // Optional
      self?: boolean; // Optional
      resource?: boolean; // Optional
      optional?: boolean; // Optional
      responseStatus?: string; // Optional
      comment?: string; // Optional
      additionalGuests?: number; // Optional
    },
  ];
  attendeesOmitted?: boolean; // Optional
  extendedProperties?: {
    private?: {
      [key: string]: string;
    };
    shared?: {
      [key: string]: string;
    };
  }; // Optional
  hangoutLink?: string; // Optional
  conferenceData?: {
    createRequest?: {
      requestId?: string; // Optional
      conferenceSolutionKey?: {
        type?: string; // Optional
      };
      status?: {
        statusCode?: string; // Optional
      };
    };
    entryPoints?: [
      {
        entryPointType?: string; // Optional
        uri?: string; // Optional
        label?: string; // Optional
        pin?: string; // Optional
        accessCode?: string; // Optional
        meetingCode?: string; // Optional
        passcode?: string; // Optional
        password?: string; // Optional
      },
    ];
    conferenceSolution?: {
      key?: {
        type?: string; // Optional
      };
      name?: string; // Optional
      iconUri?: string; // Optional
    };
    conferenceId?: string; // Optional
    signature?: string; // Optional
    notes?: string; // Optional
  }; // Optional
  gadget?: {
    type?: string; // Optional
    title?: string; // Optional
    link?: string; // Optional
    iconLink?: string; // Optional
    width?: number; // Optional
    height?: number; // Optional
    display?: string; // Optional
    preferences?: {
      [key: string]: string;
    }; // Optional
  }; // Optional
  anyoneCanAddSelf?: boolean; // Optional
  guestsCanInviteOthers?: boolean; // Optional
  guestsCanModify?: boolean; // Optional
  guestsCanSeeOtherGuests?: boolean; // Optional
  privateCopy?: boolean; // Optional
  locked?: boolean; // Optional
  reminders?: {
    useDefault?: boolean; // Optional
    overrides?: [
      {
        method?: string;
        minutes?: number;
      },
    ];
  }; // Optional
  source?: {
    url?: string; // Optional
    title?: string; // Optional
  }; // Optional
}

export interface AgendaGoogleResponse {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: Date;
  updated: Date;
  creator: Creator;
  organizer: Creator;
  start: End;
  end: End;
  iCalUID: string;
  sequence: number;
  reminders: Reminders;
  eventType: string;
  summary?: string;
  description?: string;
}

export interface Creator {
  email: string;
  self: boolean;
}

export interface End {
  dateTime: Date;
  timeZone: string;
}

export interface Reminders {
  useDefault: boolean;
}

export interface SelectedHour {
  timeDisplay: string;
  isHourChange?: boolean;
  index: number;
  toDisplay?: boolean;
}
