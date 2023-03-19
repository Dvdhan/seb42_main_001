import styled from "styled-components";

import { IoMdHeartEmpty } from "react-icons/io";

interface BoardLikesProps {
  like: number | undefined;
}

function BoardLikes({ like }: BoardLikesProps) {
  return (
    <LikesWrapper>
      <IoMdHeartEmpty />
      <LikesCount>{like}</LikesCount>
    </LikesWrapper>
  );
}

export default BoardLikes;

const LikesWrapper = styled.div`
  margin-right: var(--medium);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 5px;
    color: var(--color-main);
    font-size: var(--medium);
  }
`;

const LikesCount = styled.div`
  font-size: var(--x-small);
  font-weight: var(--weight-medium);
  color: var(--color-main);
`;
