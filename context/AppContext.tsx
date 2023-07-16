import { createContext, useState } from 'react';

interface Job {
    id: string,
    department: string,
    title: string,
    cities: string[],
    types: string[],
    levels: string[]
}

export type AppContextType = {
    currentPage: number,
    setCurrentPage: (page: number) => void,
    jobs: Job[],
    setJobs: (jobs: Job[]) => void,
    totalPages: number,
    setTotalPages: (page: number) => void,
    selectedDepartment: string,
    selectedLevel: string,
    selectedCity: string,
    setSelectedDepartment: (department: string) => void,
    setSelectedLevel: (level: string) => void,
    setSelectedCity: (city: string) => void,
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [jobs, setJobs] = useState<Job[]>([])
    const [totalPages, setTotalPages] = useState<number>(10)
    const [selectedCity, setSelectedCity] = useState<string>('')
    const [selectedLevel, setSelectedLevel] = useState<string>('')
    const [selectedDepartment, setSelectedDepartment] = useState<string>('')

    const value = {
        currentPage,
        setCurrentPage,
        jobs,
        setJobs,
        totalPages,
        setTotalPages,
        selectedDepartment,
        selectedLevel,
        selectedCity,
        setSelectedDepartment,
        setSelectedLevel,
        setSelectedCity,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}