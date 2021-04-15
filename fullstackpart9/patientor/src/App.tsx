import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { setPatientList, useStateValue, setDiagnoses } from "./state";
import { DiagnoseEntry, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientPage from "./PatientPage";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {

    const fetchAllDiagnoses = async () => {
      try {
        const {data: diagnoseData} = await axios.get<DiagnoseEntry[]>(`${apiBaseUrl}/diagnoses`);
        console.log(diagnoseData);
        dispatch(setDiagnoses(diagnoseData));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    fetchAllDiagnoses();
    fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/:id">
            <PatientPage />
            </Route>
          </Switch>
          <Switch>
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>

        </Container>
      </Router>
    </div>
  );
};

export default App;
