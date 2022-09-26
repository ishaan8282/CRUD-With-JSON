import React from 'react'
import { useState } from 'react'

function AddTodo({handleAdd}) {
    const [text, settext] = useState("")

    const handleChange = (e) => {
        settext(e.target.value)
    }

    const handleSubmit = () => {
    handleAdd(text)
    }
  return (
    <div>
   <input onChange={handleChange} />
   <button onClick={handleSubmit}>ADD</button>

    </div>
  )
}

export default AddTodo