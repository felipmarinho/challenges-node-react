const express = require("express");

const server = express();
server.use(express.json());

const projects = [];

server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  next();
  console.timeEnd("Request");
});

function projectExists(req, res, next) {
  if (req.params.id) {
    const { id } = req.params;
    let existProject = false;
    projects.forEach(p => {
      if (p.id == id) {
        existProject = true;
      }
    });
    if (!existProject) {
      return res.status(400).json({ error: "ID Project not exist" });
    }
  }

  return next();
}

server.get("/projects/:id", projectExists, (req, res) => {
  const { id } = req.params;
  projects.forEach(p => {
    if (p.id == id) {
      return res.json(p);
    }
  });
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
  const { id } = req.params;
  const { title } = req.body;
  projects.forEach(p => {
    if (p.id == id) {
      p.tasks.push(title);
      return res.json(p);
    }
  });
});

server.put("/projects/:id", projectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  projects.forEach(p => {
    if (p.id == id) {
      p.title = title;
      return res.json(p);
    }
  });
});

server.delete("/projects/:id", projectExists, (req, res) => {
  const { id } = req.params;
  projects.forEach(p => {
    if (p.id == id) {
      index = projects.indexOf(p);
      projects.splice(index, 1);
      return res.send();
    }
  });
});

server.listen(3000);
