import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { HiShoppingCart, HiMinusCircle } from "react-icons/hi";
import { BsPlusCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/productsSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const productsInCart = useSelector((state) => state.products.cart) || [];
  const totalPrice = useSelector((state) => state.products.totalPrice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleDelete = (id) => {
    // console.log("THIS IS ID", id);
    dispatch({ type: "products/delProductFromCart", payload: id });
  };

  const handleDeleteAll = () => {
    dispatch({ type: "products/delAllFromCart" });
  };

  const handleAddProduct = (id) => {
    dispatch({ type: "products/addAnotherToCart", payload: id });
  };

  // const renderTotalPrice = () => {
  //   let total = 0;
  //   if (productsInCart.length > 0) {
  //     for (let i = 0; i < productsInCart?.length; i++) {
  //       total += productsInCart[i].price * productsInCart[i].productUnits;
  //     }
  //   }
  //   return total;
  //   // dispatch({ type: "products/renderTotalPrice" , payload: total});
  // };

  const cartEmptyMessage = () => {
    return (
      <>
        <h3 className="cart-empty">
          You haven't added any products to your cart yet...
        </h3>
      </>
    );
  };

  return productsInCart.length > 0 ? (
    <div className="cart-container">
      <div className="cart-top-container">
        <HiShoppingCart className="cart-cart" cursor="pointer" />
      </div>
      <Container className="cart-table">
        <Row>
          <Col>Title</Col>
          <Col>Image</Col>
          <Col>price</Col>
          <Col>Units</Col>
          {/* <Col></Col>
          <Col></Col> */}
          <Col>
            <button
              className="btn btn-outline-danger"
              onClick={handleDeleteAll}
            >
              Delete all
            </button>
          </Col>
        </Row>
        {productsInCart.map((product) => {
          return (
            <Row key={product.id}>
              <Col>{product.title}</Col>
              <Col>
                <img
                  className="cart-image"
                  src={product.image}
                  alt={product.category}
                />
              </Col>
              <Col>{product.price}$</Col>
              <Col>{product.productUnits}</Col>
              <Col>
                <BsPlusCircleFill
                  className="cart-delete"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleAddProduct(product)}
                ></BsPlusCircleFill>
              </Col>
              <Col>
                <HiMinusCircle
                  className="cart-delete"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(product.id)}
                ></HiMinusCircle>
              </Col>
              <Col></Col>
            </Row>
          );
        })}
      </Container>

      <br />
      <div className="cart-total-price">
        <label>Total price to pay:</label>
        <br />
        <span>${Math.round(totalPrice * 100) / 100}</span>
      </div>

      <br />
      <Link to="checkout" className="btn btn-dark">
        Buy Now
      </Link>
    </div>
  ) : (
    cartEmptyMessage()
  );
};

export default Cart;
