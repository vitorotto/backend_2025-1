import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json()) // Para ler o JSON no corpo das requisçoes

// Rota GET deexemplo
app.get('/', (req, res) => {
    res.send('API está funcionando!')
})

// Rota POST de exemplo
app.post('/usuarios', (req, res) => {
    const { nome } = req.body
    res.json({mensagem: `Usuário ${nome} criado com sucesso!`})
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em https://localhost:${PORT}/`)
})