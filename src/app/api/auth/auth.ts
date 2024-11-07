import axios from "axios";
import { getCookie } from "cookies-next";
const token = getCookie("accessToken");

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
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/verify/sign-up`,
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
export const getProfile = async (token: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/profile`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const authorizeAPI = async (token: string, clientId: string) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/authorize`,
    { clientId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getAuthorizeAppAPI = async (clientId: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/oauth-app/${clientId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
//Create new OAuth App
interface newOAuthAppProps {
  applicationName: string;
  applicationDescription: string;
  homePageUrl: string;
  callBackUrl: string;
  accessToken: string;
}

export const newOAuthApp = async (props: newOAuthAppProps) => {
  const {
    applicationName,
    applicationDescription,
    homePageUrl,
    callBackUrl,
    accessToken,
  } = props;
  console.log(props);
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/new-oauth-app`,
    {
      applicationName,
      applicationDescription,
      homePageUrl,
      callBackUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

//Get OAuth App
export const getOAuthApp = async (accessToken: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/get-apps`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

//GetDetail OAuth App
export const getDetailOAuthApp = async (id: string, accessToken: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/app-details/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

//Generate client secret
export const GenerateClient = async (clientId: string, accessToken: string) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/generate-client-secret`,
    {
      clientId,
    },
    {
      headers: {
        Authorization: `Beaer ${accessToken}`,
      },
    }
  );
};
