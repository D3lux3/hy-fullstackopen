import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';
import EntryDetails from '../components/EntryDetails';
import { apiBaseUrl } from '../constants';
import { updatePatient, useStateValue } from "../state";
import { Patient, Entry } from '../types';
import HealthCheckForm, { EntryFormValues } from './HealthCheckForm';
import AddEntryModal from './EntryModal';

const PatientPage = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id: patientId } = useParams<{ id: string }>();
    const patientEntry = patients[patientId];
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    useEffect(() => {
        if (!patientEntry || !patientEntry.ssn) {
            const fetchPatientById = async () => {
                try {
                    const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`);
                    dispatch(updatePatient(patient));
                } catch (e) {
                    console.error(e);
                }
            };
            fetchPatientById();
        }

    }, [patientEntry, patients]);


    type submitEntry = Omit<Entry, "id">; 

    const submitNewEntry = async (values: submitEntry) => {
        try {
          const { data: newPatient } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${patientId}/entries/`,
            values
          );
          dispatch(updatePatient(newPatient));
          closeModal();
        } catch (e) {
          console.error(e.response.data);
        }
      };
    

    if (patientEntry) {
        return (
            <>
                <div>
                    <Header as='h2'>{patientEntry.name}</Header>
                    <p>ssn: {patientEntry.ssn}</p>
                    <p>occupation: {patientEntry.occupation}</p>
                </div>

                <div>
                    <br />
                    <div>
                        {patientEntry.entries?.map(entry => {
                             return <EntryDetails entry={entry}/ >;
                        })}
                    </div>
                </div>

                <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
              />

              <Button onClick={() => openModal()}>Add New Entry</Button>

            </>
        );
    } else {
        return (
            <h1>Loading...</h1>
        );
    }
};

export default PatientPage;