import "./App.css";
import { useEffect, useState } from "react";
import Button from "./components/Button";
import Counter from "./components/Counter";
import InputBox from "./components/InputBox";
import Todo from "./components/Todo";

function App() {
  // const [counter, setCounter] = useState(0);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState([]);

  const handleReset = () => {
    setTodo("");
    setTodos([]);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setTodo(e.target.value);
  };

  const handleAdd = async (e) => {
    if (!todo) return;

    console.log("Loading....");
    fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo, time: new Date() }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Added Successfully");
        setTodos([...todos, todo]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        console.log("Done.");
        setTodo("");
      });
  };

  useEffect(() => {
    console.log("Loading...");

    fetch(`http://localhost:4000/todos?_page=${pageNo}&_limit=5`)
      .then((res) => {
        let totalCount = res.headers.get("X-Total-Count");
        let pages = Math.ceil(totalCount / 5);
        let temp = [];
        for (let i = 1; i <= pages; i++) {
          temp.push(i);
        }
        setTotalPages(temp);
        return res.json();
      })
      .then((res) => {
        const totalTodos = res.map((todo) => todo.todo);
        console.log(totalTodos);
        setTodos(totalTodos);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Done.");
      });
  }, [pageNo]);

  const handlePageNo = (e) => {
    setPageNo(e.target.value);
  };

  return (
    <div className="App">
      {/* <Button name={"Click Me"} onClick={handleClick} /> */}
      <InputBox id="temp" value={todo} onChange={handleChange} />
      <Button name="Add" onClick={handleAdd} />
      <Button name="Reset" onClick={handleReset} />
      <Todo todos={todos} />
      {/* <Counter count={counter} /> */}
      {totalPages.map((page, id) => (
        <button key={id} value={page} onClick={handlePageNo}>
          {page}
        </button>
      ))}
    </div>
  );
}

export default App;
