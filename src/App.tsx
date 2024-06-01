//import './App.css'
import {Navbar} from "./components/Navbar.tsx";
import {Route, Routes} from "react-router-dom";
import {Contacts} from "./pages/Contacts.tsx";
import {Home} from "./pages/Home.tsx";
import {About} from "./pages/About.tsx";
import {Store} from "./pages/Store.tsx";
import {Container} from "react-bootstrap";
import {ShoppingCartProvider} from "./context/ShoppingCartContext.tsx";
import {Item1} from "./pages/Item1.tsx";



function App() {




  return (
    <ShoppingCartProvider>
  <Navbar />

      <Container className="mb-3">

  <Routes>


    <Route path="/" element={<Home />}/>
    <Route path="/store" element={<Store />}/>
    <Route path="/contacts" element={<Contacts />}/>
    <Route path="/about" element={<About />}/>
    <Route path="/products/:id" element={<Item1 />}/>


  </Routes>


      </Container>

    </ShoppingCartProvider>
  )
}

export default App
