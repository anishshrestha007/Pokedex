import React, { Component } from "react";
import { Transition, Image, Label } from "semantic-ui-react";

const transitions = [
  "jiggle",
  "flash",
  "shake",
  "pulse",
  "tada",
  "bounce",
  "glow"
];

class TransitionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: transitions[0],
      duration: this.props.duration ? this.props.duration : 500,
      visible: this.props.visible ? this.props.visible : true
    };
  }

  render() {
    const { animation, duration, visible } = this.state;

    return (
      <Transition animation={animation} duration={duration} visible={visible}>
        <Label color="teal"> {this.props.childComponent} </Label>
      </Transition>
    );
  }
}
export default TransitionComponent;
