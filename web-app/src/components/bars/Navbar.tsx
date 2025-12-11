import Link from "next/link";
import LogoutButton from "../buttons/LogoutButton";
import { betterAuthGetSeesion } from "@/lib/auth-client";
import { headers } from "next/headers";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  //   { name: "About", href: "/about" },
  //   { name: "Contact", href: "/contact" },
];

async function Navbar() {
  const { data: session, error } = await betterAuthGetSeesion({
    cookie: (await headers()).get("cookie") || "",
  });
  // console.log({ session, error });

  return (
    <nav>
      <ul className="flex justify-center items-center gap-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}

        {session && session?.user?.id ? (
          <>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>{session.user?.email}</li>
            <li>
              <LogoutButton />
            </li>
          </>
        ) : (
          <>
            <li></li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
      </ul>

      <pre className="text-xs">
        {/* {JSON.stringify({ session, error }, null, 2)} */}
      </pre>
    </nav>
  );
}

export default Navbar;
