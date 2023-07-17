import { smallText } from '@/styles/Text'
import styled from 'styled-components'

const PageButton = styled.div<{$isSelected: boolean}>`
  ${smallText}

  width: 40px;
  height: 40px;
  border-radius: 100px;
  background-color: ${props => (props.$isSelected)
    ? props.theme.colors.primary_75
    : 'transparent'};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => (props.$isSelected
    ? props.theme.colors.primary_base
    : props.theme.colors.gray_600)};
  transition: .3s;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.primary_75};
    color: ${props => props.theme.colors.primary_base};
  }
`

interface RenderPageProps {
  pagesToShow: number;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const RenderPageNumbers = (props: RenderPageProps) => {

  const {pagesToShow,
      currentPage,
      totalPages,
      setCurrentPage,} = props;

  const pageNumbers = [];

  const startPage = currentPage === 1 ? currentPage
    : totalPages <= pagesToShow * 2 ? 1
    : currentPage === totalPages ? (currentPage - pagesToShow + 1)
    : currentPage - pagesToShow + 2;

  const maxPage = currentPage === totalPages ? totalPages
    : totalPages - pagesToShow - 1 === currentPage ? totalPages
    : totalPages <= pagesToShow * 2 ? totalPages
    : currentPage === 1 ? (currentPage + pagesToShow - 1)
    : currentPage + 1;

  for (let page = startPage; page <= maxPage; page++) {
    pageNumbers.push(
      <PageButton
        key={page}
        onClick={() => setCurrentPage(page)}
        $isSelected={page == currentPage}
      >
        {page}
      </PageButton>
    )
  }

  if (totalPages - pagesToShow - 1 > currentPage
      && totalPages > pagesToShow * 2) {
    pageNumbers.push(
      <PageButton
        key="dots"
        $isSelected={false}
        onClick={() => setCurrentPage(totalPages)}
      >
        ...
      </PageButton>
    )
    for (let page = totalPages - pagesToShow + 2; 
      page <= totalPages; page++) {
      pageNumbers.push(
        <PageButton
          key={page}
          onClick={() => setCurrentPage(page)}
          $isSelected={page == currentPage}
        >
          {page}
        </PageButton>
      )
    }
  }

  if (totalPages - pagesToShow - 1 < currentPage
      && totalPages > pagesToShow * 2) {
    pageNumbers.unshift(
      <PageButton
        key="dots"
        $isSelected={false}
        onClick={() => setCurrentPage(1)}
      >
        ...
      </PageButton>
    )
    for (let page = 1 + pagesToShow - 2; 
      page >= 1; page--) {
      pageNumbers.unshift(
        <PageButton
          key={page}
          onClick={() => setCurrentPage(page)}
          $isSelected={page == currentPage}
        >
          {page}
        </PageButton>
      )
    }
  }
  return pageNumbers;
};

export default RenderPageNumbers;