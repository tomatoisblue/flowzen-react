import { useAppDispatch, useAppSelector } from "../hooks";
import { AuthType, UserLoginForm, UserLoginFormValidation, UserSignupForm, UserSignupFormValidation, resetAllAuthenticationForms, resetAllValidationState, resetLoginForm, resetSignupForm, setAuthType, setFalseUniqueFields, setFalseUserLoginFormValidations, setFalseUserSignupFormValidations, setLogin, setLoginForm, setSignupForm, setTrueOtherValidationErrors, setTrueUniqueFields, setTrueUserLoginFormValidations, setTrueUserSignupFormValidations, } from "../features/authSlice";
import { LoginProps, login } from "../components/login";
import { SignupProps, signup } from "../components/signup";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AppThunkDispatch } from "../store/store";
import { emailValidation } from "../validation/users/emailValidation";
import { authValidationErrorMessages } from "../constants/authValidationErrorMessages";
import { passwordValidation } from "../validation/users/passwordValidation";
import { usernameValidation } from "../validation/users/usernameValidation";
import { passwordMatchValidation } from "../validation/users/passwordMatchValidation";

export const useAuthenticationForm = () => {
  const dispatch: AppThunkDispatch = useAppDispatch();
  const authType: AuthType = useAppSelector((state) => state.auth.authType);
  const userLoginForm: UserLoginForm = useAppSelector((state) => state.auth.userLoginForm);
  const userSignupForm: UserSignupForm = useAppSelector((state) => state.auth.userSignupForm);
  // const authValidationErrors: AuthValidationError = useAppSelector((state) => state.auth.authValidationErrors);
  const navigate: NavigateFunction = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (authType === "LOGIN") {
      dispatch(setLoginForm({...userLoginForm, [e.target.name]: e.target.value}))
    } else {
      dispatch(setSignupForm({...userSignupForm, [e.target.name]: e.target.value}))
    }
  }

  // const clearValidationErrors = async(): Promise<void> => {
  //   dispatch(clearAuthValidationErrors());
  // }

  const handleSubmit: () => Promise<void> = async () => {
    dispatch(resetAllValidationState())
    // validation
    let validationResult: boolean = false;
    if (authType === "LOGIN") {
      validationResult = loginValidate()
    } else {
      validationResult = signupValidate()
    }
    // const validationResult = await validate();
    if (!validationResult) {
      return;
    }

    // submission
    let submissionResult: boolean = false;
    let errors: string[] = [];
    if (authType === "LOGIN") {
      const loginProps: LoginProps = {
        email: userLoginForm.email!,
        password: userLoginForm.password!
      }
      submissionResult = await login(loginProps);
    } else {
      const signupProps: SignupProps = {
        username: userSignupForm.username!,
        email: userSignupForm.email!,
        password: userSignupForm.password!,
        confirmPassword: userSignupForm.confirmPassword!
      };

      [submissionResult, errors] = await signup(signupProps);
      console.log("submissionResult: " + submissionResult)
      console.log("errors: " + JSON.stringify(errors))
    }
    if (submissionResult) {
      console.log("handleSubmit Succeeded")

      // dispatch(clearAuthValidationErrors());
      dispatch(resetAllValidationState());
      dispatch(resetAllAuthenticationForms());

      if (authType === "LOGIN") {
        dispatch(setLogin())
        navigate("/dashboard");
      } else {
        dispatch(setAuthType("LOGIN"));
        navigate(0);
      }
    } else {
      if (authType === "LOGIN") {
      // const key = "unauthorized";
      // dispatch(setAuthValidationErrors({...authValidationErrors, [key]: authValidationErrorMessages[key as keyof AuthValidationError]}));
      dispatch(setTrueOtherValidationErrors("unauthorized"))
      } else {
        if (errors.length > 0) {
          errors.map((error) => {
            switch (error) {
              case "UniqueEmail":
                // dispatch(setAuthValidationErrors({...authValidationErrors, ["emailUnique"]: authValidationErrorMessages.emailUnique}));
                dispatch(setFalseUniqueFields("email"))
                break;
              case "UniqueUsername":
                // dispatch(setAuthValidationErrors({...authValidationErrors, ["usernameUnique"]: authValidationErrorMessages.usernameUnique}));
                dispatch(setFalseUniqueFields("username"))
                break;
              default:
                console.log("signup unique elements key error")
            }
          })
        } else {
          // const key = "somethingBad";
          // dispatch(setAuthValidationErrors({...authValidationErrors, [key]: authValidationErrorMessages[key as keyof AuthValidationError]}));
          dispatch(setTrueOtherValidationErrors("somethingBad"))
        }
      }
    }
  }


  const loginValidate = (): boolean => {

    // const loginValidations: UserLoginFormValidation = {email: false, password: false};
    let tmpResult: boolean = false;
    let flag: boolean = true;

    Object.keys(userLoginForm).map((key) => {
      switch (key) {
        case "email":
          tmpResult = emailValidation(userLoginForm[key]!)
          break;
        case "password":
          // Password validation is disabled
          // that's why this always returns true
          tmpResult = true;
          break;
        default:
          console.log("login form validation key error");
      }
      if (tmpResult) {
        dispatch(setTrueUserLoginFormValidations(key as keyof UserLoginFormValidation));
      } else {
        dispatch(setFalseUserLoginFormValidations(key as keyof UserLoginFormValidation));
        flag = false;
      }
    })
    return flag;

    // Object.keys(userLoginForm).map((key) => {
    //   switch (key) {
    //     case "email":
    //       console.log("validation key : " + key)
    //       loginValidations[key] = emailValidation(userLoginForm[key]!);
    //       if (loginValidations[key]) {
    //         dispatch(setTrueUserLoginFormValidations(key));
    //         // dispatch(unsetAuthValidationErrors(key));
    //         // syncDispatch(unsetAuthValidationErrors(key));
    //       } else {
    //         flag = false;
    //         dispatch(setFalseUserLoginFormValidations(key));
    //         // dispatch(setAuthValidationErrors({...authValidationErrors, [key]: authValidationErrorMessages[key as keyof AuthValidationError]}));
    //         // syncDispatch(setAuthValidationErrors({...authValidationErrors, [key]: authValidationErrorMessages[key as keyof AuthValidationError]}));
    //       }
    //       break;
    //     case "password":
    //       console.log("validation key : " + key)
    //       loginValidations[key] = passwordValidation(userLoginForm[key]!);
    //       if (loginValidations[key]) {
    //         dispatch(setTrueUserLoginFormValidations(key));
    //         // dispatch(unsetAuthValidationErrors(key));
    //       } else {
    //         flag = false;
    //         dispatch(setFalseUserLoginFormValidations(key));
    //         // dispatch(setAuthValidationErrors({...authValidationErrors, [key]: authValidationErrorMessages[key as keyof AuthValidationError]}));
    //       }
    //       break;
    //     default:
    //       console.log("validation keys error")
    //   }
    // });
  }

  const signupValidate = (): boolean => {

    // const signupValidations: UserSignupFormValidation = {username: false, usernameUnique: false, email: false, emailUnique: false, password: false, isPasswordMatch: false};
    let tmpResult: boolean = true;
    let flag: boolean = true;
    Object.keys(userSignupForm).map((key) => {
      switch (key) {
        case "username":
          tmpResult = usernameValidation(userSignupForm[key]!);
          break;
        case "email":
          tmpResult = emailValidation(userSignupForm[key]!);
          break;
        case "password":
          tmpResult = passwordValidation(userSignupForm[key]!);
          break;
        case "confirmPassword":
          if (userSignupForm["password"] !== null && userSignupForm["confirmPassword"] !== null) {
            tmpResult = passwordMatchValidation(userSignupForm["password"]!, userSignupForm["confirmPassword"]!);
          } else {
            tmpResult = false;
          }
          break;
        default:
          console.log("signup validation key error")
      }
      if (tmpResult) {
        dispatch(setTrueUserSignupFormValidations(key as keyof UserSignupFormValidation));
      } else {
        dispatch(setFalseUserSignupFormValidations(key as keyof UserSignupFormValidation));
        flag = false;
      }

    })

    return flag;
    // Object.keys(userSignupForm).map((key) => {
    //   switch (key) {
    //     case "username":
    //       signupValidations[key] = usernameValidation(userSignupForm[key]!);
    //       if (signupValidations[key]) {
    //         // dispatch(unsetAuthValidationErrors(key));
    //         dispatch(setTrueUserSignupFormValidations(key));
    //       } else {
    //         flag = false;
    //         // dispatch(setAuthValidationErrors({...authValidationErrors, [key]: authValidationErrorMessages[key as keyof AuthValidationError]}));
    //         dispatch(setFalseUserSignupFormValidations(key));
    //       }
    //       break;
    //     case "email":
    //       // regex validation
    //       signupValidations[key] = emailValidation(userSignupForm[key]!);
    //       if (signupValidations[key]) {
    //         // dispatch(unsetAuthValidationErrors(key));
    //         dispatch(setTrueUserSignupFormValidations(key));
    //       } else {
    //         flag = false;
    //         // dispatch(setAuthValidationErrors({...authValidationErrors, [key]: authValidationErrorMessages[key as keyof AuthValidationError]}));
    //         dispatch(setFalseUserSignupFormValidations(key));
    //       }
    //       break;
    //     case "password":
    //       signupValidations[key] = passwordValidation(userSignupForm[key]!);
    //       if (signupValidations[key]) {
    //         // dispatch(unsetAuthValidationErrors(key));
    //         dispatch(setTrueUserSignupFormValidations(key));
    //       } else {
    //         flag = false;
    //         dispatch(setFalseUserSignupFormValidations(key));
    //         // dispatch(setAuthValidationErrors({...authValidationErrors, [key]: authValidationErrorMessages[key as keyof AuthValidationError]}));
    //       }
    //       break;
    //     case "confirmPassword":
    //       // eslint-disable-next-line no-case-declarations
    //       if (userSignupForm["password"] !== null && userSignupForm["confirmPassword"] !== null) {
    //         signupValidations[key] = passwordMatchValidation(userSignupForm["password"]!, userSignupForm["confirmPassword"]!);
    //       } else {
    //         signupValidations[key] = false;
    //       }
    //       if (signupValidations[key]) {
    //         dispatch(unsetAuthValidationErrors(key));
    //       } else {
    //         flag = false;
    //         dispatch(setAuthValidationErrors({...authValidationErrors, [key]: authValidationErrorMessages[key]}));
    //       }
    //       break;
    //     default:
    //       console.log("validation keys error... key: " + key)
    //   }
    // });

    // if (flag) {
    //   signupValidations.usernameUnique = await usernameUniqueValidation(userSignupForm.username!);
    //   if (signupValidations.usernameUnique) {
    //     dispatch(unsetAuthValidationErrors("usernameUnique"));
    //   } else {
    //     flag = false;
    //     dispatch(setAuthValidationErrors({...authValidationErrors, ["usernameUnique"]: authValidationErrorMessages.usernameUnique}));
    //   }

    //   signupValidations.emailUnique = await emailUniqueValidation(userSignupForm.email!);
    //   if (signupValidations.emailUnique) {
    //     dispatch(unsetAuthValidationErrors("emailUnique"));
    //   } else {
    //     flag=false;
    //     dispatch(setAuthValidationErrors({...authValidationErrors, ["emailUnique"]: authValidationErrorMessages.emailUnique}));
    //   }
    // }

  }

  return [{handleChange, handleSubmit}] as const;
}
