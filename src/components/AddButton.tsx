
import React, { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './AddButton.css';

interface AddButtonProps {
  handleAddTodo: () => void;
}

const AddButton: FC<AddButtonProps> = (props) => {
  return (
    <div className="todo-input-item">
      <button
        type="button"
        onClick={(e) => props.handleAddTodo()}
        className="btn btn-success" 
      >
        Add
      </button>
    </div>
  );
};

export default AddButton;









