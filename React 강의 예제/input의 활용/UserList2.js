import React from 'react'

function User({ userdiv }){
    return(
        <div>
            <b>{userdiv.username}</b> <span>{userdiv.email}</span>
        </div>
    );
}

function UserList({users}){

    return(
        <div>
            {
                users.map(user => (<User userdiv={user} key={user.id} />))
               //key 라는 prop이 있어야 한다. 각 원소들이 가지고 있는 값이 ID이기 때문에 id로 설정해준다.
               //고유값이 없을때는 (userdiv,index) 를 활용하기도 한다. (성능은 좋지않음 권장하지 않음) 
            }
        </div>
    );

}

export default UserList;