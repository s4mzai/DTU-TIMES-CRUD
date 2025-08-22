import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DB_FILE = "./db.json";

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
  res.send("DTU Times Backend Running");
});


app.get("/editions", (req, res) => {
  const db = readDB();
  res.json(db.editions);
});


app.get("/editions/:id", (req, res) => {
  const db = readDB();
  const edition = db.editions.find((e) => e._id === req.params.id);
  if (!edition) return res.status(404).json({ error: "Edition not found" });
  res.json(edition);
});


app.post("/editions", (req, res) => {
  const db = readDB();
  db.editions.push(req.body); 
  writeDB(db);
  res.status(201).json(req.body);
});


app.put("/editions/:id", (req, res) => {
  const db = readDB();
  const index = db.editions.findIndex((e) => e._id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Edition not found" });

  db.editions[index] = { ...db.editions[index], ...req.body };
  writeDB(db);
  res.json(db.editions[index]);
});


app.delete("/editions/:id", (req, res) => {
  const db = readDB();
  const index = db.editions.findIndex((e) => e._id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Edition not found" });

  const deleted = db.editions.splice(index, 1);
  writeDB(db);
  res.json(deleted[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
