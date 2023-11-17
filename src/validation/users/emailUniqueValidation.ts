import axios from "axios";
import apiConfig from "../../constants/apiConfig";

export const emailUniqueValidation = async (email: string): Promise<boolean> => {
  console.log("email unique validation starts")
  const URL = `${apiConfig.baseUrl}/email-unique`
  try {
    const res = await axios.post(
      URL,
      {
        email
      },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    if (res.status === 200) {
      console.log("email is UNIQUE!")
      return true;
    } else {
      console.log("email is NOT UNIQUE!")
      return false;
    }
  } catch (err) {
    console.log(err);
    console.log("email is NOT UNIQUE!")
    return false;
  }
}
