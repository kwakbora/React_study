import React,{useState} from 'react';

function InputSample(){

    const [inputs,setInputs] = useState({
        inpname : '',
        nickname : '',
    });
    const {inpname,nickname} = inputs;

    const onChange = (e)=>{
        const {name , value} = e.target // e.target.name

        /*const nextInputs = {
            ...inputs,
            [name]:value

        };
        setInputs(nextInputs);*/
        setInputs({
            ...inputs,
            [name]:value

        });

    }
    const onReset = ()=>{
        setInputs({
            inpname : '',
            nickname : '',
        });
    }

    return(
        <div>
            <input name="inpname" type="text" onChange={onChange} placeholder="이름"  value={inpname} />
            <input name="nickname" type="text" onChange={onChange} placeholder="닉네임" value={nickname} />
            <button onClick={onReset}>초기화</button>
            <p>값 : {inpname} ({nickname})</p>
        </div>
    );

}

export default InputSample;
