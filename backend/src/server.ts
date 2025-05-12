import { server } from "./index.js";

const PORT = process.env.PORT || 5000;

console.log(`Database: ${process.env.DATABASE_URL}`);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
