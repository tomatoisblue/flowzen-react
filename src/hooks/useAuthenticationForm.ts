import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import { AuthType, AuthValidationError, UserLoginForm, UserSignupForm, resetLoginForm, resetSignupForm, setAuthType, setLogin, setLoginForm, setSignupForm, unsetAuthValidationErrors } from "../features/authSlice";
import { LoginProps, login } from "../components/login";
import { SignupProps, signup } from "../components/signup";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AppThunkDispatch } from "../store/store";

export const useAuthenticationForm = () => {
  const dispatch: AppThunkDispatch = useAppDispatch();
  const authType: AuthType = useAppSelector((state) => state.auth.authType);
  const userLoginForm: UserLoginForm = useAppSelector((state) => state.auth.userLoginForm);
  const userSignupForm: UserSignupForm = useAppSelector((state) => state.auth.userSignupForm);
  const authValidationErrors: AuthValidationError = useAppSelector((state) => state.auth.authValidationErrors);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    console.log("authValidationErrors")
    console.log(JSON.stringify(authValidationErrors))

  }, [authValidationErrors])



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (authType === "LOGIN") {
      dispatch(setLoginForm({...userLoginForm, [e.target.name]: e.target.value}))
    } else {
      dispatch(setSignupForm({...userSignupForm, [e.target.name]: e.target.value}))
    }
  }


  const handleSubmit: () => Promise<void> = async () => {
    // validation
    // const validationResult = await validate();
    // if (!validationResult) {
    //   return;
    // }

    // submission
    let submissionResult: boolean = false;
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
      }
      submissionResult = await signup(signupProps);
    }
    if (submissionResult) {
      console.log("handleSubmit Succeeded")

      dispatch(unsetAuthValidationErrors());
      dispatch(resetLoginForm())
      dispatch(resetSignupForm())

      if (authType === "LOGIN") {
        dispatch(setLogin())
        navigate("/dashboard");
      } else {
        dispatch(setAuthType("LOGIN"));
        navigate(0);
      }
    }
  }

  // const validate = async (): Promise<boolean> => {
  //   const taskFormValidations: TaskFormValidation = {title: false, status: false, description: false, expirationDate: false, url: false};
  //   let flag: boolean = true;
  //   Object.keys(userLoginForm).map((key) => {
  //     switch (key) {
  //       case "title":
  //         taskFormValidations[key] = taskTitleValidation(userLoginForm[key]);
  //         console.log("validate title : " + taskFormValidations[key]);
  //         if (taskFormValidations[key]) {
  //           dispatch(unsetTaskFormValidationErrors(key));
  //         } else {
  //           flag = false;
  //           dispatch(setTaskFormValidationErrors({...authValidationErrors, [key]: taskValidationErrorMessages[key as keyof TaskValidationError]}));
  //         }
  //         break;
  //       case "status":
  //         taskFormValidations[key] = true;
  //         break;
  //       case "description":
  //         taskFormValidations[key]= taskDescriptionValidation(userLoginForm[key]!);
  //         if (taskFormValidations[key]) {
  //           dispatch(unsetTaskFormValidationErrors(key));
  //         } else {
  //           flag = false;
  //           dispatch(setTaskFormValidationErrors({...authValidationErrors, [key]: taskValidationErrorMessages[key as keyof TaskValidationError]}));
  //         }
  //         break;
  //       case "expirationDate":
  //         taskFormValidations[key] = true;
  //         break;
  //       case "url":
  //         taskFormValidations[key] = taskUrlValidation(userLoginForm[key]!);
  //         if (taskFormValidations[key]) {
  //           dispatch(unsetTaskFormValidationErrors(key));
  //         } else {
  //           flag = false;
  //           dispatch(setTaskFormValidationErrors({...authValidationErrors, [key]: taskValidationErrorMessages[key as keyof TaskValidationError]}));
  //         }
  //         break;
  //       default:
  //         console.log("validation keys error")
  //     }
  //   });

  //   return flag;
  // }

  return [{handleChange, handleSubmit}] as const;
}
