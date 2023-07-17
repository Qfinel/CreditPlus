export interface Job {
    id: string,
    department: string,
    title: string,
    cities: string[],
    types: string[],
    levels: string[]
}

export type AppState = {
    jobs: Job[],
    currentPage: number,
    totalPages: number,
    selectedDepartment: string,
    selectedLevel: string,
    selectedCity: string,
}

export type AppAction =
    | { type: 'SET_CURRENT_PAGE'; payload: number }
    | { type: 'SET_JOBS'; payload: Job[] }
    | { type: 'SET_TOTAL_PAGES'; payload: number }
    | { type: 'SET_SELECTED_DEPARTMENT'; payload: string }
    | { type: 'SET_SELECTED_LEVEL'; payload: string }
    | { type: 'SET_SELECTED_CITY'; payload: string }


export type AppContextType = {
    state: AppState,
    setCurrentPage: (page: number) => void,
    setJobs: (jobs: Job[]) => void,
    setTotalPages: (pages: number) => void,
    setSelectedCity: (city: string) => void,
    setSelectedLevel: (level: string) => void,
    setSelectedDepartment: (department: string) => void,
}