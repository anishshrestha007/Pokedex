import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { getPokeData, getPokeDetailData } from "../../store/actions/gameAction";
import "../css/PokeCard.css";
import {
  Grid,
  Card,
  Button,
  Label,
  Image,
  Header,
  Modal,
  Progress,
  Segment,
} from "semantic-ui-react";

import { showToast } from "./Toast";

class PokeCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pokeData: null, isModalOpen: false, pokeDetail: null };
  }
  componentDidMount() {}

  handleCellClick = (pokemon) => {
    const { pokeData } = this.state;
    !pokeData &&
      this.props.getPokeDetailData &&
      this.props.getPokeDetailData(pokemon.url, (resp) => {
        this.setState({ pokeDetail: resp });
        this.props.getPokeData(resp.varieties[0].pokemon.url, (resp) => {
          this.setState({ pokeData: resp });
        });
      });
  };
  changeModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };
  render() {
    const { gameInfo, pokemon } = this.props;
    const { pokeData, pokeDetail } = this.state;
    const { isModalOpen } = this.state;

    return (
      <React.Fragment>
        <Grid.Column
          key={pokemon.name}
          onClick={() => this.handleCellClick(pokemon)}
        >
          <div onClick={this.changeModal}>{_.capitalize(pokemon.name)}</div>

          {pokeData && isModalOpen && (
            <Modal open={isModalOpen} onClose={this.changeModal} closeIcon>
              <Modal.Header>{_.capitalize(pokemon.name)}</Modal.Header>
              {pokeData ? (
                <Modal.Content image scrolling>
                  <Image
                    wrapped
                    size="medium"
                    src={pokeData.sprites.front_shiny}
                  />
                  <Modal.Description>
                    <Segment color="brown">
                      {pokeDetail.flavor_text_entries[0].flavor_text}
                    </Segment>
                    <Header>Type</Header>
                    {pokeData.types &&
                      pokeData.types.map((p) => {
                        return (
                          <Label color="orange">
                            {_.capitalize(p.type.name)}
                          </Label>
                        );
                      })}
                    <Header>Stat</Header>
                    {pokeData.stats &&
                      pokeData.stats.map((p) => {
                        return (
                          <Progress
                            percent={p.base_stat}
                            progress={p.base_stat}
                            indicating
                            label={p.stat.name}
                          />
                        );
                      })}
                    <Header>Abilities</Header>
                    {pokeData.abilities &&
                      pokeData.abilities.map((p) => {
                        return (
                          <Label color="blue">
                            {_.capitalize(p.ability.name)}
                          </Label>
                        );
                      })}
                    <Header>Egg Groups</Header>
                    {pokeDetail.egg_groups &&
                      pokeDetail.egg_groups.map((p) => {
                        return (
                          <Label color="yellow">{_.capitalize(p.name)}</Label>
                        );
                      })}
                  </Modal.Description>
                </Modal.Content>
              ) : (
                "Loading ..."
              )}
            </Modal>
          )}
        </Grid.Column>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  gameInfo: (state) => state.game.gameInfo,
});
const mapDispatchToProps = {
  getPokeData,
  getPokeDetailData,
};
export default connect(structuredSelector, mapDispatchToProps)(PokeCard);
