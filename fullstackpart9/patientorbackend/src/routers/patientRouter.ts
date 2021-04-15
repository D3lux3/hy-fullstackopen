import express from 'express';
import patientService from '../services/patientService';
import {toNewPatientEntry, toNewEntry} from '../utils';

const router = express.Router();

router.get('/', (_req, res) =>{
    res.send(patientService.getNonSensitivePatientEntries());
});

router.get('/:id', (req, res) => {
    const patient = patientService.getPatientById(req.params.id);
    if (patient) {
        res.send(patient);
    } else {
        res.status(400).send("Couldn't find any patients on given ID.");
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const patient = patientService.getPatientById(req.params.id);
        if (patient) {
            const entry = toNewEntry(req.body);
            if (entry) {
                const editedPatient = patientService.addNewEntry(patient, entry);
                res.json(editedPatient);
            } else {
                res.status(400).send("Given entry is invalid.");
            }
        } else {
            res.status(400).send("Couldn't find any patients on given ID.");
        }
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }
});


router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatient = patientService.addNewPatient(newPatientEntry);
        res.json(addedPatient);
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(e.message);
    }

});

export default router;