const request = require("supertest");
const app = require("../server");

describe("Users API", () => {
	it("should return Hello World on /", async () => {
		const res = await request(app).get("/");
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe("Hello World!");
	});

	it("should create a new user", async () => {
		const res = await request(app)
			.post("/users")
			.send({ username: "testuser", email: "test@example.com" });

		expect(res.statusCode).toBe(201);
		expect(res.body.username).toBe("testuser");
		expect(res.body.email).toBe("test@example.com");
	});
});
