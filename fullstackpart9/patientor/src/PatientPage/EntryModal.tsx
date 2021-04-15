import React, {useState} from 'react';
import { Button, Modal, Segment } from 'semantic-ui-react';
import { Entry } from '../types';
import HealthCheckForm, { EntryFormValues } from './HealthCheckForm'
import HospitalEntryForm from './HospitalForm';
import OccupationalEntryForm from './OccupationalEntryForm';

export type EntriesWithoutId = Omit<Entry, "id">;
interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntriesWithoutId) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [formType, setFormType] = useState("healthCheck");

  const Forms = () => {
    if (formType === "healthCheck") {
      return (
        <>
          <HealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
        </>
      )
    } else if (formType === "occupational") {
      return (
        <>
        <OccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </>
      )
    } else {
      return (
        <>
        <HospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
        </>
      )
    }
  }

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Button onClick={() => setFormType("healthCheck")}>Add Health Check entry</Button>
    <Button onClick={() => setFormType("occupational")}>Add Occupational entry</Button>
    <Button onClick={() => setFormType("hospital")}>Add Hospital entry</Button>

    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <Forms/>
    </Modal.Content>
  </Modal>
  )
};

export default AddEntryModal;
