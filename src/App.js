import React from "react";
import "./App.css";
import { Tabs, Tab } from "react-bootstrap";
import AccessModel from "./components/AccessModel/AccessModel";
import HRUModel from "./components/HRUModel/HRUModel";
import AdeptModel from "./components/AdeptModel/AdeptModel";
import ModelContainer from "./components/ModelContainer/ModelContainer";
import {data as dataAM}  from './constants/AMconstants';
import {data as dataHRU} from './constants/HRUconstants';

function App() {
  return (
    <div className="App">
      <Tabs defaultActiveKey="accessModel">
        <Tab eventKey="accessModel" title="Матрица доступа">
          <ModelContainer UsersData={dataAM}>
            <AccessModel />
          </ModelContainer>
        </Tab>
        <Tab eventKey="HRY" title="Модель харрисона-руззо-ульмана">
          <ModelContainer UsersData={dataHRU}>
            <HRUModel />
          </ModelContainer>
        </Tab>
        <Tab eventKey="adept" title="Адепт-50">
          <ModelContainer>
            <AdeptModel />
          </ModelContainer>
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
