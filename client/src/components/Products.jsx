import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import { getProducts } from "../redux/apiCalls";

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    getProducts(cat)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [cat]);

  useEffect(() => {
    filters &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) => {
            const filterMatch = item[key + "s"].find(
              (obj) => obj.name === value
            );
            return filterMatch !== undefined;
          })
        )
      );
  }, [products, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [products, sort]);

  return (
    <Container>
      {filters
        ? filteredProducts.map((item) => <Product key={item._id} item={item} />)
        : products
            .slice(0, 7)
            .map((item) => <Product key={item._id} item={item} />)}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
`;

export default Products;
