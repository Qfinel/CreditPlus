'use client'

import styled from 'styled-components'
import { GlobalStyle } from "@/styles/GlobalStyle"
import { Theme, List, Header, Pagination } from '@/components'
import { AppContextProvider } from "@/context/AppContext"

const MainContainer = styled.main`
  width: 100%;
  padding: 60px 308px;

  @media (max-width: ${props => props.theme.devices.xl}) {
      padding: 60px 172px;
  }

  @media (max-width: ${props => props.theme.devices.m}) {
    padding: 60px 64px;
  }

  @media (max-width: ${props => props.theme.devices.s}) {
    padding: 60px 32px;
  }

  @media (max-width: ${props => props.theme.devices.xs}) {
    padding: 60px 16px;
  }
`

export default function Home() {
  return (
    <Theme>
      <AppContextProvider>
        <GlobalStyle />
        <Header />
        <MainContainer>
          <List />
          <Pagination />
        </MainContainer>
      </AppContextProvider>
    </Theme>
  )
}
