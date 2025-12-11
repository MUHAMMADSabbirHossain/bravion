"use client";

import { authClient } from "@/lib/auth-client";
import { updateCartItem } from "@/utility/shared";
import { redirect } from "next/navigation";

function AddToCartButton({ id }: { id: string }) {
  const {
    data: session,
    isPending,
    isRefetching,
    refetch,
    error,
  } = authClient.useSession();

  async function handleAddToCartButton() {
    console.log(id, session, error);

    if (session === null || !session?.user?.id || error !== null) {
      return redirect("/login");
    }
    updateCartItem(id, 1);
  }

  return (
    <button
      className="border-2 rounded-2xl p-2"
      onClick={handleAddToCartButton}
    >
      Add To Cart
    </button>
  );
}

export default AddToCartButton;
