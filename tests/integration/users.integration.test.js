const request = require("supertest");
const app = require("../../server");
const pool = require("../../db/db");

beforeAll(async () => {
	await pool.query("DELETE FROM users;");
});

afterAll(async () => {
	await pool.end();
});

describe("🧩 Integration - Users API", () => {
	it("should create and retrieve a user from the database", async () => {
		// Crée un utilisateur via l’API
		const createRes = await request(app)
			.post("/users")
			.send({ username: "integration_user", email: "int@test.com" });

		expect(createRes.statusCode).toBe(201);
		expect(createRes.body.username).toBe("integration_user");

		// Récupère l’utilisateur depuis l’API
		const getRes = await request(app).get(`/users/${createRes.body.id}`);
		expect(getRes.statusCode).toBe(200);
		expect(getRes.body.email).toBe("int@test.com");
	});
});
