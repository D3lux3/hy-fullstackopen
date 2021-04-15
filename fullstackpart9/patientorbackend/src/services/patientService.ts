import { PatientEntry, NonSensitivePatientEntry, toNewPatient, newEntry, Entry } from '../types';
import { v1 } from 'uuid';
import patientEntries from '../data/patients';

const getAllPatientEntries = (): PatientEntry[] => {
    return patientEntries;
};

const getNonSensitivePatientEntries = (): NonSensitivePatientEntry[] => {
    return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addNewEntry = (patient: PatientEntry, entry: newEntry): PatientEntry => {
    const newEntry = {
        id: v1(),
        ...entry
    };
    patient?.entries.push(newEntry as Entry);
    patientEntries.map(p =>
        p.id === patient.id
            ? patient
            : p
    );
    return patient;
};

const getPatientById = (id: string): PatientEntry | undefined => {
    return patientEntries.find(patient => patient.id === id);
};

const addNewPatient = (toBeAdded: toNewPatient): PatientEntry => {
    const newPatient = {
        id: v1(),
        ...toBeAdded,
    };
    patientEntries.push(newPatient);
    return newPatient;
};

export default {
    addNewPatient,
    getAllPatientEntries,
    getNonSensitivePatientEntries,
    getPatientById,
    addNewEntry
};