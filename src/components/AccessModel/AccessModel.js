import React, { useState, useEffect } from "react";
import { objects, data } from "../../constants";
import { Table, Button, Modal } from "react-bootstrap";

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
  const [show, setShow] = useState(false);


  const buttonOnClick = (e) => {
    setShow(true);
  }

  return(
    <React.Fragment>
      <div>
        {objects.map((obj, i) => <Button variant="secondary" size="lg" block key={i} onClick={buttonOnClick}>{obj.name}</Button>)}
      </div>
      <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Фыв йцу</Modal.Title>
        </Modal.Header>
        <Modal.Body>Info</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShow(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AccessModel;
