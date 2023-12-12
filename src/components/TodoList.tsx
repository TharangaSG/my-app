import React, { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './TodoList.css'; // Import your custom CSS file

interface TodoListProps {
  title: String;
  description: String;
}

const TodoList: FC<TodoListProps> = (props) => {
  return (
    <div className="accordion fixed-width-accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <strong>{props.title}</strong>
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body">
            <p>{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;









/*import React, { FC } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './TodoList.css'
  
interface TodoListProps{
    title: String;
    description: String;
}

const TodoList: FC<TodoListProps> = (props) => {
    return(
        <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingOne">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        {props.title}
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <p>{props.description}</p>
      </div>
    </div>
  </div>
  
    </div>
  

    )
}

export default TodoList;*/