import React,{ useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  //State
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
 
  //Functions
  const getLocalTodos = () =>{
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    }
    else{
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  };
  //useEffect
  useEffect(() => {
    getLocalTodos();
  },[]);
  
  useEffect(() => {
    const saveLocalTodos = () => {
        if(todos.length !== 0){
          localStorage.setItem("todos", JSON.stringify(todos))
        }
    };
    const filterHandler = () =>{
      switch(status){
        case "completed":
          setFilteredTodos(todos.filter(todo => todo.completed === true));
          break;
          case "uncompleted":
            setFilteredTodos(todos.filter(todo => todo.completed === false));
            break;
          default:
            setFilteredTodos(todos);
            break;
      }
    };
    filterHandler();
    saveLocalTodos();
  },[todos, status]);
  
  return (
    <div className="App">
      <header><h1>Task Tracker</h1></header>
      <Form inputText = {inputText} setInputText = {setInputText} todos = {todos} setTodos = {setTodos} setStatus = {setStatus}/>
      <TodoList setTodos = {setTodos} todos = {todos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
