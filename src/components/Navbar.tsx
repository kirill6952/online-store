import { Button, Container, Form, Nav, Navbar as NavbarBs, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { BsFillBagHeartFill } from "react-icons/bs";
import { useState } from "react";
import { StoreItem } from "./StoreItem.tsx";

export function Navbar() {
    const { cartQuantity, openCart, searchTerm, setSearchTerm, filteredItems } = useShoppingCart();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div>
            <NavbarBs sticky="top" className='bg-light shadow mb-4'>
                <Container>
                    <NavbarBs.Brand as={NavLink} to="/">
                        <img src="/imgs/logo.jpg" alt="Logo" style={{ height: '50px', marginRight: '10px' }} />
                        Hand-Watches.com
                    </NavbarBs.Brand>
                    <Nav className="me-auto">
                        <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
                        <Nav.Link to="/contacts" as={NavLink}>Contacts</Nav.Link>
                        <Nav.Link to="/about" as={NavLink}>About</Nav.Link>
                        <Nav.Link to="/store" as={NavLink}>Store</Nav.Link>
                    </Nav>
                    <NavLink className="nav-link" >
                        <Form className="d-flex">
                            <Form.Control
                                placeholder="Search for items"
                                type="text"
                                onClick={() => {
                                    const currentPath = window.location.pathname;
                                    if (currentPath !== "/store") {
                                        handleShow();
                                    }
                                }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Form>
                    </NavLink>
                    <div className="ms-3">
                        {cartQuantity > 0 && (
                            <Button onClick={openCart} variant="outline-secondary">
                                <div className="d-flex align-items-center">
                                    <span className="me-2 fs-4">
                                        <BsFillBagHeartFill style={{ fontSize: '24px' }} />
                                    </span>
                                    <span>{cartQuantity}</span>
                                </div>
                            </Button>
                        )}
                    </div>
                    <Offcanvas show={show} onHide={handleClose} placement='start'>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Search</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <ul className="list-group">
                                {filteredItems.map(item => (
                                    <li key={item.id} className="list-group-item">
                                        <StoreItem
                                            id={item.id}
                                            name={item.name}
                                            price={item.price}
                                            imgUrl={item.imgUrl}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </Offcanvas.Body>
                    </Offcanvas>
                </Container>
            </NavbarBs>
        </div>
    )
}
