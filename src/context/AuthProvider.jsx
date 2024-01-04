import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
    user: null,
    isAuth: false
}

const FAKE_USER = {
    name: 'Amir',
    email: 'user@gmail.com',
    password: '123456'
}

const userReducer = (state, { type, payload }) => {
    switch (type) {
        case "login":
            return {
                user: payload,
                isAuth: true
            }
        case "logout":
            return {
                user: null,
                isAuth: false
            }

        default:
            throw new Error("Unknown action: " + type)
    }
}

export default function AuthProvider({ children }) {
    const [{ user, isAuth }, dispatch] = useReducer(userReducer, initialState)
    const login = (email, password) => {
        console.log(email, password)
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: 'login', payload: FAKE_USER })
        }
    }

    const logout = () => {
        dispatch({ type: 'logout' })

    }

    return <AuthContext.Provider value={{ user, isAuth, login, logout }}>{children}</AuthContext.Provider>
}


export const useAuth = () => {
    return useContext(AuthContext)
}