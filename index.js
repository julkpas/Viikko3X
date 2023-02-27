const express = require('express')
const app = express()

app.use(express.json())//27.2.23

let persons = [{    
                  id: 1,    
                  name: "Arto Hellas",    
                  number: "040-123456"    
                  },  
             {    id: 2,    
                  name: "Ada Lovelace",    
                  number: "44-33-123456"    
                  }, 
             {    id: 3,    
                  name: "Dan Abramov",    
                  number: "111-234-123456"    
                  },       
             {    id: 4,    
                  name: "Mary Poppendick",    
                  number: "222-765-123456"    
                  }]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!!!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const note = persons.find(info => info.id === id)

  if (note) {    response.json(note)  } 
  else {    response.status(404).end()  }

  console.log(note)
  response.json(note)
})
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(info => info.id !== id)

  response.status(204).end()
})
const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => { 
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id)) 
    : 0

  const info = {
    content: body.content,
    date: new Date(),
    id: generateId(),
  }

  persons = persons.concat(info)

  response.json(note)
})
/*app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const info = persons.find(info => {
    console.log(info.id, typeof info.id, id, typeof id, info.id === id)
    return info.id === id
  })
  console.log(note)
  response.json(note)
})*/
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})