import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { MdDeleteForever } from "react-icons/md";
import { formatterCurrency } from "../currency/currencyFormater.ts";
import { NavLink } from "react-router-dom";
import StarRating from './StarRating'; // Импортируем компонент StarRating

type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeCartQuantity,
    } = useShoppingCart();

    const quantity = getItemQuantity(id);

    const addItemToCartButton = (
        <Button variant="outline-secondary" className="w-100" onClick={() => increaseCartQuantity(id)}>
            Add item to Cart
        </Button>
    );

    const quantityButtons = (
        <div className="d-flex align-items-center justify-content-center" style={{ gap: '0.5rem' }}>
            <Button variant="outline-secondary" size="sm" className="btn-sm border-0" onClick={() => decreaseCartQuantity(id)}>&minus;</Button>
            <span className="fs-5">{quantity}</span>
            <Button variant="outline-secondary" size="sm" className="btn-sm border-0" onClick={() => increaseCartQuantity(id)}>&#43;</Button>
            <Button variant="outline-danger" onClick={() => removeCartQuantity(id)} className="ms-5 border-0">
                <MdDeleteForever style={{ fontSize: '24px' }} />
            </Button>
        </div>
    );

    return (
        <Card style={{ marginBottom: "20px" }}>
            <NavLink to={`/products/${id}`}>
                <Card.Img variant="top" src={imgUrl} style={{ objectFit: 'cover' }} height="400px" className="" />
            </NavLink>
            <Card.Body className="d-flex flex-column" style={{ height: "100%" }}>
                <Card.Title className="d-flex justify-content-around align-items-baseline mb-4">
                    <span className="fs-3">BRAND:  {name}</span>
                    <span className="text-muted fs-5">{formatterCurrency(price)}</span>
                </Card.Title>
                <StarRating /> {/* Добавляем компонент StarRating */}
                <div className="mb-1">
                    {quantity === 0 ? addItemToCartButton : quantityButtons}
                </div>
            </Card.Body>
        </Card>
    );
}
