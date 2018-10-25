/**
 * App Store Module
 *
 * Handles some common global store items
 *
 */

import { IThemeStore } from './app';
import Cookies from 'js-cookie';
import {
	VuexModule,
	Module,
	Mutation,
	Action,
	getModule
} from 'vuex-module-decorators';
import store from '@/store';

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

/**
 * Color Theme enum, limiting the available color themes
 */
export enum ColorTheme {
	Dark = 'Dark',
	Light = 'Light'
}

/**
 * Size Theme enum, limiting the available size themes
 */
export enum SizeTheme {
	Small = 'Small',
	Normal = 'Normal',
	Large = 'Large'
}

/**
 * Theme interface, all themes need a class and can optionally specify if they are the default theme
 */
export interface ITheme {
	class: string;
	isDefault ?: boolean;
}

/**
 * A Theme Store is an object, keyed by a string (Theme Key Enum), with a Theme value
 */
export interface IThemeStore {
	[key: string]: ITheme;
}

/**
 * The App State Store Interface
 *
 * Defines the themes of the application:
 *
 * - `color`, a `ColorTheme`; and
 * - `size` a `SizeTheme`
 *
 * that can be used to retrieve the active theme from the corresponding IThemeStore
 * object constant (`COLOR_THEMES` and `SIZE_THEMES`)
 */
export interface IAppState {
	color: ColorTheme;
	size: SizeTheme;
}

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

/**
 * App Color Theme IThemeStore, keyed by the ColorTheme enum
 */
export const COLOR_THEMES: IThemeStore = {
	[ColorTheme.Dark]: {
		class: 'theme-dark'
	},
	[ColorTheme.Light]: {
		class: 'theme-light',
		isDefault: true
	}
};

/**
 * App Size Theme IThemeStore, keyed by the SizeTheme enum
 */
export const SIZE_THEMES: IThemeStore = {
	[SizeTheme.Large]: {
		class: 'theme-large'
	},
	[SizeTheme.Normal]: {
		class: 'theme-normal',
		isDefault: true
	},
	[SizeTheme.Small]: {
		class: 'theme-small'
	}
};

const COLOR_THEME_COOKIE_KEY = 'colorTheme';
const SIZE_THEME_COOKIE_KEY = 'sizeTheme';

const STORED_COLOR_THEME = Cookies.get(COLOR_THEME_COOKIE_KEY) as ColorTheme;
const STORED_SIZE_THEME = Cookies.get(SIZE_THEME_COOKIE_KEY) as SizeTheme;

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

function getDefaultTheme<T extends string>(theme: IThemeStore): T | undefined {
	return Object.keys(theme).find(
		(val) => (theme[val].isDefault ? theme[val].isDefault as boolean : false)
	) as T;
}

@Module({
	dynamic: true,
	store,
	name: 'app'
})
class App extends VuexModule {

	public colorTheme: ColorTheme | undefined
		= (STORED_COLOR_THEME && Object.values(ColorTheme).includes(STORED_COLOR_THEME))
		? STORED_COLOR_THEME : getDefaultTheme<ColorTheme>(COLOR_THEMES);

	public sizeTheme: SizeTheme | undefined
		= (STORED_SIZE_THEME && Object.values(SizeTheme).includes(STORED_SIZE_THEME))
			? STORED_SIZE_THEME : getDefaultTheme<SizeTheme>(SIZE_THEMES);

	@Mutation
	public SET_COLOR_THEME(newTheme: ColorTheme) {
		Cookies.set(COLOR_THEME_COOKIE_KEY, newTheme);
		this.colorTheme = newTheme;
	}

	@Mutation
	public SET_SIZE_THEME(newTheme: SizeTheme) {
		Cookies.set(SIZE_THEME_COOKIE_KEY, newTheme);
		this.sizeTheme = newTheme;
	}

	get colorThemeClass() {
		return (this.colorTheme ? COLOR_THEMES[this.colorTheme].class : '');
	}

	get sizeThemeClass() {
		return (this.sizeTheme ? SIZE_THEMES[this.sizeTheme].class : '');
	}
}

export const AppModule = getModule(new App({}));
