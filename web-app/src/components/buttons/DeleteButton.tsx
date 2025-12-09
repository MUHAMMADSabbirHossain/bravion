"use client";

import { redirect } from "next/navigation";

function DeleteButton({ deleteApiUrl }: { deleteApiUrl: string }) {
  return (
    <button
      className="border-4 rounded-2xl p-4 inline-block"
      onClick={async () => {
        const shouldDelete = confirm(
          "Are you sure you want to delete this product?"
        );

        if (!shouldDelete) {
          return;
        }

        const response = await fetch(deleteApiUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // This automatically includes cookies
        });

        const data = await response.json();
        console.log(data);

        if (data?.success === true) {
          alert("Product deleted successfully.");
          redirect("/admin/products");
        } else {
          alert("Failed to delete product.");
        }
      }}
    >
      DeleteButton
    </button>
  );
}

export default DeleteButton;
