import React from 'react';

class GeoLocationData extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '', scriptLoading: false };
  }

  render() {
    this.props.updateAddress(this.props.cords);
    return (<></>);
  }
}
export default GeoLocationData;