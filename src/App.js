import React, {useState} from "react";
import "./App.css";
import { Tabs, Tab, Button, Table } from "react-bootstrap";
import AccessModel from "./components/AccessModel/AccessModel";
import HRUModel from "./components/HRUModel/HRUModel";
import AdeptModel from "./components/AdeptModel/AdeptModel";
import ModelContainer from "./components/ModelContainer/ModelContainer";
import MandatModel from './components/MandatModel/MandatModel';
import {data as dataAM, objects as objectsAM}  from './constants/AMconstants';
import {data as dataHRU, objects as objectsHRU} from './constants/HRUconstants';
import {data as dataA50, objects as objectsA50} from './constants/A50constants';
import {data as dataMandat, objects as objectsMandat} from './constants/MandatConstant';

function App() {
  const Amatrix = [[5, 6, 3, 0], [10, 2, 12, 10], [4, 3, 2, 7], [8, 6, 2, 5]];
  const Bmatrix = [[5, 10, 4, 8], [6, 2, 3, 6], [3, 12, 2, 2], [0, 10, 7, 5]]
  const [tableBody, setTableBody] = useState([]);

  const iterPros = () => {
    let stratgsA = [0, 1, 0, 0];
    let stratgsB = [0, 1, 0, 0];
    let Bcum = [10, 2, 12, 10];
    let Acum = [6, 2, 3, 6];
    let newArray = [[1, 'A2', 10, 2, 12, 10, 'B2', 6, 2, 3, 6, 2, 6, 4 ]];

    for (let i = 0; i < 9999; i++) {
      let Aindex = Acum.indexOf(Math.max(...Acum));
      stratgsA[Aindex]++;
      Bcum = Bcum.map((el, i) => el + Amatrix[Aindex][i])
      
      let Bindex = Bcum.indexOf(Math.min(...Bcum));
      stratgsB[Bindex]++;
      Acum = Acum.map((el, i) => el + Bmatrix[Bindex][i])

      let [minN, maxN] = [Math.min(...Bcum)/(i+2), Math.max(...Acum)/(i+2)]

      newArray.push([i+2, 'A'+(Aindex+1), ...Bcum, 'B'+(Bindex+1), ...Acum, minN, maxN, (minN+maxN)/2]);
    }
    console.log(stratgsA.map(el=>el/300));
    console.log(stratgsB.map(el=>el/300));    
    setTableBody(newArray);

  }

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
        <Tab eventKey="mandat" title="Мандатная модель">
          <ModelContainer UsersData={dataMandat} ObjectData={objectsMandat}>
            <MandatModel/>
          </ModelContainer>
        </Tab>
      </Tabs>
      {/*<p>Размерность матрицы:</p>
      <input type='number'/> X <input type='number'/>
      <br/>
      <Table striped hover bordered>
        <tbody>
          <tr>
            <td>5</td>
            <td>6</td>
            <td>3</td>
            <td>0</td>
          </tr>
          <tr>
            <td>10</td>
            <td>2</td>
            <td>12</td>
            <td>10</td>
          </tr>
          <tr>
            <td>4</td>
            <td>3</td>
            <td>2</td>
            <td>7</td>
          </tr>
          <tr>
            <td>8</td>
            <td>6</td>
            <td>2</td>
            <td>5</td>
          </tr>
        </tbody>
      </Table>
      <br/>
      <Button onClick={iterPros}>Расчитать</Button>
      <br/>
      x1 = 0,056410256 &emsp; y1 = 0<br/>
      x2 = 0,053846154 &emsp; y2 = 0,141025641<br/>
      x3 = 0&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;y3 = 0,051282051<br/>
      x4 = 0,092307692 &emsp; y4 = 0,01025641<br/>
      F(x) = 0,202564103 &nbsp; Z(y) = 0,202564103<br/><br/>
      Цена игры = 4,936708861<br/>
      Вероятности:<br/>
      p1 = 0,278481013 &emsp; q1 = 0<br/>
      p2 = 0,265822785 &emsp; q2 = 0,696202532<br/>
      p3 = 0&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;q3 = 0,253164557<br/>
      p4 = 0,455696203 &emsp; q4 = 0,050632911<br/>
      <Table striped hover bordered>
        <thead>
          <tr>
            <th>k</th>
            <th>Ai</th>
            <th>B1</th>
            <th>B2</th>
            <th>B3</th>
            <th>B4</th>
            <th>Bj</th>
            <th>A1</th>
            <th>A2</th>
            <th>A3</th>
            <th>A4</th>
            <th>Vmin</th>
            <th>Vmax</th>
            <th>Vs</th>
          </tr>
        </thead>
        <tbody>
          {tableBody.map((row, i) => (
            <tr key={i}>
              {row.map((el, j) => (
                <td key={j}>{el}</td>
              ))}
            </tr>
          ))}
        </tbody>
              </Table>*/}
    </div>
  );
}

export default App;
