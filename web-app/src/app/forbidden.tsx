import Link from "next/link";

function ForbiddenPage() {
  return (
    <>
      forbidden
      <section>
        You don&apos;t have permission to access this page.
        <button>
          <Link href="/dashboard">Go to Dashboard</Link>
        </button>
      </section>
    </>
  );
}

export default ForbiddenPage;
