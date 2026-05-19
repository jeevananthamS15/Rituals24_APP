import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import {theme} from '../../theme';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  secure?: boolean;
}

export const AppInput = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  secure = false,
  ...inputProps
}:Props) => {
  const [focused, setFocused] = useState(false);
  const [showSecure, setShowSecure] = useState(!secure);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputRow,
          focused && styles.inputRowFocused,
          !!error && styles.inputRowError,
        ]}>
        {leftIcon && <Text style={styles.leftIcon}>{leftIcon}</Text>}

        <TextInput
          style={styles.input}
          placeholderTextColor={theme.colors.textMuted}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          secureTextEntry={secure && !showSecure}
          selectionColor={theme.colors.primary}
          {...inputProps}
        />

        {secure ? (
          <TouchableOpacity
            onPress={() => setShowSecure(v => !v)}
            style={styles.rightIconBtn}>
            <Text style={styles.rightIcon}>{showSecure ? '👁' : '🙈'}</Text>
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.rightIconBtn}
            disabled={!onRightIconPress}>
            <Text style={styles.rightIcon}>{rightIcon}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: theme.spacing.xs,
  },
  label: {
    ...theme.typography.labelMd,
    color: theme.colors.textSecondary,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.radii.md,
    paddingHorizontal: theme.spacing.md,
    height: 52,
    backgroundColor: theme.colors.surface,
    gap: theme.spacing.sm,
  },
  inputRowFocused: {
    borderColor: theme.colors.primary,
  },
  inputRowError: {
    borderColor: theme.colors.error,
  },
  leftIcon: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    ...theme.typography.bodyMd,
    color: theme.colors.textPrimary,
  },
  rightIconBtn: {
    padding: theme.spacing.xs,
  },
  rightIcon: {
    fontSize: 16,
  },
  error: {
    ...theme.typography.caption,
    color: theme.colors.error,
  },
  hint: {
    ...theme.typography.caption,
    color: theme.colors.textMuted,
  },
});
