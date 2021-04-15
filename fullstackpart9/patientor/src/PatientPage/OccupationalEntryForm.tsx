import React from 'react';
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { Grid, Button, Label } from "semantic-ui-react";
import { OccupationalEntry } from '../types';
import { useStateValue } from '../state';

export type EntryFormValues = Omit<OccupationalEntry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const isDate = (params: any): boolean => {
    return Boolean(Date.parse(params));
};

const OccupationalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            initialValues={{
                type: "OccupationalHealthcare",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                employerName: "",
                sickLeave: {
                    startDate: "",
                    endDate: "",
                  }
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const badFormat = "Format of this field is incorrect";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }

                if (values.date.length > 0 && !isDate(values.date)) {
                    errors.date = badFormat;
                }
                if (values.sickLeave.startDate.length > 0 && !isDate(values.sickLeave.startDate)) {
                    errors.startDate = badFormat;
                }

                if (values.sickLeave.endDate.length > 0 && !isDate(values.sickLeave.endDate)) {
                    errors.endDate = badFormat;
                }

                if (!values.specialist) {
                    errors.specialist = requiredError;
                }

                if (!values.employerName) {
                    errors.employerName = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Employer name"
                            placeholder="Employer name"
                            name="employerName"
                            component={TextField}
                        />
                        <Label pointing='below'>Sick leave (Optional)</Label>
                        <Field
                            label="Start date"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.startDate"
                            component={TextField}
                        />

                        <Field
                            label="End date"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.endDate"
                            component={TextField}
                        />

                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />

                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                  </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                  </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    )
}

export default OccupationalEntryForm;