// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
  entries: Entry[];
}

interface BaseEntry {
  id: string,
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating | number;
}

export interface OccupationalEntry extends BaseEntry {
  type: "OccupationalHealthcare",
  employerName: string,
  sickLeave?: {
    startDate: string
    endDate: string,
  }
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: {
    date: string,
    criteria: string,
  }
}

export interface DiagnoseEntry {
  code: string,
  name: string,
  latin?: string;
}

export type Entry =
  | HealthCheckEntry
  | OccupationalEntry
  | HospitalEntry;

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;

export type toNewPatient = Omit<PatientEntry, "id">;

export type newEntry = Omit<Entry, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}