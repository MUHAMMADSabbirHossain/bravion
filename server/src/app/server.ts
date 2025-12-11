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
  "/api/v1/admin/products",
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

app.get(
  "/api/v1/admin/products",
  verifyAuth,
  verifyAdmin,
  async (req: Request, res: Response) => {
    // console.log(req.query.page, req.query.limit);
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    // Validate query parameters (optional but recommended)
    if (pageNumber < 1 || limitNumber < 1) {
      return res.status(400).json({
        error: "Page and limit must be positive numbers.",
        data: null,
        success: false,
        message: "Bad Request",
        status: 400,
        pagination: null,
      });
    }

    const products = await prisma.product.findMany({
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });
    // console.log products );

    const totalProducts = await prisma.product.count();
    const totalPages = Math.ceil(totalProducts / limitNumber);
    const hasNextPage = pageNumber < totalPages;
    const hasPreviousPage = pageNumber > 1;

    res.send({
      status: 200,
      data: products,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalItems: totalProducts,
        hasNextPage,
        hasPreviousPage,
        limit: limitNumber,
      },
      success: true,
      error: null,
      message: "Products fetched successfully",
    });
  }
);

app.get(
  "/api/v1/admin/products/:productId",
  verifyAuth,
  verifyAdmin,
  async (req: Request, res: Response) => {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        error: "Product id is required",
        data: null,
        pagination: null,
        success: false,
        message: "Bad Request",
        status: 400,
      });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
        data: null,
        pagination: null,
        success: false,
        message: "Not Found",
        status: 404,
      });
    }

    res.status(200).send({
      status: 200,
      data: product,
      pagination: null,
      success: true,
      error: null,
      message: "Product fetched successfully",
    });
  }
);

app.put(
  "/api/v1/admin/products/:id",
  verifyAuth,
  verifyAdmin,
  async (
    req: Request<{ id: string }, {}, Prisma.ProductCreateInput>,
    res: Response
  ) => {
    console.log("Request Body:", req.body);
    const { id } = req.params;

    const {
      name = null,
      // slug = null, // do not take slug input from client
      title = null,
      description = null,
      price = null,
    } = req.body;

    // Validate ID is provided
    if (!id) {
      return res.status(400).json({
        status: 400,
        message: "Product ID is required.",
        success: false,
        data: null,
        pagination: null,
        error: "Missing ID",
      });
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        slug: generateSlug(name || ""),
        title,
        description,
        price: Number(price).toFixed(2),
      },
    });

    res.status(200).json({
      status: 200,
      message: "Product updated successfully", // Or "created" if it was a new upsert
      success: true,
      data: { product: updatedProduct },
      pagination: null,
      error: null,
    });
  }
);

app.delete(
  "/api/v1/admin/products/:id",
  verifyAuth,
  verifyAdmin,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: 400,
        message: "Product ID is required.",
        success: false,
        data: null,
        pagination: null,
        error: "Bad Request",
      });
    }

    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    });
    console.log(deletedProduct);

    res.status(200).json({
      status: 200,
      message: "Product deleted successfully",
      success: true,
      data: { product: deletedProduct },
      pagination: null,
      error: null,
    });
  }
);

app.get("/api/v1/products", async (req: Request, res: Response) => {
  // console.log(req.query.page, req.query.limit);
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  // Validate query parameters (optional but recommended)
  if (pageNumber < 1 || limitNumber < 1) {
    return res.status(400).json({
      error: "Page and limit must be positive numbers.",
      data: null,
      success: false,
      message: "Bad Request",
      status: 400,
      pagination: null,
    });
  }

  const products = await prisma.product.findMany({
    skip: (pageNumber - 1) * limitNumber,
    take: limitNumber,
  });
  // console.log products );

  const totalProducts = await prisma.product.count();
  const totalPages = Math.ceil(totalProducts / limitNumber);
  const hasNextPage = pageNumber < totalPages;
  const hasPreviousPage = pageNumber > 1;

  res.send({
    status: 200,
    data: products,
    pagination: {
      currentPage: pageNumber,
      totalPages,
      totalItems: totalProducts,
      hasNextPage,
      hasPreviousPage,
      limit: limitNumber,
    },
    success: true,
    error: null,
    message: "Products fetched successfully",
  });
});

