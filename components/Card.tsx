import { largeText, mediumText, smallText } from '@/styles/Text'
import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid ${props => props.theme.colors.gray_200};
  padding: 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    color: ${props => props.theme.colors.primary_base}
  }
`

const Category = styled.h3`
  ${smallText}
`

const StyledLink = styled.a`
  ${mediumText}

  display: flex;
  align-items: center;
  padding-right: 22px;
  background: url('/arrow-up-right.png') no-repeat right;
  background-size: 10px;
  min-height: 16px;
  cursor: pointer;

  &:hover p {
    text-decoration: underline;
  }

  @media (max-width: ${props => props.theme.devices.s}) {
    & p {
      display: none;
    }
  }
`

const Title = styled.h2`
  ${largeText}

  margin-bottom: 16px;
`

const Description = styled.footer`
  ${mediumText}
  display: flex;
  width: 100%;

  & p {
    display: flex;
    align-items: center;
    text-align: left;
    color: ${props => props.theme.colors.gray_700};
    font-family: ${props => props.theme.fonts.secondary};
    font-weight: normal;
    padding-left: 24px;
    margin-right: 24px;
  }

  & p:first-child {
    background: url("/location.png") no-repeat left;
    background-size: 18px;
  }

  & p:last-child {
    background: url("/clock.png") no-repeat left;
    background-size: 18px;
  }
`

interface CardProps {
  category: string,
  title: string,
  city: string,
  time: string
}

const Card = (props: CardProps) => {

  const {category, title, city, time} = props

  return (
    <CardContainer>
      <div>
        <Category>
          {category}
        </Category>
        <StyledLink>
          <p>
            Stelle anzeigen
          </p>
        </StyledLink>
      </div>
      <Title>
        {title}
      </Title>
      <Description>
        <p>
          {city}
        </p>
        <p>
          {time}
        </p>
      </Description>
    </CardContainer>
  )
}

export default Card