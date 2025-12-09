"use client";

import { ChangeEvent, FormEvent, useState } from "react";

function ProductForm({
  product: initialProduct,
  mode,
}: {
  product: any;
  mode: string;
}) {
  const [newProduct, setNewProduct] = useState({
    name: initialProduct?.name ?? "",
    // slug: initialProduct?.slug ?? "",
    title: initialProduct?.title ?? "",
    description: initialProduct?.description ?? "",
    price: initialProduct?.price ?? 0,
  });
  console.log(initialProduct, mode);

  function handleProductFormData(event: ChangeEvent<HTMLInputElement>) {
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value,
    });
  }

  async function handleProductFormSubmit(event: FormEvent) {
    event.preventDefault();
    // console.log(newProduct, document.cookie);

    const payload = {
      id: initialProduct?.id,
      name: newProduct.name,
      // slug: newProduct.slug,
      title: newProduct.title,
      description: newProduct.description,
      price: Number(newProduct.price).toFixed(2),
    };

    if (mode === "create") {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // This automatically includes cookies
          body: JSON.stringify(newProduct),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data?.success === true) {
        alert("Product created successfully");
      } else {
        alert("Failed to create product");
      }
    } else {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/products/${initialProduct?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // This automatically includes cookies
          body: JSON.stringify(newProduct),
        }
      );

      const data = await response.json();
      console.log(data);

      if (data?.success === true) {
        alert("Product updated successfully");
      } else {
        alert("Failed to update product");
      }
    }
  }

  return (
    <section>
      <h1>ProductForm</h1>

      <form onSubmit={handleProductFormSubmit}>
        <fieldset>
          <legend>Product </legend>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct?.name}
              onChange={handleProductFormData}
            />
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newProduct?.title}
              onChange={handleProductFormData}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={newProduct?.description}
              onChange={handleProductFormData}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Prodcut Price</legend>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct?.price}
              onChange={handleProductFormData}
            />
          </div>
        </fieldset>

        {mode === "create" ? (
          <button type="submit">Create Product</button>
        ) : (
          <button type="submit">Update Product</button>
        )}
      </form>
    </section>
  );
}

export default ProductForm;
