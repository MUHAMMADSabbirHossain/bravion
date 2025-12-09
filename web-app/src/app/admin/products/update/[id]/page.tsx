import ProductForm from "@/components/forms/ProductForm";
import { cookies } from "next/headers";

async function AdminProductUpdatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  //   console.log({ id });

  const cookieStore = await cookies();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/products/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      credentials: "include", // This automatically includes cookies
    }
  );
  const data = await response.json();
  console.log(data);

  return (
    <>
      <ProductForm product={data?.data} mode="update" />
    </>
  );
}

export default AdminProductUpdatePage;
