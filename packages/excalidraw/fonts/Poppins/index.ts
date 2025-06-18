import { LOCAL_FONT_PROTOCOL } from "@excalidraw/common";

import { type ExcalidrawFontFaceDescriptor } from "../Fonts";

// Poppins font from Google Fonts
// Loaded externally via Google Fonts link in HTML head
export const PoppinsFontFaces: ExcalidrawFontFaceDescriptor[] = [
  {
    uri: LOCAL_FONT_PROTOCOL,
  },
];