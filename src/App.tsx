/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import "./App.css"
import { getId } from "./utils";
import { TodoItem } from "./interface";

interface InputProps {
  onEnter: (text: string) => void
}

interface ItemWrapperProps {
  item: TodoItem;
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

const ItemWrapper = ({ item }: ItemWrapperProps) => {
  return <div className="item-wrapper">
    <input id={item.id} type="checkbox" className="checkbox"/>
    <label className={item.isDone ? "item-done" : ""} htmlFor={item.id}>{item.text}</label>
  </div>
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
          todoList.map(todo => <ItemWrapper
            item={todo}
            key={todo.id}
          />)
        }
      </div>
    </div>
  </div>
}