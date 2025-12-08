/* External Modules */
import express, { type Request, type Response } from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";

/* Internal Modules */
import { auth } from "../lib/auth.js";
import { corsOptions } from "../utility/cors.options.js";
import { Prisma } from "../../generated/prisma/client.js";
import { verifyAdmin, verifyAuth } from "../utility/auth.middlewares.js";
import { prisma } from "../lib/prisma.js";
import { generateSlug } from "../utility/common.js";

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

app.post(
  "/api/v1/admin/products/post",
  verifyAuth,
  verifyAdmin,
  async (req: Request<{}, {}, Prisma.ProductCreateInput>, res: Response) => {
    console.log(req.body);

    const {
      name = null,
      // slug = null, do not set slug from client
      title = null,
      description = null,
      price = null,
    } = req.body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        slug: generateSlug(name || ""),
        title,
        description,
        price: Number(price).toFixed(2),
      },
    });
    console.log(newProduct);

    if (!newProduct) {
      return res.status(400).send({
        message: "Product not created",
        success: false,
        data: null,
        error: "Bad Request",
        status: 400,
      });
    }

    res.status(201).send({
      status: 201,
      message: "Product created successfully",
      success: true,
      data: {
        product: newProduct,
      },
      error: null,
    });
  }
);
