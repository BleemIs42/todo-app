/* eslint-disable react-refresh/only-export-components */
import { useState, KeyboardEvent } from "react";
import "./App.css"
import { getId } from "./utils";
import { TodoItem } from "./interface";

interface InputProps {
  onEnter: (text: string) => void
}

interface ItemWrapperProps {
  item: TodoItem;
  onMark: (item: TodoItem) => void
}

const InputWrapper = ({ onEnter }: InputProps) => {
  const [value, setValue] = useState("");
  const onKeyup = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnter(e.currentTarget.value);
      setValue("");
    }
  }
  return <input className="input"
    value={value}
    onChange={e => setValue(e.target.value)}
    onKeyUp={onKeyup} />
}

const ItemWrapper = ({ item, onMark }: ItemWrapperProps) => {
  const onChange = (checked: boolean) => {
    onMark({
      ...item,
      isDone: checked
    })
  }
  return <div className="item-wrapper">
    <input id={item.id} type="checkbox" className="checkbox" checked={item.isDone} onChange={e => onChange(e.target.checked)} />
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

  const onMark = (todo: TodoItem) => {
    const index = todoList.findIndex(item => item.id === todo.id);
    todoList.splice(index, 1, todo);
    setTodoList([...todoList]);
  }

  const itemList = todoList.sort(item => item.isDone ? 1 : -1).map(todo => <ItemWrapper
    item={todo}
    key={todo.id}
    onMark={onMark}
  />)

  return <div className="wrap">
    <div className="header">TodoList</div>
    <div className="container">
      <InputWrapper onEnter={onEnter} />
      <div className="list">
        {itemList}
      </div>
    </div>
  </div>
}