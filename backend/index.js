require("dotenv").config();
require("./db");
const express = require("express");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const compliantRoutes = require("./routes/compliant");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8000;
app.use(authRoutes);
app.use(userRoutes);
app.use(compliantRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
