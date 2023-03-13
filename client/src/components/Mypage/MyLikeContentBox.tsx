import styled from "styled-components";
import MyPageContentBox from "./MyPageContentBox";

const MyLikeContentBox = () => {
  return (
    <MyLikeContentBoxContainer>
      <MyPageContentBox></MyPageContentBox>
      <MyPageContentBox></MyPageContentBox>
      <MyPageContentBox></MyPageContentBox>
      <MyPageContentBox></MyPageContentBox>
      <MyPageContentBox></MyPageContentBox>
    </MyLikeContentBoxContainer>
  );
};

export default MyLikeContentBox;

const MyLikeContentBoxContainer = styled.div`
  width: 100%;
  height: 610px;
  overflow: overlay;
  &::-webkit-scrollbar {
    display: none;
  }
`;
