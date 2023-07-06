

export default function InputBox(props) {
    const { id, onChange, value } = props
    return (
        <input type="text" id={id} onChange={onChange} value={value} />
    )
}