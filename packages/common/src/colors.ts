import oc from "open-color";

import type { Merge } from "./utility-types";

export const COLOR_OUTLINE_CONTRAST_THRESHOLD = 240;

// FIXME can't put to utils.ts rn because of circular dependency
const pick = <R extends Record<string, any>, K extends readonly (keyof R)[]>(
  source: R,
  keys: K,
) => {
  return keys.reduce((acc, key: K[number]) => {
    if (key in source) {
      acc[key] = source[key];
    }
    return acc;
  }, {} as Pick<R, K[number]>) as Pick<R, K[number]>;
};

export type ColorPickerColor =
  | Exclude<keyof oc, "indigo" | "lime">
  | "transparent"
  | "bronze";
export type ColorTuple = readonly [string, string, string, string, string];
export type ColorPalette = Merge<
  Record<ColorPickerColor, ColorTuple>,
  { black: "#0A0D0F"; white: "#FFFFFF"; transparent: "transparent" }
>;

// used general type instead of specific type (ColorPalette) to support custom colors
export type ColorPaletteCustom = { [key: string]: ColorTuple | string };
export type ColorShadesIndexes = [number, number, number, number, number];

export const MAX_CUSTOM_COLORS_USED_IN_CANVAS = 5;
export const COLORS_PER_ROW = 5;

export const DEFAULT_CHART_COLOR_INDEX = 4;

export const DEFAULT_ELEMENT_STROKE_COLOR_INDEX = 4;
export const DEFAULT_ELEMENT_BACKGROUND_COLOR_INDEX = 1;
export const ELEMENTS_PALETTE_SHADE_INDEXES = [0, 2, 4, 6, 8] as const;
export const CANVAS_PALETTE_SHADE_INDEXES = [0, 1, 2, 3, 4] as const;

export const getSpecificColorShades = (
  color: Exclude<
    ColorPickerColor,
    "transparent" | "white" | "black" | "bronze"
  >,
  indexArr: Readonly<ColorShadesIndexes>,
) => {
  return indexArr.map((index) => oc[color][index]) as any as ColorTuple;
};

export const COLOR_PALETTE = {
  transparent: "transparent",
  black: "#0A0D0F",
  white: "#FFFFFF",
  // Complete Tetrate color palette with all tints and shades
  gray: ["#F5F5F5", "#EBECEC", "#D8D9D9", "#9D9E9F", "#3B3D3F"],
  red: ["#fde1e0", "#fac3c1", "#f8a4a1", "#F36863", "#c2534f"],
  pink: getSpecificColorShades("pink", ELEMENTS_PALETTE_SHADE_INDEXES),
  grape: ["#DDD3FC", "#bca6f9", "#9a7af6", "#5721F0", "#461ac0"],
  violet: ["#DDD3FC", "#bca6f9", "#9a7af6", "#5721F0", "#461ac0"],
  blue: ["#D2E4FF", "#a4c8fe", "#77adfe", "#1C76FD", "#165eca"],
  cyan: getSpecificColorShades("cyan", ELEMENTS_PALETTE_SHADE_INDEXES),
  teal: getSpecificColorShades("teal", ELEMENTS_PALETTE_SHADE_INDEXES),
  green: ["#e2f3e8", "#c5e7d1", "#a7dab9", "#6DC28B", "#579b6f"],
  yellow: ["#fff5de", "#ffeabe", "#ffe09d", "#FFCB5C", "#cca24a"],
  orange: ["#FFDDCC", "#FFBB99", "#FF9966", "#FF5500", "#CC4400"],
  // tetrate bronze shades
  bronze: ["#f8f1ee", "#eaddd7", "#d2bab0", "#a18072", "#846358"],
} as ColorPalette;

const COMMON_ELEMENT_SHADES = pick(COLOR_PALETTE, [
  "orange", // Tetrate Orange - primary brand color
  "violet", // Tetrate Purple - primary supporting  
  "blue", // Tetrate Blue - primary supporting
  "red", // Tetrate Red - supporting
  "yellow", // Tetrate Yellow - supporting
  "green", // Tetrate Green - supporting
  "grape",
  "cyan",
  "teal",
  "pink",
]);

// -----------------------------------------------------------------------------
// quick picks defaults
// -----------------------------------------------------------------------------

