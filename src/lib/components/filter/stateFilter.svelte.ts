import { persistedState } from 'svelte-persisted-state';

export type UserPrefs = {
	selectedToken: string;
	type: 'buy' | 'sell';
	fiat: string;
};

export const filterState = persistedState<UserPrefs>(
	'user-prefs',
	{
		selectedToken: 'USDT',
		type: 'buy',
		fiat: 'USD'
	},
	{
		storage: 'local',
		syncTabs: true,
		beforeWrite: (value) => {
			console.log('Saving preferences:', value);
			return value;
		},
		onWriteError: (error) => {
			console.error('Failed to save preferences:', error);
		}
	}
);
