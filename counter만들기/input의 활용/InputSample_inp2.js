import React, {useState} from 'react';

function InputSample(){ 
    const [inputs, setInputs] = useState({
        name : '',
        nickname: '',
    });

    const {name , nickname} = inputs;
    const onChange = (e)=>{
        const { name, value } = e.target;

        //console.log(e.target.name);
        //console.log(e.target.value);
        setInputs ({ 
            ...inputs, // 객체 상태 업데이트:기존값을 먼저 설정을 해줘야 한다.
            [name]:value, //다른 키값을 쓰겠다 []
        });

        //setInputs[name] = value;

    }

    const onReset = () => {
        setInputs({
            name : '',
            nickname: '',
        });
    }

    return(
        <div>
            <input name="name" placeholder="이름" onChange={onChange} value={name} />
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname} />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>

    )

}

export default InputSample;
