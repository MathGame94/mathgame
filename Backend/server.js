const express = require("express");
const cors = require("cors");
const gameRouter = require("./routers/games");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/game", gameRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
