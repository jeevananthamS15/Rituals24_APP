export const APP_NAME = 'Rituals24';
export const APP_VERSION = '1.0.0';
export const APP_TAGLINE = 'Your Sacred Journey, Simplified';

export const BOOKING_STEPS = ['Service Mode', 'Date & Time', 'Pandits', 'Add-ons', 'Payment'];
export const BOOKING_TOTAL_STEPS = 5;

export const PANDIT_TIERS = {
  GOLD: 'gold',
  SILVER: 'silver',
  BRONZE: 'bronze',
} as const;

export const EXPLORE_TABS = ['All', 'Pandits', 'Poojas', 'Temples', 'Store', 'Bhajan'] as const;
export const STORE_TABS = ['All', 'Puja Kits', 'Ritual Items', 'Festival Specials', 'Best Seller', 'Bhajan Services'] as const;
export const BOOKING_TABS = ['Upcoming', 'Active', 'Completed', 'Cancelled'] as const;

export const MUHURAT_CALENDAR_TYPES = {
  AUSPICIOUS: 'Auspicious',
  FESTIVAL: 'Festival',
  PITRA: 'Pitra',
} as const;