import Home from "./page/Home";
import Account from "./page/Account";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Search from "./page/Search";

import Footer from "./base/Footer";
import Header from "./base/Header";

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';



function App() {
  return (
    <div width="100vw" height="100vh">
      <Header/>
      <div id="content-wrapper" style={{"margin": "0px"}}>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/search' element={<Search/>}/>
          </Routes>
        </Router>
      </div>
      <Footer/>
    </div>
  );
}



export default App;
