import React from 'react';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import { useStateValue } from '../state';
import { Entry } from '../types';



const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    const [{ diagnoses },] = useStateValue();

    const Occupational = () => (
        <>
            <Header as='h3' icon='hospital'>
                <i className="hospital icon"></i>
                <div>
                    {entry.date}
                </div>
            </Header>
            <i key={entry.id}> {entry.description}</i>
            <ul>
                {entry.diagnosisCodes?.map((diag, i) => (<li key={i}>{diag} {diagnoses[diag].name}</li>))}
            </ul>
        </>
    );

    const Hospital = () => (
        <>
            <Header as='h3' icon='doctor'>
                <i className="doctor icon"></i>
                <div>
                    {entry.date}
                </div>
            </Header>
            <i key={entry.id}> {entry.description}</i>
            <ul>
                {entry.diagnosisCodes?.map((diag, i) => (<li key={i}>{diag} {diagnoses[diag].name}</li>))}
            </ul>
        </>
    );

    const HealthCheck = () => (
        <>
            <Header as='h3' icon='stethoscope'>
                <i className="stethoscope icon"></i>
                <div>
                    {entry.date}
                </div>
            </Header>
            <i key={entry.id}> {entry.description}</i>
            <ul>
                {entry.diagnosisCodes?.map((diag, i) => (<li key={i}>{diag} {diagnoses[diag].name}</li>))}
            </ul>
        </>
    );

    const assertNever: React.FC<{ value: never }> = ({ value }): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    switch (entry.type) {
        case "OccupationalHealthcare":
            return <Occupational />;
        case "Hospital":
            return <Hospital />;
        case "HealthCheck":
            return <HealthCheck />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;