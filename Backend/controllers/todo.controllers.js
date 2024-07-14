import db from '../db.js';

export const getTodos = (req,res) => {
    const sql  = "select * from todos"
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: "sql error"});
        res.status(200).send(results)
    })
}

export const getTodo = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM todos WHERE id =?"
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: "sql error"});
        if (!result.length) return res.status(404).json({ error: "todo not found"});
        res.status(200).send(result[0])
    })
}

export const createTodo = (req, res) => {
    const { title, content } = req.body;
    const sql = "INSERT INTO todos (title, content) VALUES (?,?)"
    db.query(sql, [title, content], (err, result) => {
        if (err) return res.status(500).json({ error: "sql error"});
        res.status(201).send({ message: "todo created", id: result.insertId })
    })
}

export const updateTodo = (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!id) {
        return res.status(400).json({ error: "id is required" });
    }

    if(!title || !content) {
        return res.status(400).json({error: "title and content is required"});
    }

    const selectQuery = "SELECT * FROM todos WHERE id = ?";
    const updateQuery = "UPDATE todos SET title =?, content =? WHERE id =?"
    db.query(selectQuery, [id], (err, result) => {
        if (err) return res.status(500).json({ error: "sql error"});
        if (!result.length) return res.status(404).json({ error: "todo not found"});
        const todo = result[0];
        const updateTitle = title || todo.title;
        const updateContent = content || todo.content;

        db.query(updateQuery, [updateTitle, updateContent, id], (err, result) => {
            if (err) return res.status(500).json({ error: "sql error"});
            res.status(200).send({ message: "todo updated" });
        });
    });
}

export const deleteTodo = (req, res) => {
    const {id} = req.params;
    const sql = "delete from todos where id =?";
    if(!id) {
        return res.status(400).json({ error: "id is required" });
    }

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({error: "sql error"});
        return res.status(200).json({message: "todos deleted" });
    })
}
