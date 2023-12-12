import React,{useState, useEffect, FC} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {AiOutlineDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'
import AddButton from './components/AddButton';
import InputBox from './components/InputBox';
import ToggleButton from './components/ToggleButton';
import axios from 'axios';
import TodoList from './components/TodoList';


interface todoItem{
  
  title: string;
  id: number;
  description: string;
  completedOn: string;
}

const App: FC = () => {
  const [isCompleteScreen, setIsCompleteScreen] = useState<boolean>(false);
  const [allTodos, setTodos] = useState<todoItem[]>([]);
  const [newInputBox, setnewInputBox] = useState<string>("");
  const [newDescription, setnewDescription] = useState<string>("");
  const [completedTodos, setCompletedTodos] = useState<todoItem[]>([]);

  const handleAddTodo = (): void => {
    const newTodoItem = {
      title:newInputBox,
      description:newDescription,
    }

    axios.post("http://localhost:8081/todos", newTodoItem)
    .then(response => {
      setTodos([...allTodos, response.data])
    })
    .catch(err => console.log(err))
   
  }
  
  const handleDeleteTodo = (id: number): void =>{
    axios.delete(`http://localhost:8081/todos/${id}`) 
    .then(response => {
      const reducedTodo = allTodos.filter((todo) => todo.id !== id);
      setTodos(reducedTodo);
    })
  }

  const handleCompletedDeleteTodo = (id: number): void => {
    
    const reducedCompletedTodos = completedTodos.filter((todo) => todo.id !== id);
  
    axios.delete(`http://localhost:8081/todos/${id}`)
      .then(response => {
        console.log("Todo deleted", response);
        setCompletedTodos(reducedCompletedTodos);
      })
      .catch(err => {
        console.error("Error deleting todo:", err);
      });
  };
  

  const handleComplete = (id: number, index: number): void => {
    let now = new Date();
    let completedOn = now.toString();
  
    axios.put(`http://localhost:8081/todos/${id}/completeOn`, { completedOn })
      .then(() => {
        const updatedAllTodos = [...allTodos];
        updatedAllTodos.splice(index, 1); // Remove the completed todo from allTodos
        
        setTodos(updatedAllTodos);
  
        
        const updatedIncompleteTodos = updatedAllTodos.filter((todo) => !todo.completedOn);  // Separate completed and incomplete todos
        setCompletedTodos((prevCompletedTodos) => [
          ...prevCompletedTodos,
          { ...allTodos[index], completedOn: completedOn }
        ]);
  
        localStorage.setItem('completedTodos', JSON.stringify(updatedIncompleteTodos));
      })
      .catch(err => console.error("Error completing todo:", err));
  };
  

useEffect(() => {
  axios.get("http://localhost:8081/todos")
    .then((response) => {
      const data = response.data;

      const incompleteTodos = data.filter((todo: todoItem) => !todo.completedOn);
      const completedTodos = data.filter((todo: todoItem) => todo.completedOn);

      setTodos(incompleteTodos);
      setCompletedTodos(completedTodos);
    })
    .catch(err => console.error("Error fetching todos:", err));
}, []);


      
  return (
    <div className="App">
      <h1> <span className="badge bg-secondary ">Todo List</span></h1>


      <div className = "todo-wrapper">
        <div className = "todo-input">
          <InputBox text="Title" newInputBox={newInputBox} setnewInputBox={setnewInputBox} placeholder="Give Task title"/>
          <InputBox text="Description" newInputBox={newDescription} setnewInputBox={setnewDescription} placeholder="Give task description"/>
          <AddButton handleAddTodo={handleAddTodo} />

        </div>

        <div className="btn-area">
          <ToggleButton isCompleteScreen={isCompleteScreen} setIsCompleteScreen={setIsCompleteScreen} bool={false} btnName="Todo" />
          <ToggleButton isCompleteScreen={!isCompleteScreen} setIsCompleteScreen={setIsCompleteScreen} bool={true} btnName="Completed" />
        </div>

        
        <div className='todo-list'>
        
          {isCompleteScreen===false && allTodos.map((item, index)=>{
            return(
              <div className='todo-list-item' key={index}>
                
                <div>
                  <TodoList title={item.title} description={item.description}/>
                </div>
                
                <div>
                  <AiOutlineDelete className='icon-dlt' onClick={()=>handleDeleteTodo(item.id)}/>
                  <BsCheckLg className='icon-check' onClick={()=>handleComplete(item.id, index)}/>
                </div> 
              </div>
                
            )
          })} 

          {isCompleteScreen===true && completedTodos.map((item, index)=>{
            return(
              <div className='todo-list-item' key={index}>
                
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed On:{item.completedOn}</small></p>
                  
                </div>
            
                <div>
                  <AiOutlineDelete className='icon-dlt' onClick={()=>handleCompletedDeleteTodo(item.id)}/>
                </div> 
              </div>
                
            )
          })}

        </div>


      </div>
      
    </div>
    
  );
}

export default App;
