import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Difficulty } from '../types/Difficulty';

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  background: rgba(0, 0, 0, 0.7);
  padding: 20px 15px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  margin: 10px auto 20px;

  @media (max-width: 480px) {
    padding: 15px 10px;
    gap: 10px;
    margin: 5px auto 10px;
  }
`;

const Title = styled.h2`
  font-size: 1.3rem;
  color: var(--pokemon-yellow);
  margin-bottom: 15px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
`;

const DifficultySelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    gap: 8px;
    margin-bottom: 10px;
  }
`;

interface DifficultyButtonProps {
  isSelected: boolean;
}

const DifficultyButton = styled.button<DifficultyButtonProps>`
  padding: 8px 12px;
  border: 2px solid var(--pokemon-yellow);
  border-radius: 5px;
  background-color: ${(props) =>
    props.isSelected ? 'var(--pokemon-red)' : 'transparent'};
  color: white;
  font-size: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--pokemon-red);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 0.7rem;
  }
`;

const StartButton = styled(motion.button)`
  padding: 12px 30px;
  background-color: var(--pokemon-red);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  cursor: pointer;
  border: 3px solid var(--pokemon-yellow);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    padding: 10px 25px;
    font-size: 0.9rem;
    border-width: 2px;
  }
`;

interface GameControlsProps {
  startGame: () => void;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  loading: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  startGame,
  difficulty,
  setDifficulty,
  loading,
}) => {
  return (
    <ControlsContainer>
      <Title>Escolha a dificuldade</Title>

      <DifficultySelector>
        <DifficultyButton
          isSelected={difficulty === 'easy'}
          onClick={() => setDifficulty('easy')}
        >
          Fácil (6 pares)
        </DifficultyButton>

        <DifficultyButton
          isSelected={difficulty === 'medium'}
          onClick={() => setDifficulty('medium')}
        >
          Médio (8 pares)
        </DifficultyButton>

        <DifficultyButton
          isSelected={difficulty === 'hard'}
          onClick={() => setDifficulty('hard')}
        >
          Difícil (12 pares)
        </DifficultyButton>
      </DifficultySelector>

      <StartButton
        onClick={startGame}
        disabled={loading}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? 'Carregando...' : 'Iniciar Jogo'}
      </StartButton>
    </ControlsContainer>
  );
};
