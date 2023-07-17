import { useContext } from 'react'
import styled from 'styled-components'
import Filter from './Filter'
import { mediumText, smallText } from '@/styles/Text'
import { AppContext } from '@/context/AppContext'
import { AppContextType } from '@/context/types'
import useApiOptions from '@/hooks/useApiOptions'

const HeaderContainer = styled.header`
    background-color: ${props => props.theme.colors.gray_75};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 180px 256px 60px;

    @media (max-width: ${props => props.theme.devices.xl}) {
        padding: 130px 128px 80px;
    }

    @media (max-width: ${props => props.theme.devices.m}) {
        padding: 130px 64px 80px;
    }

    @media (max-width: ${props => props.theme.devices.s}) {
        padding: 100px 32px 70px;
    }

    @media (max-width: ${props => props.theme.devices.xs}){
        padding: 80px 16px 60px;
    }
`

const SubHeading = styled.h3`
    ${mediumText}
    color: ${props => props.theme.colors.primary_base};

    @media (max-width: ${props => props.theme.devices.xs}) {
        ${smallText}
    }
`

const Heading = styled.h1`
    color: ${props => props.theme.colors.secondary};
    font-family: ${props => props.theme.fonts.primary};
    font-weight: bold;
    font-size: 48px;
    line-height: 68px;
    letter-spacing: -1.44px;
    user-select: none;
    margin-top: 2px;

    @media (max-width: ${props => props.theme.devices.m}) {
        margin-top: 6px;
        font-size: 36px;
        line-height: 44px;
        letter-spacing: -1.08px;
    }

    @media (max-width: ${props => props.theme.devices.xs}){
        font-size: 30px;
        line-height: 36px;
        letter-spacing: -0.6px;
    }
`

const Flex = styled.div`
    display: flex;
    gap: 24px;
    align-items: center;
    margin-top: 24px;
    width: 100%;

    @media (max-width: ${props => props.theme.devices.m}) {
        gap: 20px;
    }

    @media (max-width: ${props => props.theme.devices.s}){
        flex-direction: column;
    }

    @media (max-width: ${props => props.theme.devices.xs}){
        gap: 12px;
    }
`

const Header = () => {

  const {state, setSelectedCity,
    setSelectedDepartment,
    setSelectedLevel,
    setCurrentPage} = useContext(AppContext) as AppContextType

  const levels = useApiOptions('/api/levels', 'Erfahrungslevel');
  const departments = useApiOptions('/api/departments', 'Bereich');
  const cities = useApiOptions('/api/cities', 'Stadt');

  return (
    <HeaderContainer>
        <SubHeading>
            56 offene Stellen bei Creditplus
        </SubHeading>
        <Heading>
            Hier beginnt deine Zukunft
        </Heading>
        <Flex>
            <Filter
                filterValue={state.selectedDepartment}
                setFilterValue={setSelectedDepartment}
                setCurrentPage={setCurrentPage}
                options={departments}
                />
            <Filter
                filterValue={state.selectedCity}
                setFilterValue={setSelectedCity}
                setCurrentPage={setCurrentPage}
                options={cities}
                />
            <Filter
                filterValue={state.selectedLevel}
                setFilterValue={setSelectedLevel}
                setCurrentPage={setCurrentPage}
                options={levels}
                />
        </Flex>
    </HeaderContainer>
  )
}

export default Header