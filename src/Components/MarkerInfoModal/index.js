/**--- Node Modules ---**/
import React, { Component } from 'react';
import { StyleSheet, View, Modal, Image, TouchableOpacity, Dimensions, Animated, Easing, PanResponder } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**--- Core ---**/
import { CONSTANTS } from 'App/Core/constants';
import { COLORS } from 'App/Core/colors';

/**--- Translations ---**/
import { translate } from 'App/Translations';

/**--- Components ---**/
import Text from 'App/Components/Text';

/**--- Constants ---**/
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

// https://mindthecode.com/getting-started-with-the-panresponder-in-react-native/

export default class MarkerInfoModal extends Component {

	constructor(props) {
		super(props);
		this.animateModal = new Animated.Value(0);
		this.imageInitialWidth = '100%';
		this.imageInitialHeight = '100%';
		this.state = {
			touching: false
		}
		this._setState = function(state) {
			this.setState(state);
		}
	}

	componentWillMount() {
		this._panResponder = PanResponder.create({
		      // Ask to be the responder:
		      onStartShouldSetPanResponder: (evt, gestureState) => true,
		      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
		      onMoveShouldSetPanResponder: (evt, gestureState) => true,
		      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

		      onPanResponderGrant: (evt, gestureState) => {
		        // The gesture has started. Show visual feedback so the user knows
		        // what is happening!
		        console.log("grant");
		        // gestureState.d{x,y} will be set to zero now
		      },
		      onPanResponderMove: (evt, gestureState) => {
		      	console.log("moving");
		        // The most recent move distance is gestureState.move{X,Y}

		        // The accumulated gesture distance since becoming responder is
		        // gestureState.d{x,y}
		      },
		      onPanResponderTerminationRequest: (evt, gestureState) => true,
		      onPanResponderRelease: (evt, gestureState) => {
		      	console.log("release");
		        // The user has released all touches while this view is the
		        // responder. This typically means a gesture has succeeded
		      },
		      onPanResponderTerminate: (evt, gestureState) => {
		        // Another component has become the responder, so this gesture
		        // should be cancelled
		      },
		      onShouldBlockNativeResponder: (evt, gestureState) => {
		        // Returns whether this component should block native components from becoming the JS
		        // responder. Returns true by default. Is currently only supported on android.
		        return true;
		      },
		    });
	}

	componentWillReceiveProps({modalMarker}) {
		if(modalMarker && this.props.modalMarker !== modalMarker) {
			this.animateModalInitiate(1);
			this.imageInitialWidth = this.getPercentDifference(modalMarker.measure.height / modalMarker.measure.width);
			this.imageInitialHeight = this.getPercentDifference(modalMarker.measure.width / modalMarker.measure.height);
		}
		if(!modalMarker) {
			this.animateModal = new Animated.Value(0);
		}
	}

	componentWillUnmount() {
		this._setState = () => {};
	}

	getPercentDifference(diff) {
		if(diff > 1) {
			return `${diff*100}%`
		} else {
			return '100%';
		}
	}
	animateModalInitiate(value) {
		value = value === 1 ? deviceHeight / 3 : 0;
		Animated.timing(
			this.animateModal,
			{
				toValue: value,
				duration: CONSTANTS.MARKER_MODAL_DURATION,
				easing: Easing.ease
			}).start();
	}


	closeModal() {
		this.animateModalInitiate(0);
		setTimeout(() => {
			this.props.closeModal();
		}, CONSTANTS.MARKER_MODAL_DURATION);
	}

	renderInnerModal() {
		return (
			<Animated.View
				style={{
					flex: 1,
					backgroundColor: this.animateModal.interpolate({
						inputRange: [0, 1],
						outputRange: ['transparent', COLORS.MARKER_MODAL_BACKGROUND]
					})
				}}
			>
				<TouchableOpacity
					style={{marginTop: 20, zIndex: 100, alignSelf: 'flex-start', height: 44, width: 44, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}
					onPress={() => this.closeModal()}
				>
					<View style={{width: 34, height: 34, borderRadius: 34, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', paddingTop: 2}}>
					<Ionicons name="ios-close-outline" size={39} color="#ffffff" />
					</View>
				</TouchableOpacity>
				<View
					{...this._panResponder.panHandlers}
					style={{
						backgroundColor: 'red',
						width: 200,
						height: 200,
						position: 'absolute',
						zIndex: 300,
						left: 100,
						top: 200
					}}
				>
				</View>
				<Animated.View
					style={{
						position: 'absolute',
						justifyContent: 'center',
						alignItems: 'center',
						overflow: 'hidden',
						width: this.animateModal.interpolate({
							inputRange: [0, deviceHeight / 3],
							outputRange: [CONSTANTS.MARKER_CIRCLE_SIZE - CONSTANTS.MARKER_CIRCLE_PADDING, deviceWidth]
						}),
						height: this.animateModal.interpolate({
							inputRange: [0, deviceHeight / 3],
							outputRange: [CONSTANTS.MARKER_CIRCLE_SIZE - CONSTANTS.MARKER_CIRCLE_PADDING, deviceHeight]
						}),
						borderRadius: this.animateModal.interpolate({
							inputRange: [0, deviceHeight / 3],
							outputRange: [CONSTANTS.MARKER_CIRCLE_SIZE - CONSTANTS.MARKER_CIRCLE_PADDING, 0]
						}),
						left: this.animateModal.interpolate({
							inputRange: [0, deviceHeight / 3],
							outputRange: [this.props.modalMarker.measure.px + 5, 0]
						}),
						top: this.animateModal.interpolate({
							inputRange: [0, deviceHeight / 3],
							outputRange: [this.props.modalMarker.measure.py + 5, 0]
						}),
					}}
				>
					<Animated.Image
						style={
							{
								position: 'absolute',
								width: this.animateModal.interpolate({
									inputRange: [0, deviceHeight / 3],
									outputRange: [this.imageInitialWidth, '100%']
								}),
								height: this.animateModal.interpolate({
									inputRange: [0, deviceHeight / 3],
									outputRange: [this.imageInitialHeight, '100%']
								}),
								resizeMode: 'contain'
							}
						}
						source={{uri: this.props.modalMarker.image}}
					/>
				</Animated.View>
				<View
					style={{
						position: 'absolute',
						height: 150,
						width: deviceWidth - 20,
						left: 10,
						bottom: 0
					}}
				>
					<View
						style={styles.modalInfo}
					>
						<Text>
							{translate('Date')}: {this.props.modalMarker.exif.DateTimeOriginal}
						</Text>
					</View>
				</View>
			</Animated.View>
		);
	}

    render() {
        return (
        	<Modal
        		visible={this.props.modalMarker ? true : false}
        		transparent={true}
        	>
        		{this.props.modalMarker && this.renderInnerModal()}
        	</Modal>
        );
    };
}

const styles = StyleSheet.create({
	modalInfo: {
		backgroundColor: '#ffffff',
		padding: 20,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5
	}
});