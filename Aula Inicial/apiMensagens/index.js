
const express = require('express');
const axios = require("axios");
const app = express();
const port = 3002;

app.use(express.json());

let mensagens = [];

app.get('/msg', (req, res) =>{
    res.json(mensagens) 
});


app.post('/msg', async (req, res) =>{
    const msg = req.body;
        try {
        const response = await axios.get(`http://localhost:3001/contat/${msg.contatoId}`);
       console.log(response);
        if (response.status === 200) {
            msg.id = mensagens.length + 1;
            mensagens.push(msg);
            res.status(201).json(msg);
        }
    } catch (error) {
        res.status(400).send("Contato não encontrado");
        console.log('bateu aqui')
    }
});
    

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

