
import React, { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './InputBox.css';

interface InputBoxProps {
  text: string;
  newInputBox: string;
  setnewInputBox: (value: string) => void;
  placeholder: string;
}

const InputBox: FC<InputBoxProps> = (props) => {
  return (
    <div className="todo-input-item">
      <label>{props.text}</label>
      <input
        type="text"
        value={props.newInputBox}
        onChange={(e) => props.setnewInputBox(e.target.value)}
        placeholder={props.placeholder}
        className="form-control" 
      />
    </div>
  );
};

export default InputBox;









/*import './InputBox.css'
import React, { FC } from 'react'; 

interface InputBoxProps{
  text: string;
  newInputBox: string;
  setnewInputBox: (value: string) => void;
  placeholder: string;
}

const InputBox: FC<InputBoxProps> = (props) => {
  return (
    <div className="todo-input-item">
      <label>{props.text}</label>
      <input type="text" value={props.newInputBox} onChange={(e)=>props.setnewInputBox(e.target.value)} placeholder={props.placeholder} />
    </div>
  );
};

export default InputBox;
*/



