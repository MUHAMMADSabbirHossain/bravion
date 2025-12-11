import Link from "next/link";

function UnauthorizedPage() {
  return (
    <>
      UnauthorizedPage
      <section>
        <p>Please log in to access this page.</p>
        <button>
          <Link href="/login">Login </Link>
        </button>
      </section>
    </>
  );
}

export default UnauthorizedPage;
