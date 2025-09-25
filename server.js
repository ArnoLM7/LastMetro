const express = require("express");
const pool = require("./db/db");
const app = express();
const usersRouter = require("./users");

app.use(express.json());

app.get("/", (req, res) => {
	return res.status(200).send({
		message: "Hello World!",
	});
});

app.use("/users", usersRouter);

app.get("/test-db", async (req, res) => {
	try {
		const result = await pool.query("SELECT NOW()");
		res.json({ success: true, time: result.rows[0] });
	} catch (err) {
		console.error(err);
		res.status(500).json({ success: false, error: err.message });
	}
});

app.listen(process.env.PORT || 5000, () => {
	console.log(`API running on port ${process.env.PORT || 5000}`);
});

module.exports = app;
