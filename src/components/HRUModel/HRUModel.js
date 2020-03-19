import React, {useState} from "react";
import {Table, Modal, Button, ButtonGroup, InputGroup, FormControl} from 'react-bootstrap';
import {objects} from '../../constants/HRUconstants';

const HRUModel = ({ username, UsersData }) => {
  return username==="admin" ? (
    <HRUAdminPanel UsersData={UsersData}/>
  ) : (
    <HRUUserPanel username={username} UsersData={UsersData}/>
  );
};

const HRUAdminPanel = ({UsersData}) => {
  
  return (
    <Table striped hover bordered>
      <thead>
        <tr>
          <th>#</th>
          {UsersData.map((el, i)=><th key={i}>{el.username}</th>)}
        </tr>
      </thead>
      <tbody>
        {objects.map((el, i)=>(
          <tr key={i}>
            <td>{el.name}</td>
            {el.rights.map((right, j) => (
              <td key={j}>
                {right}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const HRUUserPanel = ({username, UsersData}) => {
  const [show, setShow] = useState(false);
  const [displayData, displayDataHandler] = useState('')
  const [command, setCommand] = useState('');
  const [error, setError] = useState('');
  const users = UsersData.map(user => user.username).filter(user=>user!=="admin");

  const OpenModal = (objIndex, right) => {
    console.log(`index: ${objIndex}  /  right: ${right}`);
    const deleg = objects[objIndex].rights[users.indexOf(username)].includes(right);
    let dataString = `Пользователь "${username}" запрашивает разрешение на ${right==='r' ? 'чтение' : right === 'w' ? 'запись' : 'выполнение'} объекта "${objects[objIndex].name}".ДОСТУП ${deleg ? 'РАЗРЕШЕН': 'ЗАПРЕЩЕН'}!`
    displayDataHandler(dataString);
    setShow(true);
  }

  const addSub = () =>{
    console.log('addSub');   
  }

  const delSub = () =>{
    console.log('delSub');
  }

  const addObj = () =>{
    console.log('addObj');
  }

  const delObj = () =>{
    console.log('delObj');
  }

  const addRight = () =>{
    console.log('addRight');
  }

  const delRight = () =>{
    console.log('delRight');
  }


  const ParseCommand = () =>{
    let pars = command.split(' ');
    switch (pars[0]){
      case 'addSub':
        addSub(pars);
        break;
      case 'addObj':
        addObj(pars);
        break;
      case 'addRight':
        addRight(pars);
        break;
      case 'delSub':
        delSub(pars);
        break;
      case 'delObj':
        delObj(pars);
        break;
      case 'delRight':
        delRight(pars);
        break;
      default:
        setError('Данной комманды не существует')
    }
  }

  const EnterCommandHandle = e =>{
    if(e.key === "Enter"){
      e.preventDefault();
      ParseCommand();
      setCommand('');
    }
  }

  return(
    <React.Fragment>
      <div>
        {objects.map((obj, i) => <ObjectButton key={i} objIndex={i} OpenModal={OpenModal} obj={obj} />)}
      </div>
      <InputGroup className="input_group">
        <InputGroup.Prepend>
          <InputGroup.Text>Введите команду</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl onKeyPress={EnterCommandHandle} value={command} onChange={(e)=> {
          setCommand(e.target.value);
          setError('')}} />
      </InputGroup>
      <p className="error_label">{error}</p>
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

export default HRUModel;
