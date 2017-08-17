/**--- Node Modules ---**/
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ImagePicker } from 'expo';

/**--- Core ---**/
import { CONSTANTS } from 'App/Core/constants';
import { COLORS } from 'App/Core/colors';

/**--- Components ---**/
import MapComponent from 'App/Components/MapComponent';
import ActionRow from 'App/Components/ActionRow';
import MarkerInfoModal from 'App/Components/MarkerInfoModal';
import InfoModal from 'App/Components/InfoModal';
import Banner from 'App/Components/Banner';
import NoMapView from 'App/Components/NoMapView';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			markers: [],
			coordinates: null,
			loading: false,
			modalMarker: null,
			showInfoModal: false
		}
	}

	_setState(state) {
		this.setState(state);
	}

	componentWillUnmount() {
		this._setState = () => {};
	}

	addMarker(marker) {
		let markers = this.state.markers;
		markers.push(marker);
		this._setState({
			markers: markers,
			coordinates: {
				longitude: marker.coordinate.longitude,
				latitude: marker.coordinate.latitude
			}
		})
	}

	clearMarkers() {
		this._setState({
			markers: [],
			loading: false
		});
	}

	setLoading(value) {
		if(!value) {
			setTimeout(() => {
				this._setState({loading: value})
			}, CONSTANTS.MAP_VIEW_ANIMATION_DURATION + CONSTANTS.MAP_MARKER_ANIMATION);
		} else {
			this._setState({loading: value})
		}

	}

	setModalMarker(modalMarker) {
		this._setState({
			modalMarker: modalMarker
		})
	}

	closeModal() {
		this._setState({
			modalMarker: null
		})
	}

	handleInfoModal(value) {
		this._setState({
			showInfoModal: value
		})
	}

    render() {
        return (
        	<View style={styles.container} >
	        	<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
	        		<MapComponent
	        			markers={this.state.markers}
	        			coordinates={this.state.coordinates}
	        			setLoading={(value) => this.setLoading(value)}
	        			setModalMarker={(modalMarker) => this.setModalMarker(modalMarker)}
	    			/>
	    			<NoMapView />
	        		<ActionRow
	        			addMarker={(marker) => this.addMarker(marker)}
	        			clearMarkers={() => this.clearMarkers()}
	        			showClearButton={this.state.markers.length > 0 ? true : false}
	        			loading={this.state.loading}
	        			setLoading={(value) => this.setLoading(value)}
	        			openInfoModal={() => this.handleInfoModal(true)}
	        		/>
	        	</View>
	        	<Banner />
	    		<MarkerInfoModal
	    			modalMarker={this.state.modalMarker}
	    			closeModal={() => this.closeModal()}
				/>
				<InfoModal
					showInfoModal={this.state.showInfoModal}
					closeInfoModal={() => this.handleInfoModal(false)}
				/>
        	</View>
        );
    };
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'stretch',
		backgroundColor: COLORS.APP_BACKGROUND_COLOR
	}
});