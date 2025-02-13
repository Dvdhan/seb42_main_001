import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { setSearchTag } from '../../../../redux/slice/drinks/drinksListSlice'

interface Tags {
  tagId: number;
  tagName?: string;
  onClick?: () => void;
  setPage: (state: number) => void;
};

function DrinksTags({ tagId, tagName, setPage }: Tags) {
  const dispatch = useDispatch()

  const handleTagSearchValueChange = () => {
    dispatch(setSearchTag(tagId))
    setPage(1)
  }

  return (
    <TagsContainer>
      <div onClick={handleTagSearchValueChange}>{tagName}</div>
    </TagsContainer>
  );
}

export default DrinksTags;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  
  div {
    cursor: pointer;
    border: 1px solid var(--color-main);
    color: var(--color-main);
    border-radius: 200px;
    font-size: var(--text-x-small);
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .5s;

    &:hover {
      transition: .5s;
      background-color: var(--color-white);
    }
  }
`;
