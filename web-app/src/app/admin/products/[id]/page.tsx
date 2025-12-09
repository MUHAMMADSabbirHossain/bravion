import DeleteButton from "@/components/buttons/DeleteButton";
import { cookies } from "next/headers";
import Link from "next/link";

async function AdminProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  //   console.log(id);

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
      AdminProductPage
      <section>
        <pre>{JSON.stringify(data, null, 2)}</pre>

        <div className=" flex gap-4">
          <Link
            href={`/admin/products/update/${id}`}
            className="border-4 rounded-2xl p-4 inline-block"
          >
            Update Product
          </Link>

          <DeleteButton
            deleteApiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/products/${id}`}
          />
        </div>
      </section>
    </>
  );
}

export default AdminProductPage;
