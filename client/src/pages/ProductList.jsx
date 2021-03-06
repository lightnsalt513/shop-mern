import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import { CommonSelect } from "../styles/common";
import { mobile } from "../styles/responsive";

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    if (value === "All" || value === "Sort") {
      setFilters({
        ...filters,
        [e.target.name]: null,
      });
      return;
    }

    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Title>{cat && (
        <>
          {cat}
          <Link to="/products">Show all products</Link>
        </>
      )}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="size" onChange={handleFilters} defaultValue="All">
            <Option>All</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)} defaultValue="Sort">
            <Option>Sort</Option>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
    </Container>
  );
};

const Container = styled.div``;

const Title = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;
  text-transform: capitalize;
  a {
    color: inherit;
    font-size: 16px;
    ${mobile({ fontSize: '14px' })}
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled(CommonSelect)`
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option``;

export default ProductList;
