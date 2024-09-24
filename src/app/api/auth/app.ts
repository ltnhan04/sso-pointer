import axios from "axios";
export const getApps = async () => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/get-apps`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjE4ZjdjMmMyOThkYTAyZTg1N2Q4NSIsImlhdCI6MTcyNzE3NDc2MywiZXhwIjoxNzI3MTc1NjYzfQ.J0lUrcLDpcJXPEBwHpx-VnOjOI8z-hlksJs9ztitC2A",
      },
    }
  );
};
