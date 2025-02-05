const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Supabase configuration
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(bodyParser.json());

// Create a new todo
app.post('/todos', async (req, res) => {
    const { title, description } = req.body;
    const { data, error } = await supabase
        .from('todos')
        .insert([{ title, description }]);

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

// Get all todos
app.get('/todos', async (req, res) => {
    const { data, error } = await supabase
        .from('todos')
        .select('*');

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

// Get a single todo by id
app.get('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

// Update a todo by id
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const { data, error } = await supabase
        .from('todos')
        .update({ title, description })
        .eq('id', id);

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

// Delete a todo by id
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(data);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});