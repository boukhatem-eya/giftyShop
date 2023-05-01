import { createContext, useContext, useMemo, useReducer, ReactNode } from 'react'

import Translation from '../hooks/getTranslation'

export interface stateType {
  selectedShop?: string
}
export interface actionType {
  type: string
  value?: boolean | any
}

const initalState = {
  Translation,
  selectedShop: ''
}

const reducer = (state: stateType, action: actionType) => {
  switch (action.type) {
    case 'SET_SHOP':
      return { ...state, selectedShop: action.value }

    default:
      return state
  }
}

export const UiContext = createContext<any>(null)

const UiContextProvider = UiContext.Provider

export const UiContextWrapper = ({ children }: { children?: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initalState)
  const setShop = (value: string) => {
    dispatch({ type: 'SET_SHOP', value })
  }

  const value = useMemo(
    () => ({
      ...state,
      setShop
    }),
    [state]
  )

  return <UiContextProvider value={value}>{children}</UiContextProvider>
}

export const useUiContext = () => useContext(UiContext)
