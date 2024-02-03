// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
// import ChatbotApp from './components/ChatbotApp';
import { useState } from 'react';
import Alert from './components/Alert';
import { 
  BrowserRouter as Router, 
   Route,
   Link,
   Routes
   }from "react-router-dom";

function App() {
  const [alert,setAlert] = useState(null);

  const showAlert = (messages, type)=>{
    setAlert({
      msg : messages,
      type : type
    })
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }
  return (
  <>
  <Router>
    <div className="container">
    <Navbar title = "TextUtils" />
    <Alert alert = {alert}/> 
    </div>
    <div className="container my-5">
    {/* <TextForm showAlert = {showAlert} heading = "Enter text to analyze below:"/> */}
    
    <Routes>
    <Route exact path="/" element={<TextForm showAlert = {showAlert} heading = "Enter text to analyze below:"/>}/>
    <Route exact path="/about" element = {<About />}/>
    </Routes>
    </div>
    </Router>
    
  
  </>
  );
}

export default App;
