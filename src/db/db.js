import Dexie from 'dexie'

export const db = new Dexie('BancoTodo');

db.version(1).stores({
    todos: '++id, nome, descricao, dataCriacao, tipo, foiFeito'
});