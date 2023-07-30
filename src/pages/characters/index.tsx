import { FC, useEffect, useState } from "react";
import { useAsync } from "react-use";
import { getStarWarsCharacter } from "../../services/starWars";
import { ICharacter } from "../../services/starWars/type";

export const Characters: FC = () => {
  const state = useAsync(async () => {
    return await getStarWarsCharacter();
  }, [getStarWarsCharacter]);

  const [characterList, setCharacterList] = useState<ICharacter[]>([]);

  useEffect(() => {
    const result = state.value;
    if (result && result.data) {
      setCharacterList(result.data.results);
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
