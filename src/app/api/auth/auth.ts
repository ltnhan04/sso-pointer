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
interface IVerify {
  email: string;
  otp: string;
}
export const verifyAccount = async (body: IVerify) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/sign-up/verify`,
    body
  );
};
interface ILogin {
  password: string;
  email: string;
}
export const loginAPI = async (body: ILogin) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/sign-in`,
    body
  );
};
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjE4ZjdjMmMyOThkYTAyZTg1N2Q4NSIsImlhdCI6MTcyNzE3Njk0MSwiZXhwIjoxNzI3MTc3ODQxfQ.Kas-6cN3cI1E2bU0ORC6Sn7s3QlFz_G_duAxMv0V-G8";
export const getProfile = async () => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/profile`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
interface IAuthorize {
  clientId: string;
  redirectUri: string;
  scope: string;
}
export const authorizeAPI = async (body: IAuthorize) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/authorize`,
    body,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};
export const getOAuthApp = async (id: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/oauth-app/${id}`
  );
};
