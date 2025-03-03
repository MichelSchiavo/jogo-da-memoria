import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  text-align: center;
  padding: 10px 0;

  @media (max-width: 480px) {
    margin-bottom: 0.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--pokemon-yellow);
  text-shadow: 2px 2px 0 var(--pokemon-blue), -2px -2px 0 var(--pokemon-blue),
    2px -2px 0 var(--pokemon-blue), -2px 2px 0 var(--pokemon-blue);
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1rem;
  color: white;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const GameLogo = styled.div`
  font-family: 'Press Start 2P', cursive;
  font-size: 2.2rem;
  color: var(--pokemon-yellow);
  text-shadow: 4px 0 0 var(--pokemon-blue), -4px 0 0 var(--pokemon-blue),
    0 4px 0 var(--pokemon-blue), 0 -4px 0 var(--pokemon-blue),
    2px 2px 0 var(--pokemon-blue), -2px -2px 0 var(--pokemon-blue),
    2px -2px 0 var(--pokemon-blue), -2px 2px 0 var(--pokemon-blue);
  margin-bottom: 1rem;
  padding: 10px 15px;
  border-radius: 10px;
  background: linear-gradient(
    to bottom,
    rgba(255, 0, 0, 0.7),
    rgba(200, 0, 0, 0.7)
  );
  border: 3px solid white;
  transform: rotate(-2deg);

  @media (max-width: 768px) {
    font-size: 1.5rem;
    padding: 8px 12px;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 6px 10px;
    margin-bottom: 0.5rem;
  }
`;

const LogoIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  margin: 0 auto 20px;
  position: relative;
  border: 3px solid var(--pokemon-blue);

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 50%;
    background-color: var(--pokemon-red);
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    top: 0;
    left: 0;
  }

  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: white;
    border: 3px solid var(--pokemon-blue);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <LogoIcon />
      <GameLogo>Memory Game</GameLogo>
      <Title>Jogo da Memória</Title>
      <Subtitle>Encontre todos os pares de monstrinhos!</Subtitle>
    </HeaderContainer>
  );
};
