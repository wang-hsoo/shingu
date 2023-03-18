import {atom} from "recoil"
import { DefaultTheme } from "styled-components"
import { InewBoard } from "../service/Interface"

export const isPost = atom({
    key: "post",
    default: [] as InewBoard[]
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
    blackWhite: "#333333",
    greenDark: "#95C94A",
    whiteGrey: "#ffffff",
    white: "#ffffff",
    greyWhite: "#7D7D7D",
    greenOpa: "rgba(149,201,74,0.25)",
    greyDark: "#929292",
    whitePost: "ffffff"
};


export const dark: DefaultTheme = {
    bgColor: "#141414",
    blackWhite: "#ffffff",
    greenDark: "#3F3F3F",
    whiteGrey: "#262626",
    white: "#ffffff",
    greyWhite: "#ffffff",
    greenOpa: "#3F3F3F",
    greyDark: "#272727",
    whitePost: "1D1D1D"
};
