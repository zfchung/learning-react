import { ICharacter, IStarWarsApi } from "./type";

export const getStarWarsCharacter = async (nameParam: string) => {
  const response = await fetch(`https://swapi.dev/api/people/${nameParam}`);
  try {
    const result = (await response.json()) as ICharacter;
    return {
      data: [result],
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

export const getStarWarsCharacterList = async () => {
  const response = await fetch(`https://swapi.dev/api/people`);
  try {
    const { results } = (await response.json()) as IStarWarsApi;
    return {
      data: results,
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
