import { createSlice } from "@reduxjs/toolkit";

export interface UserLoginFormValidation {
  email: boolean
  password: boolean
}

const initialUserLoginFormValidations: UserLoginFormValidation = {
  email: false,
  password: false
}

export interface UserSignupFormValidation {
  username: boolean
  email: boolean
  password: boolean
  isPasswordMatch: boolean
}

const initialUserSignupFormValidations: UserSignupFormValidation = {
  username: false,
  email: false,
  password: false,
  isPasswordMatch: false
}

export interface AuthValidationError {
  username?: string[]
  email?: string[]
  password?: string
  isPasswordMatch?: string
}

const initialAuthVlidationErrors: AuthValidationError = {

}



export interface UserLoginForm {
  email: string | null
  password: string | null
}

export interface UserSignupForm {
  username: string | null
  email: string | null
  password: string | null
  confirmPassword: string | null
}

const initialUserLoginForm: UserLoginForm = {
  email: null,
  password: null,
}

const initialUserSignupForm: UserSignupForm = {
  username: null,
  email: null,
  password: null,
  confirmPassword: null,
}


interface AuthSliceState {
  isLoggedIn: boolean
  userLoginForm: UserLoginForm
  userSignupForm: UserSignupForm
  userLoginFormValidations: UserLoginFormValidation
  userSignupFormValidations: UserSignupFormValidation
  authValidationErrors: AuthValidationError
}

const initialState: AuthSliceState = {
  isLoggedIn: false,
  userLoginForm: initialUserLoginForm,
  userSignupForm: initialUserSignupForm,
  userLoginFormValidations: initialUserLoginFormValidations,
  userSignupFormValidations: initialUserSignupFormValidations,
  authValidationErrors: initialAuthVlidationErrors,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      console.log("login reducer");
    },
    logout: (state) => {
      state.isLoggedIn = false;
      console.log("logout reducer");
    }
  }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;