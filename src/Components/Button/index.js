/**--- Node Modules ---**/
import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';

/**--- Core ---**/
import { COLORS } from 'App/Core/colors';

/**--- Components ---**/
import Text from 'App/Components/Text';

/**--- Constants ---**/
const deviceWidth = Dimensions.get('window').width;

export default class Button extends PureComponent {

	constructor(props) {
		super(props);
		this.animateButton = new Animated.Value(0);
		this.animateSpinner = new Animated.Value(0);
	}

	componentDidMount() {
		this.animateSpinnerInitiate();
		this.animateButtonSize(this.props.loading ? 0 : 1);
	}

	componentWillReceiveProps({loading}) {
		if(this.props.loading !== loading && loading) {
			this.animateButtonSize(0);
		} else if(this.props.loading !== loading && !loading) {
			this.animateButtonSize(1);
		}
	}

	animateButtonSize(value) {
		Animated.timing(
			this.animateButton,
			{
				toValue: value,
				duration: 350,
				easing: Easing.bounce,
				useNativeDriver: false
			}).start();
	}

	animateSpinnerInitiate() {
		this.animateSpinner.setValue(0);
		Animated.timing(
			this.animateSpinner,
			{
				toValue: 1,
				duration: 1000,
				easing: Easing.linear
			}).start(() => this.animateSpinnerInitiate());
	}

    render() {
        return (
        	<TouchableOpacity
        		onPress={!this.props.loading ? () => this.props.onPress() : null}
        	>
	        	<Animated.View
	        		style={[
	        			styles.button,
	        			this.props.style,
	        			{
	        				width: this.animateButton.interpolate({
	        					inputRange: [0, 1],
	        					outputRange: [45, deviceWidth / 2]
	        				})
	        			}
	        			]}
	        	>
	        		<Animated.View
	        			style={{
	        				opacity: this.animatedButton
	        			}}
	        		>
	        			{!this.props.loading &&
	        				<Animated.View
	        					style={{
	        						opacity: this.animateButton
	        					}}
	        				>
	        					<Text style={styles.buttonText} numberOfLines={1} >{this.props.children}</Text>
        					</Animated.View>
	        			}
	        			{this.props.loading &&
	        				<Animated.View
	        					style={{
	        						borderWidth: 1,
	        						borderColor: '#ffffff',
	        						borderTopColor: 'transparent',
	        						width: 25,
	        						height: 25,
	        						borderRadius: 25,
        							transform: [{
        								rotate: this.animateSpinner.interpolate({
        									inputRange: [0, 1],
        									outputRange: ['0deg', '360deg']
        								})
        							}]
        						}}
	        				/>
	        			}
	        		</Animated.View>
	        	</Animated.View>
        	</TouchableOpacity>
        );
    };

}

const styles = StyleSheet.create({
	button: {
		backgroundColor: COLORS.MAIN_COLOR,
		height: 45,
		borderRadius: 45,
		paddingHorizontal: 20,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden'
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 16
	}
});