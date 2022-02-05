import React, { useState,useEffect } from "react"
import TodoItem from "./TodoItem"
import axios from 'axios'
function Todo(){
  const [title,setTitle] = useState("")
  const [body,setBody] = useState("")
  const [todos,setTodo]= useState([])
  const [page, setPage] = useState(0)
  const [isLonding, setisLoding] = useState(false)  
  const [limitpage, setLimitpage] = useState(2)
  const[count,setCount] = useState(0)

  
  const handleClick = () => {
      const newTodo = { title, body }
      axios.post("http://localhost:3004/todos", newTodo) 
      console.log(isLonding)
      setCount1()
      getData(page)
    }

    
    const setCount1 = () => {
        axios.get("http://localhost:3004/todos").then(res => {
            setCount(Math.ceil(res.data.length / 2)); // length of your data without page limit
        });
    }
    

    const getData = (page = 1, limitpage = 2) => {

        axios.get(`http://localhost:3004/todos?_page=${page}&_limit=${limitpage}`).then(res => {
            setTodo(res.data)
        })

    }

    useEffect(() => {
        setCount1()
        getData(page)
    }, [page])
    
return (
  <div>
    <h1 className='title'>Todo...</h1>
    <input value={title} type="text" onChange={(e)=>setTitle(e.target.value)} className="inputTitle" placeholder="Title..."/> 
    <input type="text" value={body} onChange={(e)=>setBody(e.target.value)}placeholder="Add Task..." className="inputBody"/>
    <button onClick={handleClick} className="addBtn">Add</button>
       
   <div className="container">    
    {/* {todos.map(e=>{
    return <div  key = {e.id}> 
  <TodoItem title={e.title} body= {e.body} />
   </div>
    })} */}
   <TodoItem isLonding={ isLonding} todos={todos} /> 
    </div>
        <div>
            
            <h4>page:{page}/{count}</h4>
            <button className="prev" disabled={page==1}onClick={() =>{ setPage(page - 1)}}>Prev</button>
            <button disabled={page >= (count) || count ===0} onClick={() => { setPage(page + 1) }}>Next</button>
        </div>
  </div>
  )}

export{Todo}