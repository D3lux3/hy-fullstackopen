import React from 'react';
import { Field, Formik, Form } from "formik";
import { TextField, SelectField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { Grid, Button } from "semantic-ui-react";
import { Entry, HealthCheckEntry } from '../types';
import { useStateValue } from '../state';

export type EntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const isDate = (params: any): boolean => {
    return Boolean(Date.parse(params));
};

const HealthCheckForm: React.FC<Props> = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            initialValues={{
                type: "HealthCheck",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                healthCheckRating: "0"
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
                        <Field
                        label="Health Check Rating"
                        name="healthCheckRating"
                        component={NumberField}
                        min={0}
                        max={3}
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

export default HealthCheckForm;