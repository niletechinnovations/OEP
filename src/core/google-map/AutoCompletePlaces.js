import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { toast } from 'react-toastify';
import { geolocated } from "react-geolocated";
import GeoLocationData from './GeoLocationData';
import './AutoCompletePlaces.css';
import commonService from '../services/commonService';


class AutoCompletePlaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '', latitude:'', longitude:'', scriptLoading: false, 
    currentAddress: {country: "",
              state: "",
              city: "",
              postal_code: "",
              formatted_address: "", latitude: "", longitude: ""},
      locationEnabled: false,
   };
    this.updateGeoLocationAddress = this.updateGeoLocationAddress.bind(this);
  }
  
  componentDidMount() { 
      if(typeof google === "undefined") {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.src = `https://maps.google.com/maps/api/js?key=AIzaSyBaq7mc_lts3Xensjk7JvnUU1q8dNG0avo&libraries=places`;
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
        s.addEventListener('load', e => {
            this.setState({scriptLoading: true});
        })
      }
      else
        this.setState({scriptLoading: true});
    //this.setState({ address:this.props.setAddress });

  }

  updateGeoLocationAddress(coords) {
    
    if(coords.latitude && coords.longitude){
      
      this.setState({latitude: coords.latitude, longitude: coords.longitude, locationEnabled: true}, () => {
          commonService.getExternalAPI("https://maps.googleapis.com/maps/api/geocode/json?latlng="+coords.latitude+","+coords.longitude+"&key="+commonService.getGoogleAPIKey())
            .then( res => {  
           
            const googleMapData = res.data.results ? res.data.results[0] : [];
           
            if(googleMapData.address_components !== undefined && googleMapData.address_components.length > 0 ) {
              const getCountry = googleMapData.address_components.filter(function(item) { return item.types.indexOf('country') > -1;});
              const getState = googleMapData.address_components.filter(function(item) { return item.types.indexOf('administrative_area_level_1') > -1;});
              const getCity = googleMapData.address_components.filter(function(item) { return item.types.indexOf('administrative_area_level_2') > -1;});
              const getPostalCode = googleMapData.address_components.filter(function(item) { return item.types.indexOf('postal_code') > -1;})
              const formatted_address = googleMapData.formatted_address || "";
             // const getLocality = googleMapData.address_components.filter(function(item){ return item.types.indexOf('locality')> -1 ;})
              const addressInfo = {country: getCountry.length > 0 ? getCountry[0].long_name : "",
              state: getState.length > 0 ? getState[0].long_name : "",
              city: getCity.length > 0 ? getCity[0].long_name : "",
              postal_code: getPostalCode.length > 0 ? getPostalCode[0].long_name : "",
              formatted_address: formatted_address, latitude: coords.latitude, longitude: coords.longitude}; 
              this.setState({currentAddress: addressInfo});
            }
          } )
          .catch( err => {         
            
          } )
      });
    }
  }

  useCurrentLocation = event => {
    if(!this.state.locationEnabled){
      toast.error("Please allow to access your location");
      return;
    }
    else {
      this.props.setLatitudeLongitude(this.state.currentAddress.formatted_address,{latitude: this.state.currentAddress.latitude, longitude:this.state.currentAddress.longitude}, this.state.currentAddress.city, 
        this.state.currentAddress.state, this.state.currentAddress.country, this.state.currentAddress.postal_code) 
     
    }
  }

  handleChange = address => {
    this.setState({ address });
    if(address === "")
      this.props.setLatitudeLongitude(address,{lat:"", lng:""});
  };
 
  handleSelect = address => {
    this.setState({ address });
    console.log(address);
    var city = '';
    var state = '';
    var country = '';
    var postal_code = '';
    geocodeByAddress(address)
      .then(results => {
        
        var place = results[0];
        var componentForm = {
          premise: 'short_name',
          street_number: 'short_name',
          route: 'long_name',
          locality: 'long_name',
          administrative_area_level_1: 'long_name',
          country: 'long_name',
          postal_code: 'long_name'
        };
        for (var i = 0; i < place.address_components.length; i++) {
          var addressType = place.address_components[i].types[0];
          if (componentForm[addressType]) {
            if(addressType === 'locality')              
              city = place.address_components[i][componentForm[addressType]];            
            else if(addressType === 'country')
             country = place.address_components[i][componentForm[addressType]];
            else if(addressType === 'administrative_area_level_1')
             state = place.address_components[i][componentForm[addressType]];
            else if(addressType === 'postal_code')
              postal_code =  place.address_components[i][componentForm[addressType]];
            
          }
        }
        getLatLng(results[0])
      })
      //.then(latLng => console.log('Success', latLng))
      .then( 
        latLng => this.props.setLatitudeLongitude(address,latLng, city, state, country, postal_code) 
      )
      /*.then(({ lat, lng }) =>
        this.setState({ latitude:lat, longitude:lng })
        
        //this.props.setLatitudeLongitude(latLng)
      )*/
      .catch(error => console.error('Error', error));
  };
 
  render() {
    let address = ( (this.state.address==='' && this.props.address) ? this.props.address : this.state.address );
    
    let geoLocationTags = '';
    if(this.props.isGeolocationAvailable) {
      if(this.props.isGeolocationEnabled) {
        if(this.props.coords != null && !this.state.locationEnabled)
            geoLocationTags = <GeoLocationData cords = {this.props.coords} updateAddress = {this.updateGeoLocationAddress} />
      }
    }
    if(!this.state.scriptLoading)
      return (<></>);
    
    return (
      <>
      {geoLocationTags}
      <span className="use-current-location pull-right" onClick={this.useCurrentLocation}><span className="location-icon"><img src="https://retailoep.com/current_location.png" className="current-location-icon" /></span>Use current location</span>
      <PlacesAutocomplete
        value={address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                name: 'address',
                placeholder: 'Search Location ...',
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
                    <strong>
                      {suggestion.formattedSuggestion.mainText}
                    </strong>{' '}
                    <small>
                      {suggestion.formattedSuggestion.secondaryText}
                    </small>
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
//export default AutoCompletePlaces;
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(AutoCompletePlaces);