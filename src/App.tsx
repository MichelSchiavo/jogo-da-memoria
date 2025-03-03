import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Header } from './components/Header';
import { GameBoard } from './components/GameBoard';
import { fetchPokemons } from './services/pokeApi';
import { Pokemon } from './types/Pokemon';
import { GameControls } from './components/GameControls';
import { GameOver } from './components/GameOver';
import { Difficulty } from './types/Difficulty';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 10px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Alterado para começar do topo */
  align-items: center;
  overflow-y: auto;

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [cards, setCards] = useState<Pokemon[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [loading, setLoading] = useState(false);

  // Game settings for different difficulty levels
  const difficultySettings = {
    easy: { pairs: 6, timeLimit: 60 },
    medium: { pairs: 8, timeLimit: 120 },
    hard: { pairs: 12, timeLimit: 180 },
  };

  const startGame = async () => {
    setLoading(true);
    setGameOver(false);
    setGameStarted(true);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);

    try {
      const pairsCount = difficultySettings[difficulty].pairs;
      const fetchedPokemons =
        pokemons.length >= pairsCount
          ? pokemons.slice(0, pairsCount)
          : await fetchPokemons(pairsCount);

      if (!pokemons.length) {
        setPokemons(fetchedPokemons);
      }

      // Create pairs and shuffle
      const pokemonPairs = [...fetchedPokemons, ...fetchedPokemons].map(
        (pokemon, index) => ({
          ...pokemon,
          id: index,
        }),
      );

      const shuffled = pokemonPairs.sort(() => Math.random() - 0.5);
      setCards(shuffled);
    } catch (error) {
      console.error('Error starting game:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (id: number) => {
    // Prevent clicking if already matching or if card is already flipped
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(id) ||
      matchedCards.includes(id)
    )
      return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Check if two cards are flipped
    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);

      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === secondCardId);

      // Check if cards match
      if (firstCard?.name === secondCard?.name) {
        setMatchedCards([...matchedCards, firstCardId, secondCardId]);
        setFlippedCards([]);
      } else {
        // Flip back after delay
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Check if game is over
  useEffect(() => {
    if (
      gameStarted &&
      matchedCards.length &&
      matchedCards.length === cards.length
    ) {
      setGameOver(true);
      setGameStarted(false);
    }
  }, [matchedCards, cards.length, gameStarted]);

  return (
    <AppContainer>
      <Header />

      {!gameStarted && !gameOver && (
        <GameControls
          startGame={startGame}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          loading={loading}
        />
      )}

      {gameStarted && (
        <GameBoard
          cards={cards}
          flippedCards={flippedCards}
          matchedCards={matchedCards}
          onCardClick={handleCardClick}
          moves={moves}
        />
      )}

      {gameOver && <GameOver moves={moves} onPlayAgain={() => startGame()} />}
    </AppContainer>
  );
}

export default App;