// ORDER matters for positioning in quick picker - Tetrate brand colors first
export const DEFAULT_ELEMENT_STROKE_PICKS = [
  COLOR_PALETTE.orange[DEFAULT_ELEMENT_STROKE_COLOR_INDEX], // Tetrate Orange primary #FF5500
  COLOR_PALETTE.black, // Tetrate Black #0A0D0F
  COLOR_PALETTE.violet[DEFAULT_ELEMENT_STROKE_COLOR_INDEX], // Tetrate Purple #5721F0
  COLOR_PALETTE.blue[DEFAULT_ELEMENT_STROKE_COLOR_INDEX], // Tetrate Blue #1C76FD
  COLOR_PALETTE.red[DEFAULT_ELEMENT_STROKE_COLOR_INDEX], // Tetrate Red #F36863
] as ColorTuple;

// ORDER matters for positioning in quick picker - Tetrate brand colors first
export const DEFAULT_ELEMENT_BACKGROUND_PICKS = [
  COLOR_PALETTE.transparent,
  COLOR_PALETTE.orange[DEFAULT_ELEMENT_BACKGROUND_COLOR_INDEX], // Tetrate Orange light #FFBB99
  COLOR_PALETTE.violet[DEFAULT_ELEMENT_BACKGROUND_COLOR_INDEX], // Tetrate Purple light #bca6f9
  COLOR_PALETTE.blue[DEFAULT_ELEMENT_BACKGROUND_COLOR_INDEX], // Tetrate Blue light #a4c8fe
  COLOR_PALETTE.yellow[DEFAULT_ELEMENT_BACKGROUND_COLOR_INDEX], // Tetrate Yellow light #ffeabe
] as ColorTuple;

// ORDER matters for positioning in quick picker - Tetrate canvas backgrounds
export const DEFAULT_CANVAS_BACKGROUND_PICKS = [
  COLOR_PALETTE.white, // Tetrate White #FFFFFF
  "#F5F5F5", // Tetrate Light Gray
  "#FFDDCC", // Tetrate Orange lightest
  "#DDD3FC", // Tetrate Purple lightest  
  "#D2E4FF", // Tetrate Blue lightest
] as ColorTuple;

// -----------------------------------------------------------------------------
// palette defaults
// -----------------------------------------------------------------------------

export const DEFAULT_ELEMENT_STROKE_COLOR_PALETTE = {
  // 1st row - Tetrate primary colors
  transparent: COLOR_PALETTE.transparent,
  black: COLOR_PALETTE.black, // Tetrate Black
  white: COLOR_PALETTE.white, // Tetrate White
  gray: COLOR_PALETTE.gray, // Tetrate Gray scale
  bronze: COLOR_PALETTE.bronze,
  // Tetrate brand colors prioritized
  ...COMMON_ELEMENT_SHADES,
} as const;

// ORDER matters for positioning in pallete (5x3 grid)s - Tetrate colors first
export const DEFAULT_ELEMENT_BACKGROUND_COLOR_PALETTE = {
  transparent: COLOR_PALETTE.transparent,
  white: COLOR_PALETTE.white, // Tetrate White
  gray: COLOR_PALETTE.gray, // Tetrate Gray scale  
  black: COLOR_PALETTE.black, // Tetrate Black
  bronze: COLOR_PALETTE.bronze,
  // Tetrate brand colors prioritized
  ...COMMON_ELEMENT_SHADES,
} as const;

// -----------------------------------------------------------------------------
// helpers
// -----------------------------------------------------------------------------

// !!!MUST BE WITHOUT GRAY, TRANSPARENT AND BLACK!!!
export const getAllColorsSpecificShade = (index: 0 | 1 | 2 | 3 | 4) =>
  [
    // 2nd row
    COLOR_PALETTE.cyan[index],
    COLOR_PALETTE.blue[index],
    COLOR_PALETTE.violet[index],
    COLOR_PALETTE.grape[index],
    COLOR_PALETTE.pink[index],

    // 3rd row
    COLOR_PALETTE.green[index],
    COLOR_PALETTE.teal[index],
    COLOR_PALETTE.yellow[index],
    COLOR_PALETTE.orange[index],
    COLOR_PALETTE.red[index],
  ] as const;

export const rgbToHex = (r: number, g: number, b: number) =>
  `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

// -----------------------------------------------------------------------------
