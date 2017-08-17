/**--- Node Modules ---**/
import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**--- Core ---**/
import { COLORS } from 'App/Core/colors';

/**--- Components ---**/

export default class SecondaryAction extends PureComponent {

	constructor(props) {
		super(props);
		this.animateSecondaryAction = new Animated.Value(0);
	}

	componentDidMount() {
		Animated.timing(
			this.animateSecondaryAction,
			{
				toValue: 1,
				duration: 350,
				delay: 350,
				easing: Easing.bounce,
				useNativeDriver: true
			}).start();
	}

    render() {
        return (
        	<TouchableOpacity onPress={() => this.props.onPress()} >
	        	<Animated.View
	        		style={[
	        			styles.secondaryAction,
	        			{
	        				transform: [{
	        					scale: this.animateSecondaryAction
	        				}]
	        			}
	    			]}
	        	>
	        		<Ionicons name={this.props.icon} size={45} color="#ffffff" />
	        	</Animated.View>
        	</TouchableOpacity>
        );
    };
}

const styles = StyleSheet.create({
	secondaryAction: {
        width: 45,
        height: 45,
        borderRadius: 45,
        backgroundColor: COLORS.SECONDARY_ACTION_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 2
	}
});