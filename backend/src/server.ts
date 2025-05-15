import { server } from "./index.js";

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
