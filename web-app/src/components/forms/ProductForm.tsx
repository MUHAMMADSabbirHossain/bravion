"use client";

import { ChangeEvent, FormEvent, useState } from "react";

function ProductForm() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    slug: "",
    title: "",
    description: "",
    price: 0,
  });

  function handleProductFormData(event: ChangeEvent<HTMLInputElement>) {
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value,
    });
  }

  async function handleProductFormSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(newProduct, document.cookie);

    const payload = {
      name: newProduct.name,
      slug: newProduct.slug,
      title: newProduct.title,
      description: newProduct.description,
      price: Number(newProduct.price).toFixed(2),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/products/post`,
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

        <button type="submit">Create Product</button>
      </form>
    </section>
  );
}

export default ProductForm;
