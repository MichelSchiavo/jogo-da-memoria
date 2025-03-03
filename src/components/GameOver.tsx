import styled from 'styled-components';
import { motion } from 'framer-motion';

const GameOverContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 15px;
  padding: 30px 15px;
  width: 90%;
  max-width: 500px;
  margin: 10px auto;
  text-align: center;
  border: 4px solid var(--pokemon-yellow);

  @media (max-width: 480px) {
    padding: 20px 10px;
    border-width: 3px;
    border-radius: 10px;
  }
`;

const Heading = styled.h2`
  color: var(--pokemon-yellow);
  font-size: 2rem;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`;

const ResultText = styled.p`
  color: white;
  font-size: 1rem;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 15px;
  }
`;

const Moves = styled.span`
  color: var(--pokemon-yellow);
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0 5px;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const PlayAgainButton = styled(motion.button)`
  background-color: var(--pokemon-red);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 30px;
  font-size: 1rem;
  cursor: pointer;
  border: 3px solid var(--pokemon-yellow);
  margin-top: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 0.8rem;
    border-width: 2px;
    margin-top: 10px;
  }
`;

const Trophy = styled.div`
  width: 70px;
  height: 100px;
  margin-bottom: 15px;
  position: relative;

  @media (max-width: 480px) {
    width: 50px;
    height: 80px;
    margin-bottom: 10px;
  }

  &::before {
    content: '';
    position: absolute;
    width: 60px;
    height: 80px;
    background: linear-gradient(to bottom, #ffd700, #ffa500);
    border-radius: 50% 50% 5px 5px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border: 3px solid #996515;
  }

  &::after {
    content: '';
    position: absolute;
    width: 40px;
    height: 20px;
    background: #996515;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
  }
`;

const TrophyHandle = styled.div`
  position: absolute;
  width: 15px;
  height: 30px;
  border: 3px solid #996515;
  border-radius: 10px;
  left: 5px;
  top: 25px;

  &::before {
    content: '';
    position: absolute;
    width: 15px;
    height: 30px;
    border: 3px solid #996515;
    border-radius: 10px;
    left: 52px;
    top: 0;
  }

  @media (max-width: 480px) {
    width: 12px;
    height: 25px;
    left: 3px;
    top: 20px;

    &::before {
      width: 12px;
      height: 25px;
      left: 32px;
    }
  }
`;

interface GameOverProps {
  moves: number;
  onPlayAgain: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ moves, onPlayAgain }) => {
  // Message based on number of moves
  const getMessage = () => {
    if (moves <= 10) return 'Incrível! Você é um Mestre das Criaturas!';
    if (moves <= 15) return 'Fantástico! Você tem um ótimo potencial!';
    if (moves <= 20) return 'Muito bom! Continue praticando!';
    return 'Você completou o desafio!';
  };

  return (
    <GameOverContainer
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Trophy>
        <TrophyHandle />
      </Trophy>
      <Heading>Parabéns!</Heading>
      <ResultText>{getMessage()}</ResultText>
      <ResultText>
        Você completou o jogo em <Moves>{moves}</Moves> movimentos!
      </ResultText>
      <PlayAgainButton
        onClick={onPlayAgain}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Jogar Novamente
      </PlayAgainButton>
    </GameOverContainer>
  );
};
