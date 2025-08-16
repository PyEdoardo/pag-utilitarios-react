import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { FaTasks, FaSun, FaMoon } from 'react-icons/fa'
import { db } from '../db/db';
import { useLiveQuery } from 'dexie-react-hooks'

export const Todo = () => {

    const [darkMode, setDarkMode] = useState(false);
    const [novoTodo, setNovoTodo] = useState({
        nome: '',
        descricao: '',
        tipo: 'pessoal'
    });

    const navigate = useNavigate();
 
    const [escondido, setEscondido] = useState(false);

    const listaTodo = useLiveQuery(() => db.todos.toArray(), []) || [];

    const adicionarTodo = async (e) => {
        e.preventDefault();
        if (!novoTodo.nome) return;

        try {
            await db.todos.add({
                ...novoTodo,
                dataCriacao: new Date(),
                foiFeito: false
            });
            setNovoTodo({nome: '', descricao: '', tipo: 'pessoal'});
        } catch (error) {
            console.error('Erro ao adicionar a tarefa:' + error);
        }
    };

    const toggleFeito = async (id, foiFeito) => {
        await db.todos.update(id, { foiFeito: !foiFeito});
    };

    const removerTodo = async (id) => {
        await db.todos.delete(id);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoTodo({ ...novoTodo, [name]: value});
    };

    const ligarModoNoturno = () => {
        setDarkMode(!darkMode);
    }

    const esconderTodo = () => {
        if (escondido){
            document.getElementsByClassName('list-group').display = false;
            setEscondido(true);
        } else {
            document.getElementsByClassName('list-group').display = true;
            setEscondido(false);
        }
    }

    useEffect(() => {
        document.title = "Todo List";
        if (darkMode){
            document.body.classList.add("bg-dark", "text-white");
            document.body.classList.remove("bg-light", "text-dark");
        } else {
            document.body.classList.add("bg-light", "text-dark");
            document.body.classList.remove("bg-dark", "text-white");
        }
    });

    return (
        <div className="container">
            <h1>Lista de Tarefas</h1>
            <div className="form-check form-switch custom-switch d-flex align-items-center gap-2">
                        <input type="checkbox" className="form-check-input" id="darkModeSwitch" checked={darkMode} onChange={ligarModoNoturno}/>
                        <label htmlFor="darkModeSwitch">{darkMode ? <FaMoon color="yellow" size={20}/> : <FaSun color="yellow" size={20}/>}</label>
            </div>
            <div className='input-group mb-3'>
                <span onClick={() => esconderTodo()} className='input-group-text' id='basic-addon1'><FaTasks></FaTasks></span>
                <input onChange={handleInputChange} name="nome" value={novoTodo.nome} type='text' className='form-control' placeholder='Digite o nome da Tarefa' aria-describedby='basic-addon1'></input>
                <input onChange={handleInputChange} name="descricao" value={novoTodo.descricao} type='text' className='form-control' placeholder='Digite a descrição' aria-describedby='basic-addon1'></input>
                <input onChange={handleInputChange} name="tipo" value={novoTodo.tipo} type='text' className='form-control' placeholder='Digite a categoria' aria-describedby='basic-addon1'></input>
                <button className={darkMode ? "btn btn-success d-flex align-items-center gap-2" : "btn btn-success d-flex align-items-center gap-2"} onClick={adicionarTodo}>Adicionar Tarefa</button>
            </div>
            <ul className='list-group'>
                {listaTodo.map(todo => (
                    <li
                    key={todo.id}
                    className={`list-group-item d-flex justify-content-between align-items-center ${todo.foiFeito ? "list-group-item-success" : ""}`}
                    >
                        <div>
                            <strong>{todo.nome}</strong><label> - {todo.descricao} - {todo.tipo} - </label>
                        </div>
                        <div className='d-flex gap-2'>
                            <button
                                className={todo.foiFeito ? "btn btn-warning btn-sm" : "btn btn-success btn-sm"}
                                onClick={() => toggleFeito(todo.id, todo.foiFeito)}
                            >
                                    {todo.foiFeito ? "Desmarcar" : "Concluir"}
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => removerTodo(todo.id)}
                            >
                            Remover
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button className='btn btn-danger gap-2 align-items-center' onClick={() => navigate('/')}>Voltar ao menu</button>
        </div>
    );
}

export default Todo