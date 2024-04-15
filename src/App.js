
import './App.css'
import { useState} from 'react'
import completeIcon from './assets/complete.svg'
import deleteIcon from './assets/delete.svg'
import editIcon from './assets/edit.svg'
class Todo {
    constructor(formTitle, formDescription, todoId) {
        this.title = formTitle;
        this.description = formDescription;
        this.completed = false;
        this.id = todoId;
    }
}
export default function Home() {
    const [todoArray, setTodoArray] = useState([]);
    const [targetTodoIndex, setTargetTodoIndex] = useState();
    const [formState, setFormState] = useState('new');
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [btnText, setBtnText] = useState('create');
    const [navState, setNavState] = useState('1');
    const [CompletedTodoArray, setCompletedTodoArray] = useState([]);
    const [todoId, setTodoId] = useState(0);

    const formReset = () => {
        setFormTitle('');
        setFormDescription('');
        setFormState('new')
    }
    const handleTodo = () => {
        setTodoId(todoId + 1)
        return new Todo(formTitle, formDescription, todoId);
    }

    const handleAction = (value, index) => {
        setTargetTodoIndex(index);
        let targetTodo = todoArray.slice(index, index + 1)[0];
        let updatedTodoArray = todoArray.filter((_, i) => i !== index);
        let updatedCompletedTodoArray = CompletedTodoArray.filter((_, i) => i !== index);
        if (value === 'complete') {
            targetTodo.completed = !targetTodo.completed
            setCompletedTodoArray(current => [...current, targetTodo])
            setTodoArray(updatedTodoArray)
            formReset()
        }
        if (value === 'delete') {
            setTodoArray(updatedTodoArray)
        }
        if (value === 'clear') {
            setCompletedTodoArray(updatedCompletedTodoArray)
        }
        if (value === 'edit') {
            setFormState('edit');
            setFormTitle(targetTodo.title);
            setFormDescription(targetTodo.description)
            setBtnText('save');
        }
        if (value === 'create' && formState === 'edit' && formTitle !== '') {
            let updatedTodoArray = [...todoArray];
            updatedTodoArray[targetTodoIndex] = handleTodo();
            setTodoArray(updatedTodoArray)
            formReset()
        }
        if (value === 'create' && formState === 'new' && formTitle !== '') {
            setTodoArray(current => [...current, (handleTodo())]);
            formReset()
        }
        if (value === 'done' && formTitle !== '') {
            let updatedTodoArray = [...todoArray][targetTodoIndex] = handleTodo();
            setTodoArray(updatedTodoArray);
            formReset()
            setBtnText('create');
        }
        if (value === 'cancel') {
            formReset()
        }
    }

    const handleInputChange = e => {
        e.preventDefault();
        if (e.target.id === 'title') {
            setFormTitle(e.target.value);
        }
        if (e.target.id === 'desc') {
            setFormDescription(e.target.value);
        }
    };
    const handleNavAction = (value) => {
        setNavState(value)
    }

    const TodoCard = (props) => {
        console.log(props);
        return (
            <div className="card br-8" key={props.i} >
                <div className='flex flex-center'>
                    <div className='card-title br-8'>{props.todo?.title}</div>
                    <div className="btn-holder mweb">
                        {!props.todo?.completed && <>
                            <div className='br-1rm' onClick={() => { handleAction('complete', props.i) }} >
                                <img className='icon' src={completeIcon} alt="" />
                            </div>
                            <div className='br-1rm' onClick={() => { handleAction('edit', props.i) }} >
                                <img className='icon' src={editIcon} alt="" />
                            </div>
                            <div className='br-1rm' onClick={() => { handleAction('delete', props.i) }} >
                                <img className='icon' src={deleteIcon} alt="" />
                            </div>  </>
                        }
                        {props.todo?.completed && <div className='br-1rm' onClick={() => { handleAction('clear', props.i) }} >
                            <img className='icon' src={deleteIcon} alt="" />
                        </div>
                        }
                    </div>
                </div>
                <div className='card-desc br-8' >
                    {props.todo?.description}
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <div className='header padd-1 br-8 flex'>
                <div className='title'>To Do's</div>
                <div className="nav flex">
                    <button onClick={() => { handleNavAction('1') }} className={`nav-items btn ${navState !== '1' ? 'btn--outline' : ''}`}>Active</button>
                    <button onClick={() => { handleNavAction('2') }} className={`nav-items btn ${navState !== '2' ? 'btn--outline' : ''}`}>Completed </button>
                    <button onClick={() => { handleNavAction('3') }} className={`nav-items btn ${navState !== '3' ? 'btn--outline' : ''}`}>All</button>
                </div>

            </div>
            <div className="body flex flex-col">
                <form className="form card br-8">
                    <input className='custom-input br-8' placeholder='start typing' id='title' value={formTitle} onChange={handleInputChange} type="text" />
                    {
                        formTitle.length > 0 &&
                        <div className='flex'>
                            <input className='custom-input br-8' placeholder='add summary' id='desc' value={formDescription} onChange={handleInputChange} type="text" />
                            <div className="btn-holder">
                                <button onClick={() => { handleAction('create') }} className='btn'>{btnText}</button>
                                <button onClick={() => { handleAction('cancel') }} className='btn btn--outline'>cancel</button>
                            </div>
                        </div>
                    }
                </form>
                <div className="card-container flex flex-col">
                    {navState !== '2' && todoArray?.length > 0 && todoArray.map((todo, i) => (
                        <TodoCard todo={todo} key={i} i={i}></TodoCard>
                    ))}
                    {navState !== '1' && CompletedTodoArray?.length > 0 && CompletedTodoArray.map((todo, i) => (
                        <TodoCard todo={todo} key={i} i={i}></TodoCard>
                    ))}
                </div>
            </div>
        </div>
    );
}
