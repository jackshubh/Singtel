import React, {useRef} from 'react';
import {Image, TouchableOpacity, Text, Animated} from 'react-native';
import componentStyles from '../styles/componentStyles';

function Card({
  keyValue,
  value,
  index,
  isDisabled,
  isInactive,
  isFlipped,
  onClick,
}) {
  const flipAnimation = useRef(new Animated.Value(0)).current;

  let flipRotation = 0;

  flipAnimation.addListener(({value}) => (flipRotation = value));

  //  styling  for front side of the card while making it flip
  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  //  styling  for back side of the card while making it flip
  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  // Animation for flipping it to the front
  const flipToFront = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Animation for flipping it to the back
  const flipToBack = () => {
    Animated.timing(flipAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // handling the press when we press the card
  const handlePress = () => {
    !!flipRotation ? flipToBack() : flipToFront();
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <TouchableOpacity key={keyValue} onPress={!isInactive && handlePress}>
      {isFlipped || isInactive ? (
        <Animated.View style={{...flipToBackStyle}}>
          <Text style={componentStyles.insideCardText}>{value}</Text>
        </Animated.View>
      ) : (
        <Animated.View style={{...flipToFrontStyle}}>
          <Image source={require('../assets/card_back.jpg')} />
        </Animated.View>
      )}
    </TouchableOpacity>
  );
}
export default Card;
