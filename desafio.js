const express = require('express')

const app = express()

app.use(express.json())

const projects = [{ id: "1", title: 'Novo projeto', tasks: [] }]

app.get('/projects', (req, res) => {
  res.json(projects)
})

app.post('/projects', (req, res) => {
  projects.push(req.body)
  res.json(projects.id)
})

app.post('/projects/:id/tasks', (req, res) => {
  projects.filter( pro => pro.id == req.params.id).map( te =>
    te.tasks.push(req.body.title) )
  res.json(projects)
})

app.put('/projects/:id', (req, res) => {
  projects.filter( pro => pro.id == req.params.id).map( te =>
    te.title = req.body.title )
  res.json(projects)
} )

app.delete('/projects/:id', (req, res) => {
  const index = projects.findIndex(obj => obj.id == req.params.id)
  projects.splice(index, 1)
  res.json(projects)
})

app.listen(4000)
