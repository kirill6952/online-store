import {Col, Row} from "react-bootstrap";
import storeItems from "../data/item.json"
import { StoreItem } from "../components/StoreItem";
import  { useEffect} from "react";
import {useShoppingCart} from "../context/ShoppingCartContext";




export function Store() {
    const {
        searchTerm,
        setSearchTerm,
        filteredItems,
        setFilteredItems,
    } = useShoppingCart();

    useEffect(()=>{
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filtered = storeItems.filter(item =>
        item.name.toLowerCase().includes(lowerCaseSearchTerm)
        );

        setSearchTerm(searchTerm)
        setFilteredItems(filtered)

    },[searchTerm])
    /*
       <Form className="d-flex">
                <Form.Control
                    placeholder="Search for items"
                    type="text"
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                />
            </Form>
     */
    return (
        <>
            <h1>Hand Watches</h1>

            <Row xs={1} md={2} lg={3} className="justify-content-center">
                {filteredItems.map((item) => (
                    <Col key={item.id}>

                        <StoreItem price={0} imgUrl={""} {...item} />
                    </Col>
                ))}
            </Row>
        </>
    );
}





