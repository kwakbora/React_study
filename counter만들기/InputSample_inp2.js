import React,{useState,useRef} from 'react';

function CounterTest(){

    const [inputs,setInputs] = useState({
        inpname : '',
        nickname : '',
    });
    const {inpname,nickname} = inputs;
    const nameInput = useRef();

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
        
        nameInput.current.focus(); //초기화시 포커스 이동(current 는 해당 DOM 선택 )
    }

    return(
        <div>
            <input name="inpname" type="text" onChange={onChange} placeholder="이름" ref={nameInput}  value={inpname} />
            <input name="nickname" type="text" onChange={onChange} placeholder="닉네임" value={nickname} />
            <button onClick={onReset}>초기화</button>
            <p>값 : {inpname} ({nickname})</p>
        </div>
    );

}

export default CounterTest;
