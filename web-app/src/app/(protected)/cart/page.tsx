import { headers } from "next/headers";

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
  console.log(data);

  return (
    <>
      <ul className="flex gap-4">
        {data?.data?.cart?.items.map((item: any) => (
          <li key={item.id} className="border-2  rounded-2xl p-4">
            <p>{item?.product?.name}</p>
            <p>Description: {item?.product?.description}</p>
            <p>Quentity: {item.quantity}</p>
            <p>Price: ${item?.product?.price}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CartPage;
