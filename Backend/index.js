const express = require("express");
const app = express();
const mongoConnect = require("./db"); // Assuming this is a valid function to connect to MongoDB

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoConnect()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("hello world");
    });

    app.use(express.json());
    app.use('/api', require("./Routes/CreateUser")); // Assuming these are valid route handlers
    app.use('/api', require("./Routes/DisplayData"));

    app.listen(4001, () => {
      console.log("Server is running on port 4001");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
