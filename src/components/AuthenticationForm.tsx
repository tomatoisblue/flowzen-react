import { Button, Input } from "@material-tailwind/react";
import Card, { CardBody, CardHeader } from "@material-tailwind/react/components/Card";
import Tabs, { Tab, TabPanel, TabsBody, TabsHeader } from "@material-tailwind/react/components/Tabs";
import Typography from "@material-tailwind/react/components/Typography";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loginFormFields, signupFormFields } from "../constants/userFormField";
import { AuthType, setAuthType } from "../features/authSlice";
import { useAuthenticationForm } from "../hooks/useAuthenticationForm";


const AuthenticationForm: React.FC = () => {
  const authType: AuthType = useAppSelector((state) => state.auth.authType);
  const loginForm = useAppSelector((state) => state.auth.userLoginForm);
  const signupForm = useAppSelector((state) => state.auth.userSignupForm);
  const [{ handleChange, handleSubmit }] = useAuthenticationForm();

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
              <form className="mt-8 flex flex-col gap-1">
                {loginFormFields.map((field) =>
                <>
                  <div className="flex">
                    <Typography
                      className="my-1 font-normal"
                      color="gray"
                      >
                      {field.labelText}
                    </Typography>
                    {/* Autformvalidation errors */}
                  </div>
                  <Input
                    onChange={handleChange}
                    value={loginForm[field.name]}
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
                  size="lg">ログイン</Button>
              </form>
            </TabPanel>
            <TabPanel value="SIGNUP" className="p-0">
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
                    {/* Autformvalidation errors */}
                  </div>
                  <Input
                    onChange={handleChange}
                    value={signupForm[field.name]}
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
                  size="lg">新規ユーザー登録</Button>
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>//
  );
}

export default AuthenticationForm;