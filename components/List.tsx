import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import Card from './Card'
import { AppContext, AppContextType } from '@/context/AppContext'
import { mediumText } from '@/styles/Text'

const FlexList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
    margin-bottom: 48px;

    @media (max-width: ${props => props.theme.devices.xs}) {
        gap: 10px;
    }
`

const ErrorText = styled.p`
    ${mediumText}
    width: 100%;
    text-align: center;
    color: ${props => props.theme.colors.gray_700};
`

const List = () => {

  const { jobs, setJobs,
    setTotalPages,
    selectedCity,
    selectedDepartment,
    selectedLevel,
    currentPage } = useContext(AppContext) as AppContextType

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await fetch('/api/jobs', {
            method: 'POST',
            body: JSON.stringify({
                department: selectedDepartment,
                city: selectedCity,
                level: selectedLevel
            })
        })

        const data = await response.json()

        setJobs(data)
        
        if (data.length !== 0) {
          const additionalPage = data.length % 5 === 0 ? 0 : 1
          setTotalPages(Math.floor(data.length / 5) + additionalPage)
        } else {
          setTotalPages(1)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getJobs()
  }, [selectedCity, selectedDepartment, selectedLevel])

  const startIndex = (currentPage - 1) * 5
  const endIndex = (currentPage - 1) * 5 + 5

  const currentJobs = jobs.slice(startIndex, endIndex);

  return (
    <FlexList>
        {jobs.length > 0
          ?  currentJobs.map((job) => (
                <Card 
                    key={job.id}
                    category={job.department}
                    title={job.title}
                    time={job.types.join('/')}
                    city={job.cities.join(', ')}/>
            ))
          :  (
            <ErrorText>
                No Jobs Found
            </ErrorText>
          )}
    </FlexList>
  )
}

export default List