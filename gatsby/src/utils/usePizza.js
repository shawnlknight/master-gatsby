import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // Create state to hold order
  // We got rid of this line bc it is moved up to the provider
  // const [order, setOrder] = useState([]);
  // Now we access our state and our update function (setOrder)
  // via context
  const [order, setOrder] = useContext(OrderContext);
  // make a function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // make a function to remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everthing before the item we want to remove
      ...order.slice(0, index),
      // everthing after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // send this data to a serverless function when they check out
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
