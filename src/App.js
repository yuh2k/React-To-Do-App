import React,{useState} from "react";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './ToDo';
import About from './About';
import NavBar from './NavBar';
import Main from './Main';
import Transactions from './Transactions';
import { Container } from 'react-bootstrap';

export default function App(){
  let [page,setPage]=useState('Main')

  let theApp
  if (page === 'ToDo')  {
    theApp = <ToDo />
  } else if (page === "About") {
    theApp = <About />
  } else if (page === "Main") {
    theApp = <Main />
  } else if (page === "Transactions") {
    theApp = <Transactions />
  }

  return (
    <Container>
      <NavBar setPage={setPage} />
      {theApp}
    </Container>
  )
}
