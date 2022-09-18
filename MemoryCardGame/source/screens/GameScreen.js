import React, {useEffect, useState, useRef} from 'react';
import {View, Alert} from 'react-native';

import ScreenContainer from '../components/screenContainer';
import numberArray from '../utils/numberArray';
import Header from '../components/header';
import Card from '../components/card';

import screenStyles from '../styles/screenStyles';

const GameScreen = () => {
  // when the screen load the the cards will be generated
  useEffect(() => {
    setcardsArray(() => numberArray());
  }, []);

  const [cardsArray, setcardsArray] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setClearedCards] = useState({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const timeout = useRef(null);

  // evaluating the the the pair is of same value or not
  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cardsArray[first] === cardsArray[second]) {
      setClearedCards(prev => ({...prev, [cardsArray[first]]: true}));
      setOpenCards([]);
      return;
    }
    // Flip cards after a 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const disable = () => {
    setShouldDisableAllCards(true);
  };

  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const handleCardClick = index => {
    // Have a maximum of 2 items in array at once.
    // console.log(index, cardsArray[index]);
    if (openCards.length === 1) {
      setOpenCards(prev => [...prev, index]);
      // increase the moves once we opened a pair
      setMoves(moves => moves + 1);
      disable();
    } else {
      // If two cards are already open, we cancel timeout set for flipping cards back
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  // to check after every two cards that they are equal or not
  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  // to check if the game is finished or not
  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  // to keep the track of the cards which is flipped
  const checkIsFlipped = index => {
    return openCards.includes(index);
  };

  // to check if the card is already made a pair and now they should not be clickable
  const checkIsInactive = card => {
    return Boolean(clearedCards[card]);
  };

  const checkCompletion = () => {
    // We are storing clearedCards as an object since its more efficient
    //to search in an object instead of an array
    if (
      Object.keys(clearedCards).length === cardsArray.length / 2 &&
      cardsArray.length !== 0
    ) {
      if (!showModal) setShowModal(true);
    }
  };

  // rendering the card
  const renderItem = (value, index) => {
    return (
      <View key={index} style={screenStyles.innerCardContainer}>
        <Card
          keyValue={index}
          value={value}
          index={index}
          isDisabled={shouldDisableAllCards}
          isInactive={checkIsInactive(value)}
          isFlipped={checkIsFlipped(index)}
          onClick={handleCardClick}
        />
      </View>
    );
  };

  // handling the restart button which is on the top
  const handleRestart = () => {
    setShowModal(false);
    setClearedCards({});
    setOpenCards([]);
    setMoves(0);
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setcardsArray(() => numberArray());
  };

  // to show the alert when the game is finished
  const alertAfterCompletion = () => {
    return Alert.alert(
      'Congratulation :)',
      `You took ${moves} many moves. Want to Play again?`,
      [
        {
          text: 'No',
          onPress: () => {},
        },
        {text: 'Yes', onPress: () => handleRestart()},
      ],
    );
  };

  return (
    <ScreenContainer>
      <Header onPressRestart={handleRestart} moves={moves} />
      <View style={screenStyles.outerCardContainer}>
        {cardsArray.map((value, index) => {
          return renderItem(value, index);
        })}
      </View>

      {showModal && alertAfterCompletion()}
    </ScreenContainer>
  );
};

export default GameScreen;
