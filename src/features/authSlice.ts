import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AuthType = "LOGIN" | "SIGNUP";

export interface UserLoginFormValidation {
  email: boolean
  password: boolean
}

const initialUserLoginFormValidations: UserLoginFormValidation = {
  email: true,
  password: true
}

export interface UserSignupFormValidation {
  username: boolean
  usernameUnique: boolean
  email: boolean
  emailUnique: boolean
  password: boolean
  confirmPassword: boolean
}

export interface UniqueField {
  username: boolean
  email: boolean
}

const initialUserSignupFormValidations: UserSignupFormValidation = {
  username: true,
  usernameUnique: true,
  email: true,
  emailUnique: true,
  password: true,
  confirmPassword: true
}

const initialUniqueFields: UniqueField = {
  username: true,
  email: true
}

export interface OtherValidationError {
  unauthorized: boolean
  somethingBad: boolean
}

const initialOtherValidationErrors: OtherValidationError = {
  unauthorized: false,
  somethingBad: false,
}

// export interface AuthValidationError = {
//   username?: string
//   usernameUnique?: string
//   email?: string
//   emailUnique?: string
//   password?: string
//   confirmPassword?: string
//   unauthorized?: string
//   somethingBad?: string
// }

// export type AuthValidationErrorField = "username" | "usernameUnique" | "email" | "emailUnique" | "password" | "confirmPassword" | "unauthorized" | "somethingBad";

// export type AuthValidationError = { [key: AuthValidationErrorField]: string};

// const initialAuthVlidationErrors: AuthValidationError = {

// }

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
  uniqueFields: UniqueField
  otherValidationErrors: OtherValidationError
  // authValidationErrors: AuthValidationError
}

const initialState: AuthSliceState = {
  isLoggedIn: false,
  authType: "LOGIN",
  userLoginForm: initialUserLoginForm,
  userSignupForm: initialUserSignupForm,
  userLoginFormValidations: initialUserLoginFormValidations,
  userSignupFormValidations: initialUserSignupFormValidations,
  // authValidationErrors: initialAuthVlidationErrors,
  uniqueFields: initialUniqueFields,
  otherValidationErrors: initialOtherValidationErrors,
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
      state.userLoginFormValidations = initialUserLoginFormValidations;
      state.userSignupFormValidations = initialUserSignupFormValidations;
      console.log("AUTH TYPE ===>>>" + state.authType);
    },
    setLoginForm: (state, action: PayloadAction<UserLoginForm>) => {
      state.userLoginForm = action.payload;
    },
    resetLoginForm: (state) => {
      state.userLoginForm = initialUserLoginForm;
    },
    setSignupForm: (state, action: PayloadAction<UserSignupForm>) => {
      state.userSignupForm = action.payload;
    },
    resetSignupForm: (state) => {
      state.userSignupForm = initialUserSignupForm;
    },
    setTrueUserLoginFormValidations: (state, action: PayloadAction<keyof UserLoginFormValidation>) => {
      state.userLoginFormValidations[action.payload] = true;
    },
    setFalseUserLoginFormValidations: (state, action: PayloadAction<keyof UserLoginFormValidation>) => {
      state.userLoginFormValidations[action.payload] = false;
    },
    setTrueUserSignupFormValidations: (state, action: PayloadAction<keyof UserSignupFormValidation>) => {
      state.userSignupFormValidations[action.payload] = true;
    },
    setFalseUserSignupFormValidations: (state, action: PayloadAction<keyof UserSignupFormValidation>) => {
      state.userSignupFormValidations[action.payload] = false;
    },
    setTrueUniqueFields: (state, action: PayloadAction<keyof UniqueField>) => {
      state.uniqueFields[action.payload] = true;
    },
    setFalseUniqueFields: (state, action: PayloadAction<keyof UniqueField>) => {
      state.uniqueFields[action.payload] = false;
    },
    setTrueOtherValidationErrors: (state, action: PayloadAction<keyof OtherValidationError>) => {
      state.otherValidationErrors[action.payload] = true;
    },
    setFalseOtherValidationErrors: (state, action: PayloadAction<keyof OtherValidationError>) => {
      state.otherValidationErrors[action.payload] = false;
    },
    resetAllValidationState: (state) => {
      state.userLoginFormValidations = initialUserLoginFormValidations;
      state.userSignupFormValidations = initialUserSignupFormValidations;
      state.uniqueFields = initialUniqueFields;
      state.otherValidationErrors = initialOtherValidationErrors;
    },
    resetAllAuthenticationForms: (state) => {
      state.userLoginForm = initialUserLoginForm;
      state.userSignupForm = initialUserSignupForm;
    }

    // setUserSignupFormValidations: (state, action: PayloadAction<UserSignupFormValidation>) => {
    //   state.userSignupFormValidations = action.payload;
    // },
    // setAuthValidationErrors: (state, action: PayloadAction<AuthValidationError>) => {
    //   state.authValidationErrors = action.payload;
    //   // console.log("set AuthValidationErrors=>");

    //   console.log(JSON.stringify(state.authValidationErrors));
    // },
    // unsetAuthValidationErrors: (state, action: PayloadAction<keyof AuthValidationError>) => {
    //   delete state.authValidationErrors[action.payload];
    //   // console.log("unset AuthValidationErrors key:" + action.payload + " =>");
    //   // console.log(JSON.stringify(state.authValidationErrors));
    // },
    // clearAuthValidationErrors: (state) => {
    //   state.authValidationErrors = initialAuthVlidationErrors;
    //   console.log("auth validation errors cleared");
    // }
  },
})

// export const { setLogin, setLogout, setAuthType, setLoginForm, resetLoginForm, setSignupForm, resetSignupForm, setUserLoginFormValidations, setUserSignupFormValidations, setAuthValidationErrors, unsetAuthValidationErrors, clearAuthValidationErrors } = authSlice.actions;
export const { setLogin,
               setLogout,
               setAuthType,
               setLoginForm,
               resetLoginForm,
               setSignupForm,
               resetSignupForm,
               setTrueUserLoginFormValidations,
               setFalseUserLoginFormValidations,
               setTrueUserSignupFormValidations,
               setFalseUserSignupFormValidations,
               setTrueUniqueFields,
               setFalseUniqueFields,
               setTrueOtherValidationErrors,
               setFalseOtherValidationErrors,
               resetAllValidationState,
               resetAllAuthenticationForms,
              } = authSlice.actions;


export default authSlice.reducer;