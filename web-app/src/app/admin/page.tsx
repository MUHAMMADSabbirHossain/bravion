import Link from "next/link";

async function AdminPage() {
  return (
    <>
      AdminPage
      <section>
        <div className="border-4 rounded-2xl p-4 inline-block">
          <p className="text-center">Products</p>
          <Link href={"/admin/products/create"}>Create Product</Link>
        </div>
      </section>
    </>
  );
}

export default AdminPage;
