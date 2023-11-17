import axios from "axios";
import apiConfig from "../../constants/apiConfig";

export const usernameUniqueValidation = async (username: string): Promise<boolean> => {
  console.log("username unique validation starts...")
  const URL = `${apiConfig.baseUrl}/username-unique`
  try {
    const res = await axios.post(
      URL,
      {
        username
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    if (res.status === 200) {
      console.log("username is UNIQUE !")
      return true;
    } else {
      console.log("username is NOT UNIQUE !")
      return false;
    }
  } catch (err) {
    console.log(err);
    console.log("username is NOT UNIQUE !")
    return false;
  }
}
