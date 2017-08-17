/**--- Node Modules ---**/
import React, { PureComponent } from 'react';
import { StyleSheet, View, Dimensions, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**--- Core ---**/
import { COLORS } from 'App/Core/colors';

/**--- Translations ---**/
import { translate } from 'App/Translations';

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
				duration: 750,
				easing: Easing.easeIn,
				useNativeDriver: true
			}
		).start();
	}
	render() {
		return (
			<Animated.View
				style={[
					styles.noMapView,
					{
						transform: [{
							translateY: this.animateNoMapView.interpolate({
								inputRange: [0, 1],
								outputRange: [-50, 0]
							}),
						}],
						opacity: this.animateNoMapView
					}
				]}
			>
				<Animated.View
					style={{
						transform: [{
							translateY: this.animateNoMapView.interpolate({
								inputRange: [.25, 1],
								outputRange: [-25, 0]
							}),
						}],
					}}
				>
					<Ionicons name="ios-aperture-outline" size={80} color={COLORS.PRIMARY_TEXT_COLOR} />
				</Animated.View>
				<Text style={styles.noMapViewText}>{translate('Find_location')}</Text>
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