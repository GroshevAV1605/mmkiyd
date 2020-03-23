import React, {useState} from "react";
import {Table, Modal, Button, ButtonGroup, InputGroup, FormControl} from 'react-bootstrap';

const HRUModel = ({ username, UsersData, ObjectsData, isLoginChange }) => {
  return username==="admin" ? (
    <HRUAdminPanel UsersData={UsersData} ObjectsData={ObjectsData}/>
  ) : (
    <HRUUserPanel username={username} UsersData={UsersData} ObjectsData={ObjectsData} isLoginChange={isLoginChange}/>
  );
};

const HRUAdminPanel = ({UsersData, ObjectsData}) => {
  console.log(ObjectsData);
  
  return (
    <Table striped hover bordered>
      <thead>
        <tr>
          <th>#</th>
          {UsersData.map((el, i)=><th key={i}>{el.username}</th>)}
        </tr>
      </thead>
      <tbody>
        {ObjectsData.map((el, i)=>(
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

const HRUUserPanel = ({username, UsersData, ObjectsData, isLoginChange}) => {
  const [show, setShow] = useState(false);
  const [displayData, displayDataHandler] = useState('')
  const [command, setCommand] = useState('');
  const [error, setError] = useState('');
  const users = UsersData.map(user => user.username).filter(user=>user!=="admin");

  const OpenModal = (objIndex, right) => {
    console.log(`index: ${objIndex}  /  right: ${right}`);
    const deleg = ObjectsData[objIndex].rights[users.indexOf(username)].includes(right);
    let dataString = `Пользователь "${username}" запрашивает разрешение на ${right==='r' ? 'чтение' : right === 'w' ? 'запись' : 'выполнение'} объекта "${ObjectsData[objIndex].name}".ДОСТУП ${deleg ? 'РАЗРЕШЕН': 'ЗАПРЕЩЕН'}!`
    displayDataHandler(dataString);
    setShow(true);
  }

  const delSub = (pars) =>{
    if(pars.length !== 2){
      setError('Ошибка команды:  delSub <Имя субъекта>');
      return
    }
    let name = pars[1];
    console.log('delSub ' + name);

    if(name!==username){
      setError(`Нет прав на удаление пользователя "${name}"`)
      return;
    }
    let indexDel = UsersData.map(user=>user.username).indexOf(name);
    UsersData.splice(indexDel, 1);
    ObjectsData.forEach(obj=>{
      obj.rights.splice(indexDel, 1);
    })
    isLoginChange(false);
  }

  const addObj = (pars) =>{
    if (pars.length !== 2){
      setError('Ошибка команды:  addObj <Имя объекта>')
    }
    let name = pars[1];
    console.log('addObj ' + name);
    if(ObjectsData.some(obj=> obj.name===name)){
      setError(`Объект с названием ${name} уже сущсетвует`)
      return;
    }
    ObjectsData.push({
      name,
      rights: UsersData.map(user=> user.username===username? "orwe" : "")
    })
  }

  const delObj = (pars) =>{
    if (pars.length !== 2){
      setError('Ошибка команды:  addObj <Имя объекта>')
    }
    let name = pars[1];
    console.log('addObj ' + name);
    if(!ObjectsData.some(obj=> obj.name===name)){
      setError(`Объекта с названием ${name} не сущсетвует`)
      return;
    }
    let objIndex = ObjectsData.map(obj=> obj.name).indexOf(name);
    let curSubIndex = UsersData.map(usr=>usr.username).indexOf(username);
    if(!ObjectsData[objIndex].rights[curSubIndex].includes('o')){
      setError(`Нет прав на удаление объекта "${name}"`);
      return;
    }

    ObjectsData.splice(objIndex, 1);

    console.log('delObj');
  }

  const addRight = (pars) =>{
    if(pars.length !== 4){
      setError('Ошибка команды:  addRight <r,w,e> <Имя субъекта> <Имя объекта>')
    }
    let [right, subName, objName] = [pars[1], pars[2], pars[3]];
    if(!right.match(/^r?w?e?$/)){
      setError('Некорректные права доступа (rwe)');
      return;
    }
    if(!UsersData.some(user=> user.username===subName)){
      setError(`Пользователя "${subName}" не существует`);
      return;
    }
    if(!ObjectsData.some(obj=> obj.name === objName)){
      setError(`Объекта "${objName}" не существует`);
      return;
    }
    let objIndex = ObjectsData.map(obj=>obj.name).indexOf(objName);
    let curSubIndex = UsersData.map(usr=>usr.username).indexOf(username);
    let subIndex = UsersData.map(usr=>usr.username).indexOf(subName);
    if(!ObjectsData[objIndex].rights[curSubIndex].includes('o')){
      setError(`Вы не можете изменять права на объект "${objName}" `);
      return;
    }
    let curRights = ObjectsData[objIndex].rights[subIndex];
    ObjectsData[objIndex].rights[subIndex] = "orwe".split("").filter(ch=> curRights.includes(ch) || right.includes(ch)).join("");

    console.log('addRight');
  }

  const delRight = (pars) =>{
    if(pars.length !== 4){
      setError('Ошибка команды:  delRight <r,w,e> <Имя субъекта> <Имя объекта>')
    }
    let [right, subName, objName] = [pars[1], pars[2], pars[3]];
    if(!right.match(/^r?w?e?$/)){
      setError('Некорректные права доступа (rwe)');
      return;
    }
    if(!UsersData.some(user=> user.username===subName)){
      setError(`Пользователя "${subName}" не существует`);
      return;
    }
    if(!ObjectsData.some(obj=> obj.name === objName)){
      setError(`Объекта "${objName}" не существует`);
      return;
    }
    let objIndex = ObjectsData.map(obj=>obj.name).indexOf(objName);
    let curSubIndex = UsersData.map(usr=>usr.username).indexOf(username);
    let subIndex = UsersData.map(usr=>usr.username).indexOf(subName);
    if(!ObjectsData[objIndex].rights[curSubIndex].includes('o')){
      setError(`Вы не можете изменять права на объект "${objName}" `);
      return;
    }

    let curRights = ObjectsData[objIndex].rights[subIndex];
    ObjectsData[objIndex].rights[subIndex] = "orwe".split("").filter(ch=> curRights.includes(ch) && !right.includes(ch)).join("");
    console.log('delRight');
  }


  const ParseCommand = () =>{
    let pars = command.split(' ');
    switch (pars[0]){
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
        {ObjectsData.map((obj, i) => <ObjectButton key={i} objIndex={i} OpenModal={OpenModal} obj={obj} />)}
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
