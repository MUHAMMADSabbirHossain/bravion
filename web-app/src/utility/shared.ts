export async function updateCartItem(
  productId: string,
  productQuantity: number
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart/items`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // This automatically includes cookies
      body: JSON.stringify({
        productId: productId,
        productQuantity: productQuantity,
      }),
    }
  );
  const data = await response.json();
  console.log(data);

  if (data?.success === true) {
    alert("Product added to cart successfully.");
  } else {
    alert("Failed to add product to cart.");
  }
}
