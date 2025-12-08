import Link from "next/link";

async function AdminPage() {
  return (
    <>
      AdminPage
      <section>
        <div className=" flex gap-4">
          <Link
            href={"/admin/products/"}
            className="border-4 rounded-2xl p-4 inline-block"
          >
            Products
          </Link>
          <Link
            href={"/admin/products/create"}
            className="border-4 rounded-2xl p-4 inline-block"
          >
            Create Product
          </Link>
          <Link
            href={"/admin/products"}
            className="border-4 rounded-2xl p-4 inline-block"
          >
            Read Product
          </Link>
        </div>
      </section>
    </>
  );
}

export default AdminPage;
