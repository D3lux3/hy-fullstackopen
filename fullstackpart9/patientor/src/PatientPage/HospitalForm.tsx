import React from 'react';
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { Grid, Button, Label } from "semantic-ui-react";
import { HospitalEntry } from '../types';
import { useStateValue } from '../state';

export type EntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const isDate = (params: any): boolean => {
    return Boolean(Date.parse(params));
};

const HospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            initialValues={{
                type: "Hospital",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                discharge: {
                    date: "",
                    criteria: "",
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

                if (!values.discharge.criteria) {
                    errors.discharge = requiredError;
                }

                if (values.date.length > 0 && !isDate(values.date)) {
                    errors.date = badFormat;
                }

              if (values.discharge.date.length > 0 && !isDate(values.discharge.date)) {
                    errors.discharge = badFormat;
                } 

                if (!values.specialist) {
                    errors.specialist = requiredError;
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
                        <Label pointing='below'>Discharge</Label>
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="discharge.date"
                            component={TextField}
                        />

                        <Field
                            label="Criteria"
                            placeholder="Criteria"
                            name="discharge.criteria"
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

export default HospitalEntryForm;