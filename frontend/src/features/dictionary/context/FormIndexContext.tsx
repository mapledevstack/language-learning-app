import { createContext, useContext } from "react"

export const FormIndexContext = createContext(0)

export const useFormIndex = () => useContext(FormIndexContext)
