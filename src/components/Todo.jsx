export default function Todo(props) {
    const { todos } = props
    return (
        <ul>
            {todos.map((todo,i) => <li key={i}>{todo}</li>)}
        </ul>
    )
}