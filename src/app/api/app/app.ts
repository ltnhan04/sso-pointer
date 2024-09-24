import axios from "axios";
export const getApps = async () => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/get-apps`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjE4ZjdjMmMyOThkYTAyZTg1N2Q4NSIsImlhdCI6MTcyNzE4NTM2NywiZXhwIjoxNzI3MTg2MjY3fQ.rtGNs-xMXwX55wpxPNkIvd0ZgKn2eg7ydoLKQjWQy-A",
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
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjE4ZjdjMmMyOThkYTAyZTg1N2Q4NSIsImlhdCI6MTcyNzE4NTM2NywiZXhwIjoxNzI3MTg2MjY3fQ.rtGNs-xMXwX55wpxPNkIvd0ZgKn2eg7ydoLKQjWQy-A",
      },
    }
  );
};
