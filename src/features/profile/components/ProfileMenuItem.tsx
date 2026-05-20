import React from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { theme } from '../../../theme';

interface Props {
  emoji: string;
  label: string;
  onPress?: () => void;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  showBorder?: boolean;
  destructive?: boolean;
}

export const ProfileMenuItem: React.FC<Props> = ({
  emoji,
  label,
  onPress,
  toggle = false,
  toggleValue = false,
  onToggle,
  showBorder = true,
  destructive = false,
}) => (
  <TouchableOpacity
    style={[styles.item, showBorder && styles.itemBorder]}
    onPress={onPress}
    activeOpacity={toggle ? 1 : 0.7}
    disabled={toggle}
  >
    <Text style={styles.emoji}>{emoji}</Text>
    <Text style={[styles.label, destructive && styles.labelDestructive]}>
      {label}
    </Text>
    {toggle ? (
      <Switch
        value={toggleValue}
        onValueChange={onToggle}
        trackColor={{
          false: theme.colors.border,
          true: theme.colors.primary + '88',
        }}
        thumbColor={toggleValue ? theme.colors.primary : theme.colors.surface}
      />
    ) : (
      <Text style={styles.arrow}>›</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  emoji: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  label: {
    ...theme.typography.bodyMd,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  labelDestructive: {
    color: theme.colors.error,
  },
  arrow: {
    fontSize: 20,
    color: theme.colors.textMuted,
  },
});