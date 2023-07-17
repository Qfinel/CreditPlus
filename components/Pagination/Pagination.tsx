import { smallText } from '@/styles/Text'
import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import RenderPageNumbers from './RenderPageNumbers'
import { AppContext } from '@/context/AppContext'
import { AppContextType } from '@/context/types'

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid ${props => props.theme.colors.gray_200};
  padding-top: 20px;
`

const ArrowButton = styled.button<{$isLeft: boolean}>`
  ${smallText}

  border: 0;
  color: ${props => props.theme.colors.gray_600};
  padding: ${props => props.$isLeft
    ? '0 0 0 28px'
    : '0 28px 0 0'};
  background: ${props => props.$isLeft
    ? 'url("/arrow-left.svg") no-repeat left'
    : 'url("/arrow-right.svg") no-repeat right'};
  background-size: 24px;
  cursor: pointer;

  @media (max-width: ${props => props.theme.devices.s}) {
    & p {
      display: none;
    }
  }
`

const PageNavigation = styled.div`
  display: flex;
`

const Pagination = () => {

  const {state, setCurrentPage} = useContext(AppContext) as AppContextType

  const [pagesToShow, setPagesToShow] = useState<number>(3)

  useEffect(() => {
  
    if (window.innerWidth < 650)
        setPagesToShow(2)
    else
        setPagesToShow(3)

    const handleResize = () => {
      if (window.innerWidth < 650)
        setPagesToShow(2)
      else
        setPagesToShow(3)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <PaginationContainer>
      <ArrowButton
        $isLeft={true}
        onClick={() => {
          if (state.currentPage !== 1)
            setCurrentPage(state.currentPage - 1);
        }}>
          <p>
            Vorherige
          </p>
      </ArrowButton>
      <PageNavigation>
        <RenderPageNumbers 
          currentPage={state.currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={state.totalPages}
          pagesToShow={pagesToShow}
        />
      </PageNavigation>
      <ArrowButton
        $isLeft={false}
        onClick={() => {
          if (state.currentPage !== state.totalPages)
            setCurrentPage(state.currentPage + 1);
        }}>
          <p>
            Nächste
          </p>
      </ArrowButton>
    </PaginationContainer>
  )
}

export default Pagination