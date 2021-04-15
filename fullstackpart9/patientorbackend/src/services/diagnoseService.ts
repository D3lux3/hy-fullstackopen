import { DiagnoseEntry } from '../types';
import diagnoses from '../data/diagnoses';

const getAllDiagnoses = (): Array<DiagnoseEntry> => {
    return diagnoses;
};

export {
    getAllDiagnoses
};