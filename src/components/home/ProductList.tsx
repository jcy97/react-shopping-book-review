import { useEffect, useState } from "react";
import { ProductType } from "../../types";
import ProductItem from "./ProductItem";
import { CircularProgress, Grid } from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id: number) => {
    fetch(`/product/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
      }
    });
  };
  const handleUpdate = (updateProduct: ProductType) => {
    fetch(`/product/${updateProduct.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    }).then((response) => {
      if (response.ok) {
        setProducts(
          products.map((product) =>
            product.id === updateProduct.id ? updateProduct : product
          )
        );
      }
    });
  };
  useEffect(() => {
    setIsLoading(true);
    fetch(`/product`)
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <CircularProgress />;

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Grid>
  );
};
export default ProductList;
