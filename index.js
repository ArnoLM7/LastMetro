const app = require("./server");

const PORT = process.env.PORT || 5000;

app.listen(PORT || 5000, "0.0.0.0", () => {
	console.log(`🚀 Server running on port ${PORT}`);
});
