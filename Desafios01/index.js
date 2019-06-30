const express = require("express");

const server = express();
server.use(express.json());

const projects = [];

server.use((req, res, next) => {
  console.time("Request");
  
  next();
  console.timeEnd("Request");
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  console.count('Request count');
});

function projectExists(req, res, next) {
  if (req.params.id) {
    const { id } = req.params;
    const project = projects.find(p => p.id === id);
    req.project = project;
    if (!project) {
      return res.status(400).json({ error: "ID Project not exist" });
    }
  }
  return next();
}

server.get("/projects/:id", projectExists, (req, res) => {
  const project = req.project;
  if (project) {
    return res.json(project);
  }
  return res.json();
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  projects.push({ id, title, tasks: [] });

  return res.json(projects);
});

server.post("/projects/:id/tasks", projectExists, (req, res) => {
  const { title } = req.body;
  const p = req.project;

  p.tasks.push(title);
  return res.json(p);
});

server.put("/projects/:id", projectExists, (req, res) => {
  const { title } = req.body;
  const p = req.project;
  p.title = title;
  
  return res.json(p);
});

server.delete("/projects/:id", projectExists, (req, res) => {
  const p = req.project;
  index = projects.indexOf(p);
  projects.splice(index, 1);
  return res.send();
});

server.listen(3000);
