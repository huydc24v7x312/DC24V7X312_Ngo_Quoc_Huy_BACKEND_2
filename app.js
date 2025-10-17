const express = require("express");
const cors = require("cors");
const Contactservice = require("./app/services/contact.service");
const MongoDB = require("./app/utils/mongodb.util");
const ApiError = require("./app/api-error");
const app = express();
const contactsRouter = require("./app/routes/contact.route");
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
res.json({ message: "Welcome to contact book application." }); 
});
app.use("/api/contacts", contactsRouter);

// 404 Resource not found
app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error"
  });
});

module.exports = app;
