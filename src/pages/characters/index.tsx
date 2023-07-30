import { FC, useEffect, useState } from "react";
import { useAsync } from "react-use";

interface IStarWarsApi {
  count: number;
  next: string | null;
  previous: string | null;
  results: ICharacter[];
}

interface ICharacter {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];

}

export const Characters: FC = () => {
  const state = useAsync(async () => {
    const response = await fetch("https://swapi.dev/api/people");
    return await response.json() as IStarWarsApi;
  }, []);

  const [characterList, setCharacterList] = useState<ICharacter[]>([]);

  useEffect(() => {
    const starWarsApi = state.value;
    if (starWarsApi) {
      setCharacterList(starWarsApi.results);
    }
  }, [state]);

  return (
    <>
      <h1>Characters Page</h1>
      {
        characterList.map(character => {
          return <p>{character.name}</p>;
        })
      }
    </>
  )
}
