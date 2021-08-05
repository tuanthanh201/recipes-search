import { useState, Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./store/CartContextProvider";
import Spinner from "./components/UI/Spinner";

const Recipe = lazy(() => import("./components/Recipe/Recipe"));

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = (event) => {
    event.preventDefault();
    setCartIsShown(true);
  };

  const hideCartHandler = (event) => {
    event.preventDefault();
    setCartIsShown(false);
  };

  return (
    <CartContextProvider>
      <Header showCartHandler={showCartHandler} />
      {cartIsShown && <Cart hideCartHandler={hideCartHandler} />}
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact>
            <Meals />
          </Route>
          <Route path="/recipe/:recipe_id" exact>
            <Recipe />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </CartContextProvider>
  );
}

export default App;
