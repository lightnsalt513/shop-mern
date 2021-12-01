import styled from "styled-components/macro";
import { categories } from "../data";
import { mobile } from "../styles/responsive";
import CategoryItem from "./CategoryItem";

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItemStyled key={item.id} item={item} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 0 20px;
  margin: 20px 0;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })};
`;

const CategoryItemStyled = styled(CategoryItem)`
  flex: 1;
`;

export default Categories;
