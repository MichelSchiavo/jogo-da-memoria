import axios from 'axios';
import { Pokemon } from '../types/Pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

// Função para obter criaturas do jogo
export const fetchPokemons = async (count: number): Promise<Pokemon[]> => {
  try {
    // Usando uma API pública para obter dados de criaturas
    const maxCreatureId = 649; // Limitando para melhor qualidade de sprites
    const offset = Math.floor(Math.random() * (maxCreatureId - count));

    const response = await axios.get(`${BASE_URL}/pokemon`, {
      params: {
        limit: count,
        offset,
      },
    });

    const { results } = response.data;

    const creatureDetails = await Promise.all(
      results.map(async (creature: any) => {
        const detailResponse = await axios.get(creature.url);
        return {
          name: detailResponse.data.name,
          spriteUrl:
            detailResponse.data.sprites.other['official-artwork']
              .front_default || detailResponse.data.sprites.front_default,
        };
      }),
    );

    return creatureDetails;
  } catch (error) {
    console.error('Error fetching creature data:', error);
    return [];
  }
};

// Nota: Mantemos o nome da função para evitar quebrar referências existentes,
// mas os comentários esclarecem que estamos usando para criaturas genéricas
