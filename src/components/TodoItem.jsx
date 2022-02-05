
import React from "react"
const TodoItem = ({todos,isLonding}) =>{
return isLonding?"Loding.....": <div >
  {todos.map(e => {
    return <div key={e.id}>
      <div>{e.title}</div>
      <div>{e.body}</div>
    </div>
  })}
  </div>
}

export default TodoItem