import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AuthType = "LOGIN" | "SIGNUP";

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
  authType: AuthType
  userLoginForm: UserLoginForm
  userSignupForm: UserSignupForm
  userLoginFormValidations: UserLoginFormValidation
  userSignupFormValidations: UserSignupFormValidation
  authValidationErrors: AuthValidationError
}

const initialState: AuthSliceState = {
  isLoggedIn: false,
  authType: "LOGIN",
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
    setLogin: (state) => {
      state.isLoggedIn = true;
      console.log("login reducer");
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      console.log("logout reducer");
    },
    setAuthType: (state, action: PayloadAction<AuthType>) => {
      state.authType = action.payload;
      console.log("AUTH TYPE ===>>>" + state.authType);
    },
    setLoginForm: (state, action: PayloadAction<UserLoginForm>) => {
      state.userLoginForm = action.payload;
      console.log("current login form => ")
      console.log(JSON.stringify(state.userLoginForm));
    },
    resetLoginForm: (state) => {
      state.userLoginForm = initialUserLoginForm;
    },
    setSignupForm: (state, action: PayloadAction<UserSignupForm>) => {
      state.userSignupForm = action.payload;
      console.log("current signup form => ")
      console.log(JSON.stringify(state.userSignupForm));
    },
    resetSignupForm: (state) => {
      state.userSignupForm = initialUserSignupForm;
    },
    setUserLoginFormValidations: (state, action: PayloadAction<UserLoginFormValidation>) => {
      state.userLoginFormValidations = action.payload;
    },
    setUserSignupFormValidations: (state, action: PayloadAction<UserSignupFormValidation>) => {
      state.userSignupFormValidations = action.payload;
    },
    setAuthValidationErrors: (state, action: PayloadAction<AuthValidationError>) => {
      state.authValidationErrors = action.payload;
    },
    unsetAuthValidationErrors: (state) => {
      state.authValidationErrors = initialAuthVlidationErrors;
    },
  }
})

export const { setLogin, setLogout, setAuthType, setLoginForm, resetLoginForm, setSignupForm, resetSignupForm, setUserLoginFormValidations, setUserSignupFormValidations, setAuthValidationErrors, unsetAuthValidationErrors } = authSlice.actions;

export default authSlice.reducer;