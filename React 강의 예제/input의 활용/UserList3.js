import React from 'react'

function User({ userdiv, onRemove,onToggle }){
    const {username, email, id, active} = userdiv;
    return(
        <div>
            <b style={{
                color: active ? 'green': 'black',
                cursor: 'pointer'
            }}
            onClick={()=> onToggle(id)}
            >
            {username}</b> &nbsp;
            <span>{email}</span>
            <button onClick={()=> onRemove(id)}>삭제</button>
        </div>
    );
}

function UserList({users, onRemove, onToggle}){
    return(
        <div>
            {
                users.map(user => (
                <User 
                userdiv={user} 
                key={user.id}
                onRemove={onRemove}
                onToggle={onToggle}
                />))
            }
        </div>
    );

}

export default UserList;