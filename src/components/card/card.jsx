import { useEffect, useState } from "react";
import styles from "./card.module.css";
import PropTypes from "prop-types";

const Card = (props) => {
  const { icon, name, id, flipCard, unflipCards, disableCards } = props;
  const [flipped, setFlipped] = useState(false);
  const [enableEvent, setEnableEvent] = useState(true);
  

  useEffect(() => {
    if (unflipCards.includes(id)) {
      setTimeout(() => {
        setFlipped(false);
      }, 500);
    }
  }, [id, unflipCards]);

  useEffect(() => {
    if (disableCards.includes(id)) {
      setEnableEvent(!enableEvent);
    }
  }, [disableCards]);

  const handleClick = () => {
    const value = flipCard(name, id);
    if (value !== 0) {
      setFlipped(!flipped);
    }
  };
  return (
    <div className={`${styles.card}`} onClick={handleClick}>
      {flipped ? (
        <img
          className={styles.icon}
          src={icon}
        />
      ) : (
        <img
          className={styles.backface}
          src="https://t3.ftcdn.net/jpg/01/79/97/06/360_F_179970632_NqHaIiPKSoQLIkj53Htdgxjmt8qVDS4R.jpg"
        />
      )}
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  icon: PropTypes.string,
  show: PropTypes.bool,
  match: PropTypes.bool,
  flipCard: PropTypes.func,
  unflipCards: PropTypes.array,
  disableCards: PropTypes.array,
};

export default Card;
