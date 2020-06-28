import React from "react";
import PropTypes from "prop-types";
import {
  Input,
  Card,
  Icon,
  Dropdown,
  Divider,
  Label,
  Button,
} from "semantic-ui-react";
import "../css/DashBoard.css";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { startGame } from "../../store/actions/gameAction";
import { toast } from "react-semantic-toasts";
import { showToast } from "../generics/Toast";

class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",

      error: false,
    };
  }
  handleChange = (e, data) => {
    this.setState({ userName: data.value });
  };

  handleStartGame = (event, { value }) => {
    const { userName, error } = this.state;

    var history = this.props.history;

    if (userName) {
      var gameInfo = {
        userName,
      };

      this.props.startGame &&
        this.props.startGame(gameInfo, () => {
          history.push("/Pokedex");
        });
    } else {
      showToast("warning", "Please enter username before playing game!");
    }
    this.setState({ error: userName !== "" ? false : true });
  };
  render() {
    const { error } = this.state;
    return (
      <div className="dashboard-main">
        <Card centered color="orange" raised={true}>
          <Card.Content>
            <Card.Header textAlign="center" color="orange">
              Lets start our journey !
            </Card.Header>
            <Card.Description>
              Pokémon - The franchise was created by Satoshi Tajiri in 1995, and
              is centered on fictional creatures called "Pokémon", which humans,
              known as Pokémon Trainers, catch and train to battle each other
              for sport. The English slogan for the franchise is "Gotta Catch
              'Em All". Works within the franchise are set in the Pokémon
              universe.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Input
              icon="user"
              error={error}
              iconPosition="left"
              placeholder="Enter you name here"
              onChange={this.handleChange.bind(this)}
              name="userName"
              id="uinput"
            />
            <Divider />

            <div className="center-wrapper">
              <Button
                onClick={this.handleStartGame}
                basic
                color="green"
                icon="play"
                content="Play"
                id="play"
              />
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const structuredSelector = createStructuredSelector({
  gameInfo: (state) => state.game.gameInfo,
});
const mapDispatchToProps = { startGame };
export default connect(structuredSelector, mapDispatchToProps)(DashBoard);
