/**--- Node Modules ---**/
import React, { Component } from 'react';
import { View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { MapView } from 'expo';

/**--- Core ---**/
import { CONSTANTS } from 'App/Core/constants';

/**--- Components ---**/
import Marker from 'App/Components/Marker';

/**--- Constants ---**/
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class MapComponent extends Component {

    constructor(props) {
        super(props);
        this.animateMapComponent = new Animated.Value(0);
    }

	animateMap(coordinates) {
		this.refs.map.animateToCoordinate(
            coordinates,
			CONSTANTS.MAP_VIEW_ANIMATION_DURATION
		);

	}

    animateMapSize(value) {
        Animated.timing(
            this.animateMapComponent,
            {
                toValue: value,
                duration: CONSTANTS.MAP_ANIMATION_SIZE_DURATION
            }).start();
    }

    componentWillReceiveProps({coordinates, markers}) {
        if(markers.length === 1) {
            this.animateMapSize(1);
        }
        if(markers.length === 0) {
            this.animateMapSize(0);
        }
        if(coordinates !== this.props.coordinates) {
            this.animateMap(coordinates);
        }

        if(coordinates !== this.props.coordinates && !this.props.coordinates) {
            setTimeout(() => {
                this.animateMap(coordinates);
            }, 1000);
        }
    }
  	render() {
    	return (
            <Animated.View
                style={{
                    backgroundColor: 'red',
                    height: this.animateMapComponent.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, deviceHeight],
                        extrapolate: 'clamp'
                    }),
                    width: this.animateMapComponent.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, deviceHeight],
                        extrapolate: 'clamp'
                    }),
                    borderRadius: this.animateMapComponent.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [deviceWidth, deviceHeight, 0],
                        extrapolate: 'clamp'
                    }),
                    overflow: 'hidden'
                }}
            >
          		<MapView
          			ref='map'
            		style={{ flex: 1 }}
            		initialRegion={{
              			latitude: 37.78825,
              			longitude: -122.4324,
              			latitudeDelta: 0.0922,
              			longitudeDelta: 0.0421,
        			}}
          		>
                    {this.props.markers.map((marker, index) => (
                        <Marker
                            delay={index === 0 ? true : false}
                            key={index}
                            marker={marker}
                            setLoading={(value) => this.props.setLoading(value)}
                            setModalMarker={(modalMarker) => this.props.setModalMarker(modalMarker)}
                        />
                    ))}
                </MapView>
            </Animated.View>
    	);
  	}
}