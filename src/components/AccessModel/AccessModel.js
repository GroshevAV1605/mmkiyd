import React, { useState, useEffect } from "react";
import { objects, data } from "../../constants";
import { Table, Button } from "react-bootstrap";

const AccessModel = ({ username }) => {

  return username=="admin" ? (
    <AccessAdminPanel/>
  ) : (
    <AccessUserPanel username={username}/>
  );
};

const AccessAdminPanel = () => {
  const [rights, rightHandle] = useState(objects.map(el=>el.rights));

  const rightsOnChange = e => {
    const x = e.target.parentElement.cellIndex - 1;
    const y = e.target.parentElement.parentElement.rowIndex - 1;
    const value = e.target.value;
    const rightsCopy = rights.map(el => el.slice());
    const re = /^r?w?e?$/;
    if (value.match(re)) {
      objects[y].rights[x] = value;
      rightsCopy[y][x] = value;
    }
    console.log(x + " " + y + ": " + value);
    console.log(objects);
    rightHandle(rightsCopy);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          {data.map((el, i) => (
            <th key={i}>{el.username}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {objects.map((el, i) => (
          <tr key={i}>
            <td>{el.name}</td>
            {el.rights.map((right, j) => (
              <td key={j}>
                <input
                  type="text"
                  value={objects[i].rights[j]}
                  onChange={rightsOnChange}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const AccessUserPanel = ({username}) => {
  return(
    <div>
      {objects.map(obj => <Button variant="secondary" size="lg" block>{obj.name}</Button>)}
    </div>
  );
};

export default AccessModel;
