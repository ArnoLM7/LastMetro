const express = require("express");
const pool = require("./db/db");

const router = express.Router();

// Récupérer tous les utilisateurs
router.get("/", async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
});

// Récupérer un utilisateur par ID
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
		if (result.rows.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Créer un utilisateur
router.post("/", async (req, res) => {
	try {
		const { username, email } = req.body;
		const result = await pool.query(
			"INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *",
			[username, email]
		);
		res.status(201).json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Mettre à jour un utilisateur
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { username, email } = req.body;
		const result = await pool.query(
			"UPDATE users SET username=$1, email=$2 WHERE id=$3 RETURNING *",
			[username, email, id]
		);
		if (result.rows.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Supprimer un utilisateur
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const result = await pool.query(
			"DELETE FROM users WHERE id = $1 RETURNING *",
			[id]
		);
		if (result.rows.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json({ message: "User deleted" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
