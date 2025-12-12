import { headers } from "next/headers";
import CartItems from "./CartItems";

async function CartPage() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: (await headers()).get("cookie") || "",
      },
      credentials: "include", // This automatically includes cookies
    }
  );
  const data = await response.json();
  // console.log(data);

  return (
    <>
      <CartItems data={data} />
    </>
  );
}

export default CartPage;
