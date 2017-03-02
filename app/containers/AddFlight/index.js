import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  postError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  createPost: PropTypes.func.isRequired,
};

class AddFlight extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    const { title, description } = props;

    this.props.createPost({ title, description });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <View>
        <Text>Add Flight</Text>
      </View>
    );
  }
}
export default AddFlight;