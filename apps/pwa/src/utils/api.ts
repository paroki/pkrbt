import { API_ENTRYPOINT } from "@/config/globals";
import { singleton } from "./singleton";

export type OAuthLoginResponse = {
  user: {
    uid: string;
  };
  token: string;
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

class Api {
  async oauthLogin(provider: string, accessToken: string) {
    try {
      const response = await fetch(
        `${API_ENTRYPOINT}/connect/${provider}/check?access_token=${accessToken}`,
        {
          headers: {
            accept: "application/json",
          },
        },
      );
      const data = await response.json();
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}

function createApi() {
  return new Api();
}

const api = singleton<Api>("api", createApi);

export default api;
