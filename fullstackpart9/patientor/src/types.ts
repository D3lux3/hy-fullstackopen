export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}


interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: string;
}

export interface OccupationalEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: {
    startDate: string
    endDate: string,
  }
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
      date: string;
      criteria: string;
  };
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export type Entry = 
| HospitalEntry
| OccupationalEntry
| HealthCheckEntry;
