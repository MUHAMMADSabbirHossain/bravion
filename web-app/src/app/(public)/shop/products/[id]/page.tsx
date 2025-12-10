async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ productId: string }>;
}) {
  const { productId } = await searchParams;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${productId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
          <h1>Name: {data?.data?.product?.title}</h1>
          <p>Description: {data?.data?.product?.description}</p>
          <p>Price: ${data?.data?.product?.price}</p>
        </div>
      </section>
    </>
  );
}

export default ProductPage;
