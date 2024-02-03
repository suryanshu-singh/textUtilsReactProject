import {initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDbE3OI8OXdmwh4x5sbxg7QwcJ_1UT4IXo",
    authDomain: "react-openai-b0c77.firebaseapp.com",
    databaseURL: "https://react-openai-b0c77-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-openai-b0c77",
    storageBucket: "react-openai-b0c77.appspot.com",
    messagingSenderId: "44092147722",
    appId: "1:44092147722:web:8c017350984094cc56f7f3"
};

export const app = initializeApp(firebaseConfig);