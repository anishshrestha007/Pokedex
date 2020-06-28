import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  getGameData,
  getGender,
  getGameDataByGender,
} from "../../store/actions/gameAction";
import "../css/Pokedex.css";
import { Grid, Input, Button, Icon, Dropdown, Label } from "semantic-ui-react";

import { showToast } from "../generics/Toast";
import PokeCard from "../generics/PokeCard";

import InfiniteScroll from "react-infinite-scroll-component";
class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeData: null,
      filteredData: null,
      sliceSize: 6,
      defaultSize: 33,
      error: false,
      pokeName: "",
      gender: null,
      genderType: null,
    };
  }
  componentDidMount() {
    const { sliceSize, defaultSize } = this.state;
    this.props.getGameData &&
      this.props.getGameData(this.props.gameInfo, (resp) => {
        this.setState({
          pokeData: resp,
          filteredData: resp.slice(0, defaultSize),
        });
      });
    this.props.getGender &&
      this.props.getGender(this.props.gameInfo, (resp) => {
        this.setState({
          gender: resp.map((g, i) => {
            return {
              key: g.name,
              value: g.name,
              text: g.name,
            };
          }),
        });
      });
  }

  fetchMoreData = () => {
    const { sliceSize, defaultSize, pokeData } = this.state;
    debugger;
    this.setState({
      filteredData: pokeData.slice(0, defaultSize + sliceSize),
      defaultSize: defaultSize + sliceSize,
    });
  };
  handleChange = (e, data) => {
    const { sliceSize, defaultSize, pokeData, pokeName } = this.state;
    this.setState({ pokeName: data.value });

    let _filterData =
      data.value !== ""
        ? pokeData.filter((pd) => pd.name.includes(data.value))
        : pokeData;

    this.setState({
      filteredData: _filterData.slice(0, defaultSize + sliceSize),
      defaultSize: defaultSize + sliceSize,
    });
  };
  handleDropDownChange = (e, data) => {
    debugger;
    const { sliceSize, defaultSize, pokeName } = this.state;
    this.setState({ genderType: data.value });

    if (data.value === "") {
      this.props.getGameData &&
        this.props.getGameData(this.props.gameInfo, (resp) => {
          let _filterData =
            pokeName !== ""
              ? resp.filter((pd) => pd.name.includes(pokeName))
              : resp;
          this.setState({
            pokeData: resp,
            filteredData: _filterData.slice(0, defaultSize),
          });
        });
    } else
      this.props.getGameDataByGender &&
        this.props.getGameDataByGender(
          this.props.gameInfo,
          data.value,
          (resp) => {
            debugger;
            let _filterData =
              pokeName !== ""
                ? resp.filter((pd) => pd.name.includes(pokeName))
                : resp;
            this.setState({
              pokeData: resp,
              filteredData: _filterData.slice(0, defaultSize),
            });
          }
        );
  };
  render() {
    const { gameInfo } = this.props;
    const { pokeData, filteredData, error, gender } = this.state;
    const chunckedData = filteredData && _.chunk(filteredData, gameInfo.size);

    return (
      <React.Fragment>
        <div className="d-flex ">
          <Input
            icon="search"
            iconPosition="right"
            error={error}
            iconPosition="left"
            placeholder="Search pokemon"
            onChange={this.handleChange.bind(this)}
            name="pokeName"
            id="uinput"
          />
          {gender && (
            <div className="rowC board-options">
              <Dropdown
                placeholder="Filter by Gender"
                fluid
                clearable
                selection
                options={gender}
                onChange={this.handleDropDownChange}
              />
              <Label>Gender</Label>
            </div>
          )}
        </div>

        {chunckedData && (
          <InfiniteScroll
            dataLength={filteredData.length}
            next={this.fetchMoreData}
            hasMore={
              pokeData.length > filteredData.length && filteredData.length >= 33
            }
            loader={<h4>Loading...</h4>}
          >
            <Grid columns={gameInfo.size} celled={true} textAlign="center">
              {chunckedData.map((pokemons, index) => (
                <Grid.Row key={index}>
                  {pokemons.map((pokemon, i) => (
                    <React.Fragment>
                      <PokeCard pokemon={pokemon} />
                    </React.Fragment>
                  ))}
                </Grid.Row>
              ))}
            </Grid>
          </InfiniteScroll>
        )}
        {pokeData && chunckedData.length === 0 && "No Data found!"}
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  gameInfo: (state) => state.game.gameInfo,
  data: (state) => state.game.gameInfo.data,
});
const mapDispatchToProps = {
  getGameData,
  getGender,
  getGameDataByGender,
};
export default connect(structuredSelector, mapDispatchToProps)(Pokedex);
