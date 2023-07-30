import { IStarWarsApi } from "./type";

export const getStarWarsCharacter = async () => {
  const response = await fetch("https://swapi.dev/api/people");
  try {
    return {
      data: (await response.json()) as IStarWarsApi,
      headers: response.headers,
      status: response.status
    };
  } catch (error) {
    return {
      data: undefined,
      headers: response.headers,
      status: response.status
    }
  }
}
