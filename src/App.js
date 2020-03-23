import React from "react";
import "./App.css";
import { Tabs, Tab } from "react-bootstrap";
import AccessModel from "./components/AccessModel/AccessModel";
import HRUModel from "./components/HRUModel/HRUModel";
import AdeptModel from "./components/AdeptModel/AdeptModel";
import ModelContainer from "./components/ModelContainer/ModelContainer";
import {data as dataAM, objects as objectsAM}  from './constants/AMconstants';
import {data as dataHRU, objects as objectsHRU} from './constants/HRUconstants';
import {data as dataA50, objects as objectsA50} from './constants/A50constants';

function App() {
  return (
    <div className="App">
      <Tabs defaultActiveKey="accessModel">
        <Tab eventKey="accessModel" title="Матрица доступа">
          <ModelContainer UsersData={dataAM} ObjectsData={objectsAM}>
            <AccessModel />
          </ModelContainer>
        </Tab>
        <Tab eventKey="HRY" title="Модель харрисона-руззо-ульмана">
          <ModelContainer UsersData={dataHRU} ObjectsData={objectsHRU}>
            <HRUModel />
          </ModelContainer>
        </Tab>
        <Tab eventKey="adept" title="Адепт-50">
          <ModelContainer UsersData={dataA50} ObjectsData={objectsA50}>
            <AdeptModel />
          </ModelContainer>
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
