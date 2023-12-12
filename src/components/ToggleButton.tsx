import './ToggleButton.css'
import React, { FC }from 'react';

interface ToggleButtonProps{
  isCompleteScreen: boolean;
  setIsCompleteScreen: (value: boolean) => void;
  bool: boolean;
  btnName: string;
}

const ToggleButton: FC<ToggleButtonProps> = (props) => {
  return (
    <button className={`btnTodo ${!props.isCompleteScreen && 'active'}`} onClick={()=>props.setIsCompleteScreen(props.bool)}>{props.btnName}</button>

  );
};

export default ToggleButton;



