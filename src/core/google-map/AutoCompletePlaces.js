import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';




class AutoCompletePlaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '', scriptLoading: false };
  }
  componentDidMount() {
    
  }
  componentWillMount() {
    var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = `https://maps.google.com/maps/api/js?key=AIzaSyBaq7mc_lts3Xensjk7JvnUU1q8dNG0avo&libraries=places`;
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
        s.addEventListener('load', e => {
            this.setState({scriptLoading: true});
        })
  }
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };
 
  render() {
   
    if(!this.state.scriptLoading)
      return (<></>);
    
    return (
      <>
      
      
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                name: 'address',
                placeholder: 'Search Your Location ...',
                className: 'form-control location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      </>
    );
    
  }
}
export default AutoCompletePlaces;