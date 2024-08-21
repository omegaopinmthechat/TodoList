import {useState, useEffect} from 'react'
import Navbar from "./components/Navbar.jsx";
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const saveToLs = (pararms) => {
    localStorage.setItem("todos", JSON.stringify(pararms))
  }

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLs(newTodos)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLs(newTodos)
  }

  const handleAdd = () => {
    if (todo.trim() === "") return; 
    const newTodo = { id: uuidv4(), todo, isCompleted: false };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodo("");
    saveToLs(newTodos);
  } 

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(props => {
      return props.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLs(newTodos)
  }


  return (
    <>
      <Navbar />
      <div className="container min-h-[80vh] p-5 mx-auto my-5 bg-violet-200 rounded-3xl">
        <div className="m-2 addTodo">
        <h2 className="text-xl font-bold">Add a Todo</h2>
        <div className="flex">
        <input onChange={handleChange} className="w-1/2 px-2 rounded-lg" type="text" value={todo}/>
        <button onClick ={handleAdd} className="p-3 py-1 mx-4 text-sm font-bold text-white rounded-lg bg-violet-800 hover:bg-violet-950">Save</button>
        </div>
        </div>
        <h2 className="m-2 text-xl font-bold">Your Todos</h2>   
        <div className="todos">
          {todos.length ===0 && <div className="flex justify-between w-1/2 m-3 todo">No Todos to display</div>}
          { todos.map(props => {
          return <div key={props.id} className="flex justify-between w-1/2 m-3 todo">
            <input onChange={handleCheckbox}type="checkbox" value={props.isCompleted} name ={props.id}  />
            <div className={props.isCompleted?"line-through flex": "flex"}>{props.todo}</div>
            <div className="flex h-full btn">
              <button onClick={(e)=>{handleEdit(e, props.id)}} className="p-3 py-1 mx-2 text-sm font-bold text-white rounded-lg bg-violet-800 hover:bg-violet-950">Edit</button>
              <button onClick={(e)=>{handleDelete(e, props.id)}} className="p-3 py-1 mx-2 text-sm font-bold text-white rounded-lg bg-violet-800 hover:bg-violet-950">Delete</button>
            </div>
          </div>
               })}
        </div>
      </div>
    </>
  );
}

export default App;
