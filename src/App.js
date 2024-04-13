
import './App.css'
import { useState } from 'react'
class Todo {
    constructor(formTitle, formDescription) {
        this.title = formTitle;
        this.description = formDescription;
        this.completed = false;
    }
}
export default function Home() {
    const [todoArray, setTodoArray] = useState([]);
    const [targetTodoIndex, setTargetTodoIndex] = useState();
    const [formState, setFormState] = useState('new');
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');

    const formReset = () => {
        setFormTitle('');
        setFormDescription('');
        setFormState('new')
    }
    const handleTodo = () => {
        return new Todo(formTitle, formDescription);
    }

    const handleAction = (value, index) => {
        let targetTodo = todoArray.slice(index, index + 1)[0];
        if (value === 'complete') {
            targetTodo.completed = !targetTodo.completed
            formReset()
        }
        if (value === 'delete') {
            let updatedTodoArray = todoArray.filter((_, i) => i !== index);
            setTodoArray(updatedTodoArray)
        }
        if (value === 'edit') {
            setFormState('edit');
            setTargetTodoIndex(index);
            setFormTitle(targetTodo.title);
            setFormDescription(targetTodo.description)
        }
        if (value === 'add' && formState === 'new' && formTitle !== '') {
            setTodoArray(current => [...current, (handleTodo())]);
            formReset()
        }
        if (value === 'done' && formTitle !== '') {
            let updatedTodoArray = [...todoArray][targetTodoIndex] = handleTodo();
            setTodoArray(updatedTodoArray);
            formReset()
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

    const handlekeyPress = e => {
        if (formState == 'new' && e.key === 'Enter' && e.target.value != '') {
            handleAction('add')
        }
        if (formState == 'edit' && e.key === 'Enter' && e.target.value != '') {
            handleAction('done')
        }
    };

    return (
        <div className="container">
            <div className='header padd-1 br-8 flex'>
                <div>To Do's</div>
                <div className="nav"></div>
            </div>
            <div className="body flex flex-col">
                <form className="form card br-8">
                    <input className='custom-input br-8' placeholder='start typing' id='title' value={formTitle} onKeyDown={handlekeyPress} onChange={handleInputChange} type="text" />
                    {
                        formTitle.length > 0 &&
                        <div className='flex'>
                            <input className='custom-input br-8' placeholder='add summary' id='desc' onKeyDown={handlekeyPress} value={formDescription} onChange={handleInputChange} type="text" />
                            <div className="btn-holder">
                                <button onClick={() => { handleAction('add') }} className='btn'>create</button>
                                <button onClick={() => { handleAction('cancel') }} className='btn'>cancel</button>
                            </div>
                        </div>
                    }
                </form>
                <div className="card-container flex flex-col">
                    {todoArray?.length > 0 && todoArray.map((todo, i) => (
                        <div className="card br-8" key={i} >
                            <div className='flex flex-center'>
                                <div className='card-title br-8'>{todo?.title}</div>
                                <div className="btn-holder mweb">
                                    <div className='br-1rm' onClick={() => { handleAction('complete', i) }} >

                                    </div>
                                    <div className='br-1rm' onClick={() => { handleAction('edit', i) }} >
                                    </div>
                                    <div className='br-1rm' onClick={() => { handleAction('delete', i) }} >
                                    </div>
                                </div>
                            </div>
                            <div className='card-desc br-8' >
                                {todo?.description}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
