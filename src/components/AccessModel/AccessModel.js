import React, { useState } from "react";
import { objects } from "../../constants/AMconstants";
import { Table, Button, Modal, ButtonGroup } from "react-bootstrap";

const AccessModel = ({ username, UsersData }) => {

  return username==="admin" ? (
    <AccessAdminPanel UsersData={UsersData}/>
  ) : (
    <AccessUserPanel username={username} UsersData={UsersData}/>
  );
};

const AccessAdminPanel = ({UsersData}) => {
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
          {UsersData.map((el, i) => (
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

const AccessUserPanel = ({username, UsersData}) => {
  const [show, setShow] = useState(false);
  const [displayData, displayDataHandler] = useState('')
  const users = UsersData.map(user => user.username).filter(user=>user!=="admin");

  const OpenModal = (objIndex, right) => {
    console.log(`index: ${objIndex}  /  right: ${right}`);
    const deleg = objects[objIndex].rights[users.indexOf(username)].includes(right);
    let dataString = `Пользователь "${username}" запрашивает разрешение на ${right==='r' ? 'чтение' : right === 'w' ? 'запись' : 'выполнение'} объекта "${objects[objIndex].name}".ДОСТУП ${deleg ? 'РАЗРЕШЕН': 'ЗАПРЕЩЕН'}!`
    displayDataHandler(dataString);
    setShow(true);

  }

  return(
    <React.Fragment>
      <div>
        {objects.map((obj, i) => <ObjectButton key={i} objIndex={i} OpenModal={OpenModal} obj={obj} />)}
      </div>
      {/*<div>
        {objects.map((obj, i) => <Button variant="secondary" size="lg" block key={i} onClick={buttonOnClick}>{obj.name}</Button>)}

      </div>*/}
      <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>{displayData}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShow(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

const ObjectButton = ({obj, objIndex, OpenModal}) => {
  const [showSub, showSubHandle] = useState(false);

  const onBtnClick = (e) => {
    OpenModal(objIndex, e.target.value);
  }
  return(
    <div>
      <Button className="object_btn" variant="secondary" size="lg" block onClick={()=>showSubHandle(!showSub)}>{obj.name}</Button>
      {showSub &&<ButtonGroup>
        <Button variant="primary" value="r" onClick={onBtnClick}>Read</Button>
        <Button variant="primary" value="w" onClick={onBtnClick}>Write</Button>
        <Button variant="primary" value="e" onClick={onBtnClick}>Execute</Button>
      </ButtonGroup>}
    </div>
  )
}

export default AccessModel;
