import { FC, useEffect, useState } from "react";
import { useAsync } from "react-use";
import { getStarWarsCharacter, getStarWarsCharacterList } from "../../services/starWars";
import { ICharacter } from "../../services/starWars/type";
import { useParams } from "react-router-dom";

export const Characters: FC = () => {
  const { nameParam } = useParams<{
    nameParam: string;
  }>();

  const state = useAsync(async () => {
    if (nameParam) {
      return await getStarWarsCharacter(nameParam);
    } else {
      return await getStarWarsCharacterList();
    }
  }, [getStarWarsCharacter, getStarWarsCharacterList, nameParam]);

  const [characterList, setCharacterList] = useState<ICharacter[]>([]);

  useEffect(() => {
    const result = state.value;
    if (result && result.data) {
      setCharacterList(result.data);
    }
  }, [state.value]);

  return (
    <>
      <h1>Characters Page</h1>
      {
        characterList.map((character, index) => {
          if (!nameParam) {
            return (
              <p>
                <a href={`/characters/${index + 1}`}>{character.name}</a>
              </p>
            );
          }

          return (
            <>
              <h2>{character.name}</h2>
              <p>
                Birth Year: {character.birth_year} <br/>
                Gender: {character.gender} <br/>
                Hair Color: {character.hair_color} <br/>
                Height: {character.height} <br/>
                Home World: {character.homeworld} <br/>
                Mass: {character.mass} <br/>
              </p>
            </>
          )
        })
      }
    </>
  )
}
