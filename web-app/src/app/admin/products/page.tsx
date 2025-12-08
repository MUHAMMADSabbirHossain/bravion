import { cookies } from "next/headers";
import Link from "next/link";

async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; limit: string }>;
}) {
  const { page = 1, limit = 10 } = await searchParams;
  // console.log({ page, limit });

  const cookieStore = await cookies();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/products/?page=${page}&limit=${limit}`,
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
  // console.log(data);

  return (
    <>
      <section>
        <div>
          <Link
            href="/admin/products/create"
            className="bg-green-500  p-2 rounded-lg"
          >
            Create Product
          </Link>
        </div>

        <div>
          <h1>All Products</h1>
          <ul className="flex gap-4 flex-wrap">
            {data.data.map((product: any) => (
              <li
                key={product.id}
                className="inline-block gap-4 border-2  rounded-2xl p-4"
              >
                <p>{product.id}</p>
                <p>Name: {product?.name}</p>
                <p>Titile: {product?.title}</p>
                <p>Description: {product?.description}</p>
                <p>Price: {product?.price}</p>
                <p>Slug: {product?.slug}</p>
                <Link
                  href={`/admin/products/${product.id}`}
                  className="bg-blue-500 p-2 rounded-lg"
                >
                  Update Product
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* <pre>{JSON.stringify(data?.pagination, null, 2)}</pre> */}

        <div className="flex gap-4">
          {data?.pagination?.hasPreviousPage && (
            <Link
              href={`/admin/products?page=${Number(page) - 1}&limit=${limit}`}
              className="bg-orange-500 p-2 rounded-lg"
            >
              Previous Page
            </Link>
          )}

          {data?.pagination?.hasNextPage && (
            <Link
              href={`/admin/products?page=${Number(page) + 1}&limit=${limit}`}
              className="bg-orange-500 p-2 rounded-lg"
            >
              Next Page
            </Link>
          )}
        </div>
      </section>
    </>
  );
}

export default ProductsPage;
