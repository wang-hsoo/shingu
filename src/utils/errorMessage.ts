import {  store } from "react-notifications-component";
import ReactNotification from 'react-notifications-component'



export const LoginError = ()=> {
    return store.addNotification({
        title: "로그인 오류!",
        message: "빈칸을 모두 채워주세요",
        type: "warning",
        insert: "bottom",
        container: "bottom-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
        
      });
}

export const LoginMatchError = () => {
    return store.addNotification({
        title: "로그인 오류!",
        message: "아이디 또는 비밀번호가 일치하지 않습니다.",
        type: "danger",
        insert: "bottom",
        container: "bottom-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
}