app.get("/api/v1/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);

  if (!id) {
    return res.status(400).json({
      status: 400,
      message: "Product ID is required.",
      success: false,
      data: null,
      pagination: null,
      error: "Bad Request",
    });
  }

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    return res.status(404).json({
      status: 404,
      message: "Product not found",
      success: false,
      data: null,
      pagination: null,
      error: "Not Found",
    });
  }

  res.status(200).json({
    status: 200,
    message: "Product fetched successfully",
    success: true,
    data: { product },
    pagination: null,
    error: null,
  });
});

app.put(
  "/api/v1/cart/items",
  verifyAuth,
  async (req: Request, res: Response) => {
    console.log(req.body);

    const { productId, productQuantity } = req.body;
    const userId = req.user.id;
    console.log(userId);

    if (!userId || !productId || productQuantity < 0) {
      return res.status(400).send({
        message: "Invalid request inputs",
        data: null,
        success: false,
        error: "Bad Request",
        status: 400,
        pagination: null,
      });
    }

    const userCart = await prisma.cart.upsert({
      where: {
        userId: userId,
      },
      create: {
        userId: userId,
      },
      update: {},
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    console.log({ userCart });

    // Now, upsert the specific item within the user's cart
    // This uses upsert on the CartItem model
    let updatedCartItem;
    if (productQuantity === 0) {
      // If quantity is 0, delete the item from the cart
      updatedCartItem = await prisma.cartItem
        .delete({
          where: {
            cartId_productId: {
              // Use the composite unique key
              cartId: userCart.id,
              productId: productId,
            },
          },
          include: {
            product: true, // Include product details for the response
          },
        })
        .catch((e) => {
          // If the item doesn't exist, delete will throw an error
          // We can ignore this error if the goal is just to ensure it's removed
          if (e.code === "P2025") {
            // Record to delete does not exist
            console.log("Item to delete was not found in cart, ignoring.");
            return null; // Return null or handle as needed
          }
          throw e; // Re-throw if it's a different error
        });
    } else {
      // If quantity > 0, upsert the item (create or update)
      updatedCartItem = await prisma.cartItem.upsert({
        where: {
          cartId_productId: {
            // Use the composite unique key
            cartId: userCart.id,
            productId: productId,
          },
        },
        create: {
          cartId: userCart.id, // Link to the user's cart
          productId: productId, // Link to the specific product
          quantity: productQuantity, // Set the initial quantity
        },
        update: {
          quantity: productQuantity, // Update the quantity if the item exists
          // You could also update updatedAt here if needed
        },
        include: {
          product: true, // Include product details for the response
        },
      });
    }
    console.log({ updatedCartItem });

    // Fetch the *updated* cart state to return the final list of items
    // This ensures the response reflects the state after the upsert/delete operation
    const finalCartState = await prisma.cart.findUnique({
      where: { id: userCart.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.status(200).send({
      status: 200,
      message: "Cart item updated successfully",
      success: true,
      data: {
        cart: finalCartState, // Return the updated cart state
        updatedItem: updatedCartItem, // Return details of the item that was upserted/deleted (might be null if deleted and didn't exist)
      },
      error: null,
      pagination: null,
    });
  }
);

app.get("/api/v1/cart", verifyAuth, async (req: Request, res: Response) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId: req.user.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  // console.log(cart);

  if (!cart) {
    return res.status(404).send({
      status: 404,
      message: "Cart not found",
      success: false,
      data: null,
      pagination: null,
      error: "Not Found",
    });
  }

  res.status(200).send({
    status: 200,
    message: "Cart fetched successfully",
    success: true,
    data: { cart },
    error: null,
    pagination: null,
  });
});
