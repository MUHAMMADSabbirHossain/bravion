/* External Modules */
import express from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
/* Internal Modules */
import { auth } from "../lib/auth.js";
import { corsOptions } from "../utility/cors.options.js";
export const app = express();
/* Middlewares */
app.use(cors(corsOptions));
// Mount express json middleware after Better Auth handler
app.all("/api/auth/{*any}", toNodeHandler(auth));
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());
app.get("/", (req, res) => {
    console.log("Response sent");
    res.send("Hello World!!");
});
app.get("/ping", (req, res) => {
    console.log("Pong.");
    res.send("pong");
});
// TODO: not woking
app.post("/admin/create-user", async (req, res) => {
    console.log(req.body);
    // const { email, password, name, role } = req.body;
    const newUser = await auth.api.createUser({
        body: {
            email: "user@example.com", // required
            password: "some-secure-password", // required
            name: "James Smith", // required
            // role: "user",
            data: { customField: "customValue" },
        },
    });
    console.log(newUser);
    res.send({ message: "User created successfully", user: newUser });
});
//# sourceMappingURL=server.js.map