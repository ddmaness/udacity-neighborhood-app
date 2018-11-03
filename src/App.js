import React, { Component } from 'react';
import './App.css';
import Map from './Map'

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972', {
			headers: {
				Authorization: 'Bearer wbY30-AwuCYL_fcal_TlDsx3725sox4hMSMH_YwS8pFGpGTHs1g7dqD3tDTbVuMSkrXoupbKjRktLpgR_VvePtm1SQW-5x7zRIsvf4OD1zNWqLfEpEIKYP-LBx3eW3Yx'
			}
		}).then(response => response.json()).then(response => console.log(JSON.stringify(response))).catch(err => console.error(err))
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
