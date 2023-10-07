'use client'
import { useState } from 'react'
import './page.css'
export default function Home() {
    const [formState, setFormState] = useState('');
    const [todoArray, SetTodoArray] = useState([]);
    const [completedArray, SetCompletedArray] = useState([])
    class Todo {
        constructor(title, description) {
            this.title = title;
            this.description = description;
            this.isCompleted = false;
        }
    }
    const handleAction = (value, index) => {
        let targetTodo = todoArray?.slice(index, index + 1)[0];
        if (targetTodo) {
            let updatedTodoArray = todoArray?.filter((_, i) => i !== index);
            SetTodoArray(updatedTodoArray)
            if (value == 'complete') {
                SetCompletedArray(current => [...current, targetTodo]);
            }
        }
    }

    const TodoInput = ({ formState }) => {
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');

        const handleInputChange = e => {
            if (e.target.id == 'title') {
                setTitle(e.target.value);
            }
            if (e.target.id == 'desc') {
                setDescription(e.target.value);
            }
        };

        const handlekeyEnter = e => {
            if (e.key === 'Enter' && e.target.value != '') {
                let todoObj = new Todo(title, description);
                SetTodoArray(current => [...current, todoObj]);
                setTitle('');
                setDescription('');
                setFormState('');
            }
        };

        return formState === 'new' ? (
            <form className="input card br-8">
                <input className='custom-input br-8' placeholder='add title' id='title' value={title} onKeyDown={handlekeyEnter} onChange={handleInputChange} type="text" />
                <input className='custom-input br-8' placeholder='add description' id='desc' onKeyDown={handlekeyEnter} value={description} onChange={handleInputChange} type="text" />
            </form>
        ) : null;
    };

    return (
        <div className="container">
            <h2 className='header padd-1 br-8'>Todo List</h2>
            <div className="body">
                <div className="side padd-1 br-8">
                    <button onClick={() => setFormState('new')} className='btn btn-new'>New</button>
                </div>
                {formState == 'new' &&
                    <div className="main padd-1 br-8">
                        <TodoInput formState={formState} SetTodoArray={SetTodoArray} />
                    </div>
                }
                {todoArray?.length > 0 &&
                    <div className="left main content padd-1 br-8">
                        <h3 className='sub-header'>Todos</h3>
                        {todoArray.map((todo, i) => (
                            <div className="card br-8" key={i} >
                                <div className='card-title br-8' >
                                    <div className="btn-holder">
                                        <button className='btn btn-green br-1rm' onClick={() => { handleAction('complete', i) }} >complete</button>
                                        <button className='btn btn-danger br-1rm' onClick={() => { handleAction('delete', i) }} >delete</button>
                                    </div>
                                    {todo?.title}
                                </div>
                                <div className='card-desc br-8' >
                                    {todo?.description}
                                </div>
                            </div>
                        ))}
                    </div>
                }
                {completedArray?.length > 0 &&
                    <div className="right main content padd-1 br-8">
                        <h3 className='sub-header'>Completed</h3>
                        {completedArray.map((todo, i) => (
                            <div className="card br-8" key={i} >
                                <div className='card-title br-8' >
                                    {todo?.title}
                                </div>
                                <div className='card-desc br-8' >
                                    {todo?.description}
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
}
