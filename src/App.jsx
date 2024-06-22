import { useState,useEffect } from 'react'
import Navbar from './componenets/Navbar'
import {v4 as uuidv4} from 'uuid';


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  useEffect(() => {
  let to = localStorage.getItem("todos")
  if(to){
    let tod = JSON.parse(localStorage.getItem("todos"))
    settodos(tod)
  }
  }, [])
  
const saveTo = (param)=>{
  localStorage.setItem("todos",JSON.stringify(todos))
}
const handleEdit = (e,id)=>{
 let t = todos.filter(i=>i.id===id)
 settodo(t[0].todo)
 let index = todos.findIndex(item=>{
  return item.id===id;
 })
 let newTo = todos.filter(item=>{
   return item.id!==id;
 })
 settodos(newTo)
 saveTo();
}
const handleDelete = (e,id)=>{
  let index = todos.findIndex(item=>{
   return item.id===id;
  })
  let newTo = todos.filter(item=>{
    return item.id!==id;
  })
  settodos(newTo)
  saveTo();
}
const handleAdd = ()=>{
  settodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
  settodo("")
  saveTo();
}
const handleChange = (e)=>{
 settodo(e.target.value)
}
const handleCheckbox = (e)=>{
 let id = e.target.name
let index = todos.findIndex(item=>{
  return item.id === id;
})
let newTo = [...todos];
newTo[index].isCompleted = !newTo[index].isCompleted;
settodos(newTo)
saveTo()
}
const toggleFinished = (e)=>{
 setshowFinished(!showFinished)
}
  return (
    <>
     <Navbar/>
     <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-300 min-h-[80vh]">
      <div className="addTodo my-5">
        <h2 className='text-lg font-bold'>Add a Todo</h2>
        <input onChange={handleChange} value={todo} type="text" className='w-1/2'/>
         <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-black p-2 py-2 text-sm font-bold text-white rounded-md mx-6'>Add</button>
      </div>
      <input onChange={toggleFinished} type="checkbox" value={showFinished} name="" id="" />Show Finished
      <h2 className="text-lg font-bold">Your Todos</h2>
      <div className="todos">
        {todos.length === 0 && <div>Nothing to display</div>}
        {todos.map(item=>{ 
        return (showFinished || !item.isCompleted)  && <div key={item.id} className="todo flex justify-between w-1/4 my-3">
          <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name = {item.id} id=""/>
          <div className={item.isCompleted?"line-through":""}>{item.todo}
          </div>
          <div className="buttons flex h-full">
            <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-black p-2 py-2 text-sm font-bold text-white rounded-md mx-2'>Edit</button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-black p-2 py-2 text-sm font-bold text-white rounded-md mx-2'>Delete</button>
          </div>
        </div>
        })}
      </div>
     </div>
    </>
  )
}

export default App
