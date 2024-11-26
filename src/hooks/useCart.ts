import { useCookies } from "react-cookie";
import { ProductType } from "../types";
import { useEffect, useMemo, useState } from "react";
import { getProduct } from "../utils/api";

type CartType = ProductType & { count: number };

const COOKIE_KEY = "cart";

const useCart = () => {
  const [cookies, setCookies] = useCookies([COOKIE_KEY]);
  const [carts, setCarts] = useState<CartType[]>([]);
  const productIds = useMemo(
    () => (cookies[COOKIE_KEY] as string[]) ?? [],
    [cookies]
  );
  const addCarts = (id: string) => {
    const nextCartIds = [...productIds, id];
    setCookies(COOKIE_KEY, nextCartIds, {
      path: "/",
    });
  };

  useEffect(() => {
    if (productIds && productIds.length) {
      const requestList: Array<Promise<any>> = [];
      const requestsIds = productIds.reduce(
        (acc, cur) => acc.set(cur, (acc.get(cur) || 0) + 1),
        new Map<string, number>()
      );
      Array.from(requestsIds.keys()).forEach((id) => {
        requestList.push(getProduct(id));
      });

      Promise.all(requestList).then((responseList) => {
        const cartsData: CartType[] = responseList.map((response) => ({
          ...response.product,
          count: requestsIds.get(response.id),
        }));
        setCarts(cartsData);
      });
    }
  }, [productIds]);

  const changeCount = (productId: string, mode: "increase" | "decrease") => {
    const index = productIds.indexOf(productId);
    if (index === -1) {
      return;
    }
    if (mode === "decrease") {
      const tempArr = [...productIds];
      tempArr.splice(index, 1);
      if (!tempArr.includes(productId)) {
        return;
      }
      setCookies(COOKIE_KEY, tempArr, {
        path: "/",
      });
    }
    if (mode === "increase") {
      setCookies(COOKIE_KEY, [...productIds, productId], {
        path: "/",
      });
    }
  };

  return {
    carts,
    addCarts,
    changeCount,
  };
};
export default useCart;
