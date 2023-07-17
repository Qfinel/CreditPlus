import { createContext, useReducer } from 'react';
import {AppState, AppAction, AppContextType, Job} from './types'

const initialState: AppState = {
    currentPage: 1,
    jobs: [],
    totalPages: 10,
    selectedDepartment: '',
    selectedLevel: '',
    selectedCity: '',
}

const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
      case 'SET_CURRENT_PAGE':
        return { ...state, currentPage: action.payload };
      case 'SET_JOBS':
        return { ...state, jobs: action.payload };
      case 'SET_TOTAL_PAGES':
        return { ...state, totalPages: action.payload };
      case 'SET_SELECTED_DEPARTMENT':
        return { ...state, selectedDepartment: action.payload };
      case 'SET_SELECTED_LEVEL':
        return { ...state, selectedLevel: action.payload };
      case 'SET_SELECTED_CITY':
        return { ...state, selectedCity: action.payload };
      default:
        return state;
    }
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({children}: {children: React.ReactNode}) => {

    const [state, dispatch] = useReducer(appReducer, initialState);

    const setCurrentPage = (page: number) => {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
    };
  
    const setJobs = (jobs: Job[]) => {
      dispatch({ type: 'SET_JOBS', payload: jobs });
    };
  
    const setTotalPages = (pages: number) => {
      dispatch({ type: 'SET_TOTAL_PAGES', payload: pages });
    };
  
    const setSelectedCity = (city: string) => {
      dispatch({ type: 'SET_SELECTED_CITY', payload: city });
    };
  
    const setSelectedLevel = (level: string) => {
      dispatch({ type: 'SET_SELECTED_LEVEL', payload: level });
    };
  
    const setSelectedDepartment = (department: string) => {
      dispatch({ type: 'SET_SELECTED_DEPARTMENT', payload: department });
    };

    const contextValue: AppContextType = {
      state,
      setCurrentPage,
      setJobs,
      setTotalPages,
      setSelectedCity,
      setSelectedLevel,
      setSelectedDepartment,
    };
  
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}