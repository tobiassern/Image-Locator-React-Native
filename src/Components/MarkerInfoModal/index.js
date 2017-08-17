/**--- Node Modules ---**/
import React, { Component } from 'react';
import { StyleSheet, View, Modal, Image, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';

/**--- Core ---**/
import { CONSTANTS } from 'App/Core/constants';

/**--- Components ---**/
import Text from 'App/Components/Text';

/**--- Constants ---**/
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class MarkerInfoModal extends Component {

	constructor(props) {
		super(props);
		this.animateImage = new Animated.Value(0);
		this.animateInfo = new Animated.Value(0);
	}

	componentWillReceiveProps({modalMarker}) {
		if(modalMarker && this.props.modalMarker !== modalMarker) {
			this.animateImageInitiate(1);
		}
		if(!modalMarker) {
			this.animateImage = new Animated.Value(0);
		}
	}

	animateImageInitiate(value) {
		Animated.timing(
			this.animateImage,
			{
				toValue: value,
				duration: CONSTANTS.MARKER_MODAL_IMAGE_ANIMATION_DURATION,
				easing: Easing.ease
			}).start();
	}

	animateInfoInitiate(value) {
		Animated.timing(
			this.animateInfo,
			{
				toValue: value,
				duration: 1000,
				delay: CONSTANTS.MARKER_MODAL_IMAGE_ANIMATION_DURATION,
				easing: Easing.bounce
			}).start();
	}

	closeModal() {
		this.animateImageInitiate(0);
		setTimeout(() => {
			this.props.closeModal();
		}, CONSTANTS.MARKER_MODAL_IMAGE_ANIMATION_DURATION);
	}

	renderInnerModal() {
		return (
			<TouchableOpacity
				style={styles.markerInfoModal}
				onPress={() => this.closeModal()}
			>
				<Animated.View
					style={{
						position: 'absolute',
						width: this.animateImage.interpolate({
							inputRange: [0, 1],
							outputRange: [CONSTANTS.MARKER_CIRCLE_SIZE - CONSTANTS.MARKER_CIRCLE_PADDING, deviceWidth]
						}),
						height: this.animateImage.interpolate({
							inputRange: [0, 1],
							outputRange: [CONSTANTS.MARKER_CIRCLE_SIZE - CONSTANTS.MARKER_CIRCLE_PADDING, deviceHeight]
						}),
						borderRadius: this.animateImage.interpolate({
							inputRange: [0, 1],
							outputRange: [CONSTANTS.MARKER_CIRCLE_SIZE - CONSTANTS.MARKER_CIRCLE_PADDING, 0]
						}),
						overflow: 'hidden',
						left: this.animateImage.interpolate({
							inputRange: [0, 1],
							outputRange: [this.props.modalMarker.measure.px + 5, 0]
						}),
						top: this.animateImage.interpolate({
							inputRange: [0, 1],
							outputRange: [this.props.modalMarker.measure.py + 5, 0]
						}),
					}}
				>
					<Image
						style={styles.modalImage}
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
							Date: {this.props.modalMarker.exif.DateTimeOriginal}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
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
	markerInfoModal: {
		flex: 1,
		width: deviceWidth,
		height: deviceHeight
	},
	modalImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover'
	},
	modalInfo: {
		backgroundColor: '#ffffff',
		padding: 20,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5
	}
});