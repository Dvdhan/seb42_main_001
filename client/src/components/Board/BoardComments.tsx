import styled from 'styled-components';

import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2';

interface BoardCommentsProps {
  comment?: number;
}

function BoardComments({ comment }: BoardCommentsProps) {
  return (
    <CommentsWrapper>
      <HiOutlineChatBubbleOvalLeft />
      <CommentsCount>{comment}</CommentsCount>
    </CommentsWrapper>
  );
}

export default BoardComments;

const CommentsWrapper = styled.div`
  margin-right: var(--medium);
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    margin-right: 3vw;
  }

  svg {
    margin-right: 5px;
    color: var(--color-main);
    font-size: var(--medium);
    @media only screen and (max-width: 768px) {
      font-size: 4vw;
    }
  }
`;

const CommentsCount = styled.div`
  font-size: var(--x-small);
  font-weight: var(--weight-medium);
  color: var(--color-main);

  @media only screen and (max-width: 768px) {
    font-size: 4vw;
  }
`;
