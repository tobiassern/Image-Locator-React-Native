/**--- Node Modules ---**/
import React, { PureComponent } from 'react';
import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**--- Components ---**/
import Text from 'App/Components/Text';

/**--- Constants ---**/
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class NoMapView extends PureComponent {

	constructor(props) {
		super(props);
		this.animateNoMapView = new Animated.Value(0);
	}

	componentDidMount() {
		Animated.timing(
			this.animateNoMapView,
			{
				toValue: 1,
				duration: 500
			}
		).start();
	}
    render() {
        return (
        	<Animated.View
        		style={[
        			styles.noMapView,
        			{
        				top: this.animateNoMapView.interpolate({
        					inputRange: [0, 1],
        					outputRange: [-50, 0]
        				}),
        				opacity: this.animateNoMapView
        			}
    			]}
        	>
        		<Ionicons name="ios-aperture-outline" size={80} color="black" />
        		<Text style={styles.noMapViewText}>Find the location of an image by pressing the "Pick Image" button</Text>
        	</Animated.View>
        );
    };
}

const styles = StyleSheet.create({
	noMapView: {
		position: 'absolute',
		width: deviceWidth,
		height: deviceHeight,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: -1,
		padding: 50
	},
	noMapViewText: {
		fontSize: 16,
		textAlign: 'center'
	}
});