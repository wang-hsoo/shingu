import {atom} from "recoil"
import { DefaultTheme } from "styled-components"

export const isPopUp = atom({
    key: "Pop",
    default: false
})

export const isSearch = atom({
    key: "search",
    default: false
})

export const isDelete = atom({
    key: "delete",
    default: false
})

export const isTheme = atom({
    key:"theme",
    default: false
})


export const light: DefaultTheme = {
    bgColor: "#ffffff",
    blackWhite: "#000000",
    greenDark: "#95C94A",
    whiteGrey: "#ffffff",
};


export const dark: DefaultTheme = {
    bgColor: "#141414",
    blackWhite: "#ffffff",
    greenDark: "#3F3F3F",
    whiteGrey: "#262626",
};
