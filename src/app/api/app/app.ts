import axios from "axios";
import { getCookie } from "cookies-next";
const token = getCookie("accessToken");

export const getApps = async () => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/get-apps`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getAuthorizedApps = async (token: string) => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/get-authorized-apps`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

interface IApp {
  applicationName: string;
  applicationDescription: string;
  homePageUrl: string;
  callBackUrl: string;
}

export const addApp = async (body: IApp) => {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/new-oauth-app`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const getDetails = async (id: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/app-details/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const generateClientSecretAPI = async (clientId: string) => {
  console.log({ clientId });
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/generate-client-secret`,
    {
      clientId: clientId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
