import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const AppConfirmCodeInput = (props) => {
  const {
    codeLength,
    textInputStyle,
    wrapperStyle,
    autoFocus,
    activeColor,
    codeInputLength,
    onCodeChange,
    secureTextEntry,
  } = props;

  const [codeArr, setCodeArr] = useState(new Array(codeLength).fill(''));
  const currentIndex = useRef(0);
  const codeInputRefs = useRef([]);

  const setFocus = (index) => {
    codeInputRefs.current[index].focus();
  };

  const blur = (index) => {
    codeInputRefs.current[index].blur();
  };

  const onInputCode = (text, index) => {
    currentIndex.current = index;
    let newCodeArr = [...codeArr];
    newCodeArr[index] = text;

    if (index == codeLength - 1) {
      if (newCodeArr[index].length === codeInputLength) {
        blur(index);
      }
    } else {
      if (newCodeArr[index].length < codeInputLength) {
        setCodeArr(newCodeArr);
      } else {
        setFocus(index + 1);
      }
    }
    onCodeChange && onCodeChange(newCodeArr.join(''));
    setCodeArr(newCodeArr);
  };

  const checkBackspace = (index, nativeEvent) => {
    if (nativeEvent.key === 'Backspace') {
      if (codeArr[index].length === 0 && index > 0) {
        setFocus(index - 1);
      }
    }
  };

  const renderItem = () => {
    let codeInputs = [];
    for (let i = 0; i < codeLength; i++) {
      codeInputs.push(
        <TextInput
          key={i}
          ref={(ref) => (codeInputRefs.current[i] = ref)}
          style={{
            flex: 1,
            textAlign: 'center',
            padding: 8,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: 'black',
            marginHorizontal: 6,
            ...textInputStyle,
          }}
          secureTextEntry={secureTextEntry}
          onKeyPress={({nativeEvent}) => checkBackspace(i, nativeEvent)}
          underlineColorAndroid="transparent"
          selectionColor={activeColor}
          returnKeyType={'done'}
          {...props}
          autoFocus={autoFocus && i == 0}
          onChangeText={(text) => onInputCode(text, i)}
          maxLength={codeInputLength}
          keyboardType={'number-pad'}
        />,
      );
    }
    return codeInputs;
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 16,
        ...wrapperStyle,
      }}>
      {renderItem()}
    </View>
  );
};

export {AppConfirmCodeInput};
