import React,{useRef, useState} from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList3';

function countActiveUsers(user){
  console.log('활성 사용자 수 세는중');
  return user.filter( rm => rm.active).length
}

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
        email: 'bora@naver.com',
        active : true,

    },
    {
        id: 2,
        username : 'test',
        email: 'test@naver.com' ,
        active : false,
    },
    {
        id: 3,
        username : 'liz',
        email: 'liz@naver.com',
        active : false, 
    }
]);



const nextId = useRef(4);

const onCreate = ()=>{
  const user = {
    id : nextId.current,
    ...inputs
  }
  //방법1  setUsers({...users,user}); //기존항목 유지하면서 새로운 배열 추가
  //방법2
  setUsers(users.concat(user)); //배열의 합친다 (push를 사용하면 업데이트가 되지 않아 concat을 사용한다)
  setInputs({
    username:'',
    email:''
  });
    console.log(nextId.current); //4 현재 값 추출
    nextId.current += 1 //값을 바꾸고 싶을때 (값이 바뀐다고 컴포넌트가 리랜더링 되진 않는다) 알기위함

} //이벤트를 호출한다고 가정

const onRemove = id =>{
  setUsers(users.filter(ss => ss.id !== id) );
 //특정 조건을 만족하는 값들만 따로 추출하여 새로운 배열을 만든다. id 값과 같지 않은 배열만 빼고 나머지를 추출한다.
  console.log(id);
};

const onToggle = id =>{
    setUsers(users.map(
      dd => dd.id === id 
      ? {...dd, active: !dd.active} //active 가 false가 됨 (true 기준)
      : dd
      // 전체 배열을 업데이트 하면서 새로운 배열을 만든다.
    ));
}
//const count = countActiveUsers(user);
// 위에 처럼 하면 input 값을 바꿀때마다 countActiveUsers 가 작동한다. 성능 최적화를 위해 useMemo를 쓴다
const count = useMemo(() => countActiveUsers(user),[user]);
  
  return(
    <div>
      <CreateUser 
        username={username} 
        email={email} 
        onChange={onChange} 
        onCreate={onCreate} 
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수 : {count}</div>
    </div>
  );
}

export default APP;
