import React, { useState } from "react";
import { Table, Button, Modal, ButtonGroup } from "react-bootstrap";

const AccessModel = ({ username, UsersData, ObjectsData }) => {

  return username==="admin" ? (
    <AccessAdminPanel UsersData={UsersData} ObjectsData={ObjectsData}/>
  ) : (
    <AccessUserPanel username={username} UsersData={UsersData} ObjectsData={ObjectsData}/>
  );
};

const AccessAdminPanel = ({UsersData, ObjectsData}) => {
  const [rights, rightHandle] = useState(ObjectsData.map(el=>el.rights));

  const rightsOnChange = e => {
    const x = e.target.parentElement.cellIndex - 1;
    const y = e.target.parentElement.parentElement.rowIndex - 1;
    const value = e.target.value;
    const rightsCopy = rights.map(el => el.slice());
    const re = /^r?w?e?$/;
    if (value.match(re)) {
      ObjectsData[y].rights[x] = value;
      rightsCopy[y][x] = value;
    }
    console.log(x + " " + y + ": " + value);
    console.log(ObjectsData);
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
        {ObjectsData.map((el, i) => (
          <tr key={i}>
            <td>{el.name}</td>
            {el.rights.map((right, j) => (
              <td key={j}>
                <input
                  type="text"
                  value={ObjectsData[i].rights[j]}
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

const AccessUserPanel = ({username, UsersData, ObjectsData}) => {
  const [show, setShow] = useState(false);
  const [displayData, displayDataHandler] = useState('')
  const users = UsersData.map(user => user.username).filter(user=>user!=="admin");

  const OpenModal = (objIndex, right) => {
    console.log(`index: ${objIndex}  /  right: ${right}`);
    const deleg = ObjectsData[objIndex].rights[users.indexOf(username)].includes(right);
    let dataString = `Пользователь "${username}" запрашивает разрешение на ${right==='r' ? 'чтение' : right === 'w' ? 'запись' : 'выполнение'} объекта "${ObjectsData[objIndex].name}".ДОСТУП ${deleg ? 'РАЗРЕШЕН': 'ЗАПРЕЩЕН'}!`
    displayDataHandler(dataString);
    setShow(true);

  }

  return(
    <React.Fragment>
      <div>
        {ObjectsData.map((obj, i) => <ObjectButton key={i} objIndex={i} OpenModal={OpenModal} obj={obj} />)}
      </div>
      {/*<div>
        {ObjectsData.map((obj, i) => <Button variant="secondary" size="lg" block key={i} onClick={buttonOnClick}>{obj.name}</Button>)}

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
      <Modal show={true} >
        <Modal.Header closeButton>
          <Modal.Title>Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>Доступ на запись объекта "object4" разрешен. Права: "y" -> "c"</Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>setShow(false)}>
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
      </ButtonGroup>}
    </div>
  )
}

export default AccessModel;
