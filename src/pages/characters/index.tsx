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
        characterList.map(character => {
          return <p>{character.name}</p>;
        })
      }
    </>
  )
}
