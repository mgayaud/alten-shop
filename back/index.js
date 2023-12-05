const express = require("express");
const app = express();
const port = 3000;
const productsRouter = require("./routes/products");

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin",
						 "http://localhost:4200");
	res.header("Access-Control-Allow-Headers",
						 "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
						 "GET, POST, PATCH, DELETE");
	next();
});

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/products", productsRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Alten Shop backend listening at http://localhost:${port}`);
});
