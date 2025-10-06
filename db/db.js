require("dotenv").config({
	path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const { Pool } = require("pg");

const pool = new Pool({
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user:
		process.env.NODE_ENV === "test"
			? process.env.POSTGRES_TEST_USER
			: process.env.POSTGRES_USER,
	password:
		process.env.NODE_ENV === "test"
			? process.env.POSTGRES_TEST_PASSWORD
			: process.env.POSTGRES_PASSWORD,
	database:
		process.env.NODE_ENV === "test"
			? process.env.POSTGRES_TEST_DB
			: process.env.POSTGRES_DB,
});

module.exports = pool;
