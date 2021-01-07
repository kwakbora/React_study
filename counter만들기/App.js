import React from 'react';
import Hello from './Hello';
import './App.css';

function App() {
  const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'red',
    fontSize: 24,
    padding: '1rem'

  }
  return (
    <>
    {/* 주석은 중괄호를 활용한다 */}
      <Hello //이런식으로 주석을 사용할 수 있다 
      />
      <Hello />
      <Hello />
      <div className="gray-box" style={style}>{name}</div>
    </>
  );
}

export default App;
