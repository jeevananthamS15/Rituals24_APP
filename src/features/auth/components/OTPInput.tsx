import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { theme } from '../../../theme';

interface Props {
  length?: number;
  onComplete: (otp: string) => void;
}

export const OTPInput= ({ length = 4, onComplete }:Props) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const updated = [...values];
    updated[index] = digit;
    setValues(updated);

    if (digit && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (updated.every(v => v !== '')) {
      onComplete(updated.join(''));
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(length)
        .fill(null)
        .map((_, i) => (
          <TextInput
            key={i}
            ref={ref => {
              inputs.current[i] = ref;
            }}
            style={[styles.box, values[i] ? styles.boxFilled : null]}
            value={values[i]}
            onChangeText={text => handleChange(text, i)}
            onKeyPress={e => handleKeyPress(e, i)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
            selectionColor={theme.colors.primary}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    justifyContent: 'center',
  },
  box: {
    width: 56,
    height: 56,
    borderRadius: theme.radii.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    ...theme.typography.displayMd,
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  boxFilled: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surfaceElevated,
  },
});