"use client";

import { updateCartItem } from "@/utility/shared";
import { useState } from "react";

function CartItems({ data }) {
  const [items, setItems] = useState(data?.data?.cart?.items || []);
  const [isUpdatedItem, setUpdatedItem] = useState(false);

  const handleChangeCartItem = (event) => {
    // console.log(event.target.value, event.target.id);

    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === event.target.id) {
          setUpdatedItem(true);

          // console.log(item.id, event.target.id);
          return {
            ...item,
            quantity: parseInt(event.target.value),
            isUpdated: true,
          };
        }

        return item;
      });
    });
  };

  async function handleSaveCart() {
    // console.log(items);

    items.forEach(async (item) => {
      if (item.isUpdated === true) {
        // console.log(item.id, item.quantity);
        updateCartItem(item?.product?.id, item.quantity);

        setItems((prevItems) => {
          return prevItems.map((item) => {
            if (item.id === event.target.id) {
              return {
                ...item,
                isUpdated: false,
              };
            }

            return item;
          });
        });
      }
    });

    if (isUpdatedItem) {
      setUpdatedItem(false);
      return;
    }
  }

  return (
    <>
      <h1>All Cart Items</h1>

      <ul className="flex gap-4">
        {items.map((item) => (
          <li key={item.id} className="border-2  rounded-2xl p-4">
            <p>
              {item?.product?.name} ({item?.product?.title})
            </p>
            <p>Description: {item?.product?.description}</p>
            <p>
              <label htmlFor="quantity">Quentity: </label>
              <input
                type="number"
                defaultValue={item?.quantity}
                name="quantity"
                id={item?.id}
                onChange={handleChangeCartItem}
              />
            </p>
            <p>Price: ${item?.product?.price}</p>
          </li>
        ))}
      </ul>

      {isUpdatedItem && <button onClick={handleSaveCart}>Save Cart</button>}
      {/* <pre>{JSON.stringify(data?.data?.cart?.items, null, 2)}</pre> */}
    </>
  );
}

export default CartItems;
