import { Button, Input } from "@material-tailwind/react";
import Card, { CardBody, CardHeader } from "@material-tailwind/react/components/Card";
import Tabs, { Tab, TabPanel, TabsBody, TabsHeader } from "@material-tailwind/react/components/Tabs";
import Typography from "@material-tailwind/react/components/Typography";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loginFormFields, signupFormFields } from "../constants/userFormField";
import { AuthType, AuthValidationError, OtherValidationError, UniqueField, UserLoginForm, UserLoginFormValidation, UserSignupForm, UserSignupFormValidation, setAuthType } from "../features/authSlice";
import { useAuthenticationForm } from "../hooks/useAuthenticationForm";
import { authValidationErrorMessages } from "../constants/authValidationErrorMessages";


const AuthenticationForm: React.FC = () => {
  const authType: AuthType = useAppSelector((state) => state.auth.authType);
  const loginForm: UserLoginForm = useAppSelector((state) => state.auth.userLoginForm);
  const signupForm: UserSignupForm = useAppSelector((state) => state.auth.userSignupForm);
  // const authValidationErrors: AuthValidationError = useAppSelector((state) => state.auth.authValidationErrors)
  const [{ handleChange, handleSubmit }] = useAuthenticationForm();
  const userLoginFormValidations: UserLoginFormValidation = useAppSelector((state) => state.auth.userLoginFormValidations);
  const userSignupFormValidations: UserSignupFormValidation = useAppSelector((state) => state.auth.userSignupFormValidations);
  const uniqueFields: UniqueField = useAppSelector((state) => state.auth.uniqueFields);
  const otherValidationErrors: OtherValidationError = useAppSelector((state) => state.auth.otherValidationErrors);

  const dispatch = useAppDispatch();

  return (
    <Card className="w-full h-5/6">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        // className="m-0 grid place-items-center px-4 py-4 text-center"
        className="m-0 place-items-center px-4 py-4 text-center"
      >
        {/* <div className="mb-4 h-7 p-6 text-white">
          {authType === "LOGIN" ? (
            <Typography>Welcome Back!</Typography>
          ) : (
            <Typography>Nice to meet you!</Typography>
          )}
        </div> */}
        <Typography variant="h5" color="white">
          Flowzen
        </Typography>
      </CardHeader>
      <CardBody>
        <Tabs value={authType} className="overflow-visible">
          <TabsHeader className="relative z-0 ">
          {/* <TabsHeader className=" z-0 "> */}
            <Tab value="LOGIN" onClick={() => dispatch(setAuthType("LOGIN"))}>
              ログイン
            </Tab>
            <Tab value="SIGNUP" onClick={() => dispatch(setAuthType("SIGNUP"))}>
              ユーザー登録
            </Tab>
          </TabsHeader>
          <TabsBody
            // className="!overflow-x-hidden !overflow-y-visible"
            className="!overflow-x-hidden"
            animate={{
              initial: {
                x: authType === "LOGIN" ? 400 : -400,
              },
              mount: {
                x: 0,
              },
              unmount: {
                x: authType === "LOGIN" ? 400 : -400,
              },
            }}
          >
            <TabPanel value="LOGIN" className="p-0">
              <div>
                {/* {authValidationErrors && authValidationErrors["unauthorized"] && (
                  <Typography
                    className="mx-2 my-1 font-normal"
                    color="red">
                    ※{authValidationErrors["unauthorized"]}
                  </Typography>
                )} */}
                {otherValidationErrors.unauthorized && (
                  <Typography
                    className="mx-2 my-1 font-normal"
                    color="red">
                    ※{authValidationErrorMessages["unauthorized"]}
                  </Typography>
                )}
                <form className="mt-3 flex flex-col gap-1">
                  {loginFormFields.map((field) =>
                  <>
                    <div className="flex">
                      <Typography
                        className="my-1 font-normal"
                        color="gray"
                        >
                        {field.labelText}
                      </Typography>
                      {/* {authValidationErrors && authValidationErrors[field.name as keyof AuthValidationError] && (
                        <Typography
                          className="mx-2 my-1 font-normal"
                          color="red">
                          ※{authValidationErrors[field.name as keyof AuthValidationError]}
                        </Typography>
                      )} */}
                      { userLoginFormValidations[field.name as keyof UserLoginFormValidation] === false && (
                        <Typography
                          className="mx-2 my-1 font-normal"
                          color="red">
                          ※{authValidationErrorMessages[field.name as keyof  typeof authValidationErrorMessages]}
                        </Typography>
                      )}
                    </div>
                    <Input
                      onChange={handleChange}
                      value={loginForm[field.name as keyof UserLoginForm] !== null
                            ? loginForm[field.name as keyof UserLoginForm]!
                            : ""}
                      id={`${field.id}-login`}
                      key={`${field.id}-login`}
                      label={""}
                      name={field.name}
                      type={field.type}
                      required={field.isRequired}
                      crossOrigin={undefined}/>
                  </>
                  )}
                  <Button
                    onClick={handleSubmit}
                    size="lg"
                    className="mt-3">ログイン</Button>
                </form>
              </div>
            </TabPanel>
            <TabPanel value="SIGNUP" className="p-0">
              <div>
                {/* {authValidationErrors && Object.keys(authValidationErrors).map((key) =>
                      <Typography
                        className="mx-2 my-1 font-normal"
                        color="red">
                        ※{authValidationErrors[key as keyof AuthValidationError]}
                      </Typography>
                )} */}
                {otherValidationErrors.somethingBad && (
                  <Typography
                    className="mx-2 my-1 font-normal"
                    color="red">
                    ※{authValidationErrorMessages["somethingBad"]}
                  </Typography>
                )}
                {uniqueFields.username === false && (
                  <Typography
                    className="mx-2 my-1 font-normal"
                    color="red">
                    ※{authValidationErrorMessages["usernameUnique"]}
                  </Typography>
                )}
                {uniqueFields.email === false && (
                  <Typography
                    className="mx-2 my-1 font-normal"
                    color="red">
                    ※{authValidationErrorMessages["emailUnique"]}
                  </Typography>
                )}
                <form className="mt-8 flex flex-col gap-1">
                  {signupFormFields.map((field) =>
                  <>
                    <div className="flex">
                      <Typography
                        className="my-1 font-normal"
                        color="gray"
                        >
                        {field.labelText}
                      </Typography>
                      {/* {authValidationErrors && authValidationErrors[field.name as keyof AuthValidationError] && (
                        <Typography
                          className="mx-2 my-1 font-normal max-w-xs"
                          color="red">
                          ※{authValidationErrors[field.name as keyof AuthValidationError]}
                        </Typography>
                      )} */}
                      { userSignupFormValidations[field.name as keyof UserSignupFormValidation] === false && (
                        <Typography
                          className="mx-2 my-1 font-normal"
                          color="red">
                          ※{authValidationErrorMessages[field.name as keyof  typeof authValidationErrorMessages]}
                        </Typography>
                      )}
                    </div>
                    <Input
                      onChange={handleChange}
                      value={signupForm[field.name as keyof UserSignupForm] !== null
                            ? signupForm[field.name as keyof UserSignupForm]!
                            : ""}
                      id={`${field.id}-signup`}
                      key={`${field.id}-login`}
                      label={""}
                      name={field.name}
                      type={field.type}
                      required={field.isRequired}
                      crossOrigin={undefined}/>
                  </>
                  )}
                  <Button
                    onClick={handleSubmit}
                    size="lg"
                    className="mt-3">新規ユーザー登録</Button>
                </form>
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>//
  );
}

export default AuthenticationForm;