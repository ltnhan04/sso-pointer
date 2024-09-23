import axios from "axios";

export const registerAPI = async ({
  name,
  password,
  email,
}: {
  name: string;
  password: string;
  email: string;
}) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/sign-up`,
    { name, password, email }
  );
};
