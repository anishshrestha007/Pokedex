import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, gameStore: gameStore, ...rest }) {
  return (
    <Route
      {...rest}
      render={(prop) => {
        let _gameState = gameStore.getState();
        const gameInfo = _gameState.game.gameInfo;
        return gameInfo.userName ? (
          <Component {...prop} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: prop.location,
              },
              children: prop.children,
            }}
          />
        );
      }}
    />
  );
}

export default PrivateRoute;
