import React from "react";
import DrinksInfo from "./DrinksItemBox";
import DrinksBody from "./DrinksItemBody";
import DrinksLevel from "./DrinksItemLevel";
import Card from "../../UI/Card";
import styled from "styled-components";

function DrinksItem() {
  return (
    <Margin>
      <Card>
        <ItemContainer>
          <DrinksInfo />
          <DrinksBody />
          <DrinksLevel />
        </ItemContainer>
      </Card>
    </Margin>
  );
}

export default DrinksItem;

const ItemContainer = styled.div`
  width: 320px;
  height: 490px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Margin = styled.div`
  margin-bottom: var(--xxx-large);
`;
