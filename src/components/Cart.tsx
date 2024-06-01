import {useShoppingCart} from "../context/ShoppingCartContext.tsx";
import {Offcanvas, Stack} from "react-bootstrap";
import {CartItem} from "./CartItem.tsx";
import storeItems from "../data/item.json";
import {formatterCurrency} from "../currency/currencyFormater.ts";


type CartProps = {
    isOpen: boolean
}


export function Cart({isOpen}: CartProps){

    const {closeStoreList,cartItems}= useShoppingCart()

    return(
        <Offcanvas show={isOpen} onHide={closeStoreList} placement='end'>

            <Offcanvas.Header closeButton>
                <Offcanvas.Title>My Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

                <Stack gap={3}>
                    {cartItems.map(item => {
                        return <CartItem key={item.id} {...item}></CartItem>;
                    })}



                <div className="fw-bold fs-4 ms- me-auto">
                    Total:{' '}
                   {formatterCurrency(cartItems.reduce((total, cartItem)=>{

                        const item = storeItems.find(i => i.id === cartItem.id)
                        return total + (item?.price || 0) * cartItem.quantity
                    }, 0)) }
                </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}