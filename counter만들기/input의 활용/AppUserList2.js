import React,{useRef, useState} from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList2';

function APP(){
  const [inputs, setInputs] = useState({
    username:'',
    email:'',
  });

  const {username, email} = inputs;
  const onChange = (e)=>{
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name] : value
    });
  }
  const [users,setUsers] = useState( [
    {
        id: 1,
        username : 'bora',
        email: 'bora@naver.com'

    },
    {
        id: 2,
        username : 'test',
        email: 'test@naver.com'  
    },
    {
        id: 3,
        username : 'liz',
        email: 'liz@naver.com'  
    }
]);



const nextId = useRef(4);

const onCreate = ()=>{
  const user = {
    id : nextId.current,
    ...inputs
  }
  //방법1  setUsers({...users,user}); //기존항목 유지하면서 추가한다
  //방법2
  setUsers(users.concat(user)); //배열의 합친다 (push를 사용하면 업데이트가 되지 않아 concat을 사용한다) 
  setInputs({
    username:'',
    email:''
  });
  nextId.current += 1; //4다음 5로 표현됨

} //이벤트를 호출한다고 가정

  return(
    <div>
      <CreateUser 
        username={username} 
        email={email} 
        onChange={onChange} 
        onCreate={onCreate} 
      />
      <UserList users={users} />
    </div>
  );
}

export default APP;
