import React, { useEffect, useState } from 'react'
import AddTodo from './AddTodo'
import Todolist from './Todolist'


const getTodos = () => {
  return fetch("http://localhost:8282/Tasks").then(res => res.json())
}

const addTodos = (Todo) => {
  return fetch("http://localhost:8282/Tasks",{

  method:"POST",
  headers:{
    "Content-Type": "application/json"
  },
  body: JSON.stringify(Todo)

  })
  .then (res => res.json())
}

const toggleTodo = (id,newStatus) => {

  return fetch (`http://localhost:8282/Tasks/${id}`,{
    method:"PATCH",
    headers:{
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({status : newStatus})
  })
  .then (res => res.json())
}

const deleteTodo = (id) => {

  return fetch (`http://localhost:8282/Tasks/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type" : "application/json"
    }
  })
  .then (res => res.json())
}




function Todo() {
  const [Todos, setTodos] = useState([])

  const [loading, setloading] = useState(false);


  useEffect( () => {
    handleGetTodos()
  },[])

  const handleGetTodos = () => {

      setloading(true)
     return getTodos()
      .then ( res => {
        setloading(false)
        setTodos(res)
        console.log(res)
      }).catch ( err => {
         setloading(false)
      })
    }

   

    const handleAdd = (text) => {

      const item = {
        title:text,
        status:false
      }
      setloading(true)
      addTodos(item).then( res => {
        console.log(res)
        handleGetTodos()
      })
      .catch(err => {
        setloading(false)
      })
      
      }

      const handleToggle = (id , newStatus) => {
        setloading(true)
        toggleTodo(id,newStatus)
        .then( res => {
          handleGetTodos()
        }).catch( err => {
          setloading(false)
        })
      }
   

      const handleDelete = (id) => {
        setloading(true)
        deleteTodo(id)
        .then(res => {
          handleGetTodos()
        })
        .catch ( err => {
          setloading(false)
        })
      }

  return (
    <div>
      <AddTodo handleAdd={handleAdd}/>

      <div>
        {loading && "loading!!"}
      </div>
      {
      Todos.map ( item => 
        <Todolist 
        key = {item.id}
        title = {item.title}
        status = {item.status}
        id = {item.id}
        handleToggle={handleToggle}
        handleDelete={handleDelete}
        />)
      
      }
    </div>
  )
  }

export default Todo