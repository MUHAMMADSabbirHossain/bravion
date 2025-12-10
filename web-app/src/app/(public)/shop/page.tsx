import { cookies } from "next/headers";
import Link from "next/link";

async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; limit: string }>;
}) {
  const { page = 1, limit = 10 } = await searchParams;

  const cookieStore = await cookies();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/?page=${page}&limit=${limit}`,
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
        <h1 className="text-2xl font-bold text-center">All Products</h1>
        <div>
          <ul className="flex gap-4 flex-wrap">
            {data.data.map((product: any) => (
              <li
                key={product.id}
                className="inline-block gap-4 border-2  rounded-2xl p-4"
              >
                <p>Name: {product?.name}</p>
                <p>Titile: {product?.title}</p>
                <p>Description: {product?.description}</p>
                <p>Price: {product?.price}</p>
                <Link
                  href={`/shop/${product?.slug}/?productId=${product?.id}`}
                  className="bg-orange-500 p-2 rounded-lg block text-center"
                >
                  View Product
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-4">
          {data?.pagination?.hasPreviousPage && (
            <Link
              href={`/shop?page=${Number(page) - 1}&limit=${limit}`}
              className="bg-orange-500 p-2 rounded-lg"
            >
              Previous Page
            </Link>
          )}

          {data?.pagination?.hasNextPage && (
            <Link
              href={`/shop?page=${Number(page) + 1}&limit=${limit}`}
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

export default ShopPage;
