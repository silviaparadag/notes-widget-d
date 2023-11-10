import jsonServer from "json-server";
import path from "node:path";

const server = jsonServer.create();
const dbPath = path.join(path.resolve(), "api", "db.json");
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

// Function to introduce random delays
const addRandomDelay = (next) => {
  const randomDelay = Math.floor(Math.random() * 2000); // Delay between 0-2000ms
  setTimeout(() => {
    next();
  }, randomDelay);
};

// Add 5% chance of 500 internal server error middleware
server.use((req, res, next) => {
  if (Math.random() < 0.05) {
    res.status(500).send("Internal Server Error");
  } else {
    addRandomDelay(next);
  }
});

server.use(middlewares);
server.use("/status", (req, res) => res.send({ status: "OK" }));

// Intercept POST requests to /notes
server.use(jsonServer.bodyParser);
server.post("/notes", (req, res, next) => {
  const noteText = req.body.text;

  // Get /me data from database
  const me = router.db.get("me").value();

  // Construct new note object
  const newNote = {
    id: Date.now().toString(), // Using timestamp for simplicity
    createdAt: Math.floor(Date.now() / 1000), // Current timestamp in seconds
    text: noteText,
    type: "userGenerated",
    author: {
      id: me.id,
      name: me.name,
      avatar: me.avatar,
    },
  };

  // Modify request body to include the new data
  req.body = newNote;

  next();
});
server.use("/me", (req, res) => res.send(router.db.get("me")));
server.use(router);

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`JSON Server is running at http://localhost:${PORT}`);
});
