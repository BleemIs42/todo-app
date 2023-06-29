/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, KeyboardEvent } from "react";
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

interface FilterProps {
  currFilter: FilterName;
  setFilter: (filter: FilterName) => void
}

enum FilterName {
  ALL = "ALL",
  TODO = "TODO",
  DONE = "DONE"
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

const Filter = ({ currFilter, setFilter }: FilterProps) => {
  const getFilterClassName = (filterName: FilterName) => {
    return [
      "filter-item",
      currFilter === filterName ? "filter-item-active" : ""
    ].join(" ")
  }
  return <div className="filter">
    <div className="filter-title">Filter: </div>
    <div className={getFilterClassName(FilterName.ALL)} onClick={() => setFilter(FilterName.ALL)}>all</div>
    <div className={getFilterClassName(FilterName.TODO)} onClick={() => setFilter(FilterName.TODO)}>todo</div>
    <div className={getFilterClassName(FilterName.DONE)} onClick={() => setFilter(FilterName.DONE)}>done</div>
  </div>
}

export default () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [currList, setCurrList] = useState<TodoItem[]>([]);
  const [filter, setFilter] = useState(FilterName.ALL);
  
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

  useEffect(() => {
    const listMap = {
      [FilterName.ALL]: todoList,
      [FilterName.TODO]: todoList.filter(item => !item.isDone),
      [FilterName.DONE]: todoList.filter(item => item.isDone),
    }
    const list = [...listMap[filter]].sort(item => item.isDone ? 1 : -1);
    setCurrList(list)
  }, [todoList, filter])

  const itemList = currList.sort(item => item.isDone ? 1 : -1).map(todo => <ItemWrapper
    item={todo}
    key={todo.id}
    onMark={onMark}
  />)

  return <div className="wrap">
    <div className="header">TodoList</div>
    <div className="container">
      <InputWrapper onEnter={onEnter} />
      <Filter currFilter={filter} setFilter={setFilter} />
      <div className="list">
        {itemList}
      </div>
    </div>
  </div>
}