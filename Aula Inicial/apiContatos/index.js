
const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let contatos = [];


app.get('/contat', (req, res) =>{
    res.json(contatos)
});



app.post('/contat', (req, res) =>{
    const contato = req.body;
    contato.id = contatos.length + 1;
    contatos.push(contato);
    res.status(201).json(contato);
});


//GET
app.get('/contat/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const contato = contatos.find((c) => c.id === id);
    if (contato) {
        res.json(contato);
    } else {
        res.status(404).json({ message: 'Contato não encontrado' });
    }
})


//DELETE
app.delete('/contat/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const index = contatos.findIndex((c) => c.id === id);
    if (index !== -1) {
        contatos.splice(index, 1);
        res.json({ message: 'Contato excluído com sucesso' });
    } else {
        res.status(404).json({ message: 'Contato não encontrado' });
    }
})
//PUT
app.put('/contat/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const contato = req.body;
    const index = contatos.findIndex((c) => c.id === id);
    if (index !== -1) {
        contatos[index] = contato;
        res.json(contato);
    } else {
        res.status(404).json({ message: 'Contato não encontrado' });
    }
});

app.listen(port, ()=>{
    console.log(`Rodando na porta ${port}`)
})