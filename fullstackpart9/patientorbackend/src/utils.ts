/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, HospitalEntry, newEntry, toNewPatient, OccupationalEntry, HealthCheckEntry, HealthCheckRating, DiagnoseEntry } from "./types";



export const toNewEntry = (object: any): newEntry => {
    const entry = {
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseDiagnosticCodes(object.diagnosisCodes),
    };
    switch (object.type) {
        case "Hospital":
            return {
                type: "Hospital",
                ...entry,
                discharge: {
                    date: parseDate(object.discharge.date),
                    criteria: parseString(object.discharge.criteria)
                },
            } as HospitalEntry;
        case "OccupationalHealthcare":
            return {
                type: "OccupationalHealthcare",
                ...entry,
                employerName: parseString(object.employerName),
                sickLeave: {
                    startDate: parseDate(object?.sickLeave.startDate),
                    endDate: parseDate(object?.sickLeave.endDate),
                }
            } as OccupationalEntry;
        case "HealthCheck":
            return {
                type: "HealthCheck",
                ...entry,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            } as HealthCheckEntry;
        default:
            throw new Error(`Given type is invalid: ${object.type}`);
    }
};

const parseDiagnosticCodes = (param: any): Array<DiagnoseEntry['code']> => {
    if (Array.isArray(param)) {
        return param.map(s => parseString(s));
    }
    return [];
};

const parseHealthCheckRating = (object: any): HealthCheckRating | number => {
    if (!isNaN(+object) && object >= 0 && object <= 3) {
        return object as number;
    }
    if (!object || !isString(object) || !isHeathCheckRating(object)) {
        throw new Error(`Given Health check rating is invalid ${object}`);
    }
    return object;
};

const isHeathCheckRating = (params: any): params is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(params);
};

export const toNewPatientEntry = (params: any): toNewPatient => {
    return {
        name: parseString(params.name),
        ssn: parseString(params.ssn),
        gender: parseGender(params.gender),
        dateOfBirth: parseDate(params.dateOfBirth),
        occupation: parseString(params.occupation),
        entries: [],
    };
};


const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Given date is invalid: ${date}`);
    }
    return date;
};

const isDate = (params: any): boolean => {
    return Boolean(Date.parse(params));
};

const parseString = (params: any): string => {
    if (!params || !isString(params)) {
        throw new Error(`Given string is invalid: ${params}`);
    }
    return params;
};

const parseGender = (gender: any): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error(`Given gender is invalid: ${gender}`);
    }
    return gender;
};

const isGender = (params: any): params is Gender => {
    return Object.values(Gender).includes(params);
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};
