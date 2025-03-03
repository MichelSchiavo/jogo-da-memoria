import styled from 'styled-components';
import { Card } from './Card';
import { Pokemon } from '../types/Pokemon';
import { motion } from 'framer-motion';

const BoardContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding: 0 5px;

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(70px, 110px));
  gap: 0.8rem;
  width: 100%;
  max-width: 800px;
  justify-content: center;

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, minmax(70px, 90px));
    gap: 0.6rem;
  }

  @media (max-width: 400px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }
`;

const GameInfo = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 10px;
  font-size: 0.9rem;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  width: fit-content;
  justify-content: center;

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 0.7rem;
    margin-bottom: 5px;
  }
`;

const InfoItem = styled.div`
  margin: 0 8px;
  display: flex;
  align-items: center;

  span {
    margin-left: 5px;
    color: var(--pokemon-yellow);
    font-weight: bold;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    margin: 3px 6px;
  }
`;

interface GameBoardProps {
  cards: Pokemon[];
  flippedCards: number[];
  matchedCards: number[];
  onCardClick: (id: number) => void;
  moves: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  cards,
  flippedCards,
  matchedCards,
  onCardClick,
  moves,
}) => {
  return (
    <BoardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GameInfo>
        <InfoItem>
          Movimentos: <span>{moves}</span>
        </InfoItem>
        <InfoItem>
          Pares encontrados: <span>{matchedCards.length / 2}</span>/
          <span>{cards.length / 2}</span>
        </InfoItem>
      </GameInfo>

      <Grid>
        {cards.map((card) => (
          <Card
            key={card.id}
            pokemon={card}
            isFlipped={
              flippedCards.includes(card.id) || matchedCards.includes(card.id)
            }
            isMatched={matchedCards.includes(card.id)}
            onClick={() => onCardClick(card.id)}
          />
        ))}
      </Grid>
    </BoardContainer>
  );
};
