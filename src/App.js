import React, { Component } from 'react';
import './App.css';
import Map from './Map'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurants: [],
		}
	}

	componentDidMount() {
		fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=mexican+food&location=roanoke+va', {
			headers: {
				Authorization: 'Bearer wbY30-AwuCYL_fcal_TlDsx3725sox4hMSMH_YwS8pFGpGTHs1g7dqD3tDTbVuMSkrXoupbKjRktLpgR_VvePtm1SQW-5x7zRIsvf4OD1zNWqLfEpEIKYP-LBx3eW3Yx'
			}
		}).then(response => response.json()).then(response => {
			this.setState({restaurants:response.businesses})
			console.log(this.state);
		}).catch(err => console.error(err))
	}

  render() {
    return (
      <div className="App">
        <Map/>
      </div>
    );
  }
}

export default App;
