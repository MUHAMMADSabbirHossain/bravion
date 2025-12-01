export const corsOptions = {
  origin: "http://localhost:3000", // Adjust according frontend URL before deployment
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  // allowedHeaders: ["Content-Type", "Authorization"],
};
