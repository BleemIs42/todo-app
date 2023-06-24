/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import "./App.css"
import { getId } from "./utils";
import { TodoItem } from "./interface";

interface InputProps {
  onEnter: (text: string) => void
}

const InputWrapper = ({ onEnter }: InputProps) => {
  const [value, setValue] = useState("");
  const onKeyup = (e: any) => {
    if (e.key === "Enter") {
      onEnter(e.target.value);
      setValue("");
    }
  }
  return <input className="input"
    value={value}
    onChange={e => setValue(e.target.value)}
    onKeyUp={onKeyup} />
}

export default () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const onEnter = (text: string) => {
    setTodoList([
      ...todoList,
      {
        id: getId(),
        text,
        isDone: false,
      }])
  }

  return <div className="wrap">
    <div className="header">TodoList</div>
    <div className="container">
      <InputWrapper onEnter={onEnter} />
      <div className="list">
        {
          todoList.map(todo => <div>{ todo.text }</div>)
        }
      </div>
    </div>
  </div>
}