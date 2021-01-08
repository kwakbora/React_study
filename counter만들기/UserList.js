import React from 'react'

function User({ userdiv }){
    return(
        <div>
            <b>{userdiv.username}</b> <span>{userdiv.email}</span>
        </div>
    );
}

function UserList(){
    const users = [
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
    ]

    return(
        <div>
         {  /* <User userdiv={users[0]} />
            <User userdiv={users[1]} />
            <User userdiv={users[2]} /> */ }

            {
                users.map(user => (<User userdiv={user} key={user.id} />))
               //key 라는 prop이 있어야 한다. 각 원소들이 가지고 있는 값이 ID이기 때문에 id로 설정해준다.
               //고유값이 없을때는 (userdiv,index) 를 활용하기도 한다. (성능은 좋지않음 권장하지 않음) 
            }
        </div>
    );
}

export default UserList;
