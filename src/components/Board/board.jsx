/* eslint-disable react/prop-types */
import styles from "./board.module.css";
import Card from "../card/card";
import { useEffect, useState } from "react";
import { cardsdata } from "../../data/cards";
import { shuffleArray } from "../../utils/shuffleArray";

const Board = () => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState("");
  const [secondCard, setSecondCard] = useState("");
  const [unflippedCards, setUnflippedCards] = useState([]);
  const [noShowCards, setnoShowCards] = useState([]);
  const [win, setWin] = useState(false);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkWin = () => {
    if (cards && cards.length > 0) {
      const allMatched = cards.every((card) => card.match);
      setWin(allMatched);
    }
  };
  useEffect(() => {
    checkWin();
  }, [cards, checkWin]);

  useEffect(() => {
    const shuffledCards = shuffleArray(cardsdata);
    setCards(shuffledCards);
  }, []);

  useEffect(() => {
    setCards(cardsdata);
    console.log(cards);
  }, [cards]);

  useEffect(() => {
    checkMatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondCard]);

  useEffect(() => {
    const todosIguales = (arr) => {
      // Verifica si arr está definido y tiene una longitud
      if (arr && arr.length > 0) {
        var primerElemento = arr[0].match;
    
        for (var i = 1; i < arr.length; i++) {
          if (arr[i].match !== primerElemento) {
            return false;
          }
        }
    
        return true;
      }
      // En caso de que arr no esté definido o no tenga longitud, devuelves false o cualquier valor que sea adecuado para tu lógica.
      return false;
    };
    setWin(todosIguales(cards));
  }, [cards]);
  useEffect(() => {
    if (cards && cards.length > 0) {
      // Aquí puedes realizar acciones adicionales una vez que cards se haya actualizado
      console.log("Cards actualizadas:", cards);
    }
  }, [cards]);


  const flipCard = (name, id) => {
    if (firstCard.name === name && firstCard.id === id) {
      return 0;
    }
    if (!firstCard.name) {
      setFirstCard({ name, id });
    } else if (!secondCard.name) {
      setSecondCard({ name, id });
    }
    return 1;
  };
  const checkMatch = () => {
    if (firstCard.name && secondCard.name) {
      const match = firstCard.name === secondCard.name;
      match ? disableCards() : unflipCards();
    }
  };
  const disableCards = () => {
    setnoShowCards([firstCard.id, secondCard.id]);
    const findFirstCard = cards.find((card) => card.id === firstCard.id);
    const findSecondCard = cards.find((card) => card.id === secondCard.id);
    setCards([...cards, (findFirstCard.match = true)]);
    setCards([...cards, (findSecondCard.match = true)]);
    resetCards();
  };
  const unflipCards = () => {
    setUnflippedCards([firstCard.id, secondCard.id]);
    resetCards();
  };
  const resetCards = () => {
    setFirstCard({});
    setSecondCard({});
  };
  const handleRestart = () => {
    window.location.reload();
  };
  return win ? (
    <section className={styles.win} >
      <h1 className={styles.pressStart }>¡GANASTE GENIO!</h1>
      <img className={styles.winImg} src="https://zxart.ee/zxscreen/mode:mix/pal:srgb/type:attributes/zoom:1/id:194078/" />
      <button className={styles.button8bits} onClick={handleRestart} >restart</button>
    </section>
  ) : (
    <section className={styles.board}>
      {cards?.map((card, i) => (
        <div key={i}>
          <Card
            name={card.name}
            icon={card.icon}
            id={card.id}
            show={card.show}
            match={card.match}
            flipCard={flipCard}
            unflipCards={unflippedCards}
            disableCards={noShowCards}
          />
        </div>
      ))}
    </section>
  );
};

export default Board;
