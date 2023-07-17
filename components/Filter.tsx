import { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { mediumText } from '@/styles/Text'

const SelectContainer = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
  user-select: none;
`

const Select = styled.button<{$isOpen: boolean}>`
  ${mediumText}
  width: 100%;
  background-color: white;
  padding: 9px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: ${props => (
    props.$isOpen
    ? `1px solid ${props.theme.colors.primary_300}`
    : '1px solid #c3c3c3;')};
  color: ${props => (
    props.$isOpen
    ? props.theme.colors.gray_900
    : props.theme.colors.gray_600)};
  cursor: pointer;

  & img {
    transition: .3s;
    transform: ${props => (props.$isOpen ? 'rotate(180deg)' : '')};
    user-select: none;
  }

  &:hover {
    border: 1px solid #838383;
    color: ${props => props.theme.colors.gray_900};
  }

  &:focus {
    border: 1px solid ${props => props.theme.colors.primary_300};
    outline: ${props => (props.$isOpen ? 'none'
      : `4px solid ${props.theme.colors.primary_100}`)};
    color: ${props => props.theme.colors.gray_900};
  }
`

const Dropdown = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 3px 9px #00000029;
  background-color: white;
  margin-top: 8px;
  overflow: hidden;
  animation: ease-in-out .3s;
`

const Option = styled.button<{$isSelected: boolean}>`
  ${mediumText}
  border: 0;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  padding: 9px 15px;
  color: ${props => (
    props.$isSelected ? props.theme.colors.primary_700
    : props.theme.colors.gray_900
  )};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.primary_50};
    color: ${props => props.theme.colors.primary_700};
  }

  & img {
    margin-right: 4px;
    user-select: none;
  }
`

interface FilterProps {
  filterValue: string,
  setFilterValue: (value: string) => void,
  setCurrentPage: (page: number) => void,
  options: string[]
}

const Filter = (props: FilterProps) => {

  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false)

  const {filterValue, setFilterValue, setCurrentPage, options} = props

  const handleOptionClick = (option: string) => {
    setIsOpenDropdown(false);
    setCurrentPage(1);
    if (option === options[0]) {
      setFilterValue("");
    } else {
      setFilterValue(option);
    }
  };

  return (
    <SelectContainer>
      <Select
        $isOpen={isOpenDropdown}
        onBlur={() => setIsOpenDropdown(false)}
        onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
          {filterValue || options[0]}
        <Image 
          src="/angle-down.svg"
          alt="angle down"
          width={20}
          height={20}
          />
      </Select>
 
      {isOpenDropdown &&
        <Dropdown>
          {options.map((option, index) => (
            <Option $isSelected={option === filterValue} 
              key={index}
              onClick={() => handleOptionClick(option)}>
                {option}
              {(filterValue === option) &&
                <Image 
                  src="/check.png"
                  alt="checkmark"
                  width={13}
                  height={13}
                />}
            </Option>
          ))}
        </Dropdown>}
    </SelectContainer>
  )
}

export default Filter