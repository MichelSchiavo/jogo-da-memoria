import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Pokemon } from '../types/Pokemon';

interface CardContainerProps {
  isMatched: boolean;
}

const CardContainer = styled(motion.div)<CardContainerProps>`
  aspect-ratio: 1 / 1.4;
  position: relative;
  perspective: 1000px;
  cursor: ${(props) => (props.isMatched ? 'default' : 'pointer')};
  transform-style: preserve-3d;
  width: 100%;
`;

const CardFace = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (max-width: 480px) {
    border-radius: 6px;
  }
`;

const CardFront = styled(CardFace)`
  background: linear-gradient(135deg, var(--card-back) 0%, #d73721 100%);
  border: 2px solid var(--pokemon-yellow);
  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    content: '?';
    font-size: 3rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);

    @media (max-width: 480px) {
      font-size: 2rem;
    }
  }

  &:after {
    content: '';
    position: absolute;
    width: 80%;
    height: 80%;
    border: 3px dashed rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    animation: rotate 8s linear infinite;

    @media (max-width: 480px) {
      border-width: 2px;
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const CardBack = styled(CardFace)`
  background: linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%);
  border: 2px solid var(--pokemon-yellow);
  transform: rotateY(180deg);
`;

const CreatureImage = styled.img`
  width: 85%;
  height: 85%;
  object-fit: contain;

  @media (max-width: 480px) {
    width: 80%;
    height: 80%;
  }
`;

const CreatureName = styled.div`
  position: absolute;
  bottom: 3px;
  width: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 3px 1px;
  font-size: 0.6rem;
  text-transform: capitalize;

  @media (max-width: 480px) {
    font-size: 0.5rem;
    padding: 2px 1px;
  }
`;

interface CardProps {
  pokemon: Pokemon;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({
  pokemon,
  isFlipped,
  isMatched,
  onClick,
}) => {
  return (
    <CardContainer
      isMatched={isMatched}
      onClick={onClick}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.5 }}
      whileHover={!isMatched && !isFlipped ? { scale: 1.05 } : {}}
    >
      <CardFront initial={false} animate={{ opacity: isFlipped ? 0 : 1 }} />
      <CardBack initial={false} animate={{ opacity: isFlipped ? 1 : 0 }}>
        <CreatureImage src={pokemon.spriteUrl} alt={pokemon.name} />
        <CreatureName>{pokemon.name}</CreatureName>
      </CardBack>
    </CardContainer>
  );
};
