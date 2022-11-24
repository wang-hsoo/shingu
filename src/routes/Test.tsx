import React, { useEffect, useState } from "react";
import NotiPush from "../NotiPush";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

function Test(){

    // const useNotification = (title, options) => {
       
    //     if (!("Notification" in window)) {
    //       return;
    //     }
    //     const fireNotif = () => {
    //       if (Notification.permission !== "granted") {
    //         Notification.requestPermission().then((permission) => {
    //           if (permission === "granted") {
    //             new Notification(title, options);
    //           } else {
    //             return;
    //           }
    //         });
    //       } else {
    //         new Notification(title, options);
    //       }
    //     };
    //     return fireNotif;
    //   };

    //   const click = useNotification("hello, reactHook",{
    //     body: "Nice React"
    //   }); 

    const a = () => {
        store.addNotification({
            title: "Wonderful!",
            message: "teodosii@react-notifications-component",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
    }
   

    return(
        <div>
            <button className='btn btn-info'
                onClick={() => a()}>Info
            </button>
            <ReactNotification />
        </div>
    )
}

export default Test;