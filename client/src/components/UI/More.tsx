import styled from "styled-components";

import { RiMoreLine } from "react-icons/ri";

interface CommentModalProps {
  handleModalOpen?: () => void;
}

function More({ handleModalOpen }: CommentModalProps) {
  return (
    <IconWrapper onClick={handleModalOpen}>
      <RiMoreLine />
    </IconWrapper>
  );
}

export default More;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  > svg {
    width: 20px;
    height: 20px;
  }
`;
