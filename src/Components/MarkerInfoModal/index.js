/**--- Node Modules ---**/
import React, { Component } from 'react';
import { StyleSheet, View, Modal, Image, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
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

export default class MarkerInfoModal extends Component {

	constructor(props) {
		super(props);
		this.animateImage = new Animated.Value(0);
		this.animateInfo = new Animated.Value(0);
		this.imageInitialWidth = '100%';
		this.imageInitialHeight = '100%';
	}

	componentWillReceiveProps({modalMarker}) {
		if(modalMarker && this.props.modalMarker !== modalMarker) {
			this.animateImageInitiate(1);
			this.imageInitialWidth = this.getPercentDifference(modalMarker.measure.height / modalMarker.measure.width);
			this.imageInitialHeight = this.getPercentDifference(modalMarker.measure.width / modalMarker.measure.height);
		}
		if(!modalMarker) {
			this.animateImage = new Animated.Value(0);
		}
	}

	getPercentDifference(diff) {
		if(diff > 1) {
			return `${diff*100}%`
		} else {
			return '100%';
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
				duration: 0,
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
			<Animated.View
				style={{
					flex: 1,
					backgroundColor: this.animateImage.interpolate({
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

				<Animated.View
					style={{
						position: 'absolute',
						justifyContent: 'center',
						alignItems: 'center',
						overflow: 'hidden',
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
					<Animated.Image
						style={
							{
								position: 'absolute',
								width: this.animateImage.interpolate({
									inputRange: [0, 1],
									outputRange: [this.imageInitialWidth, '100%']
								}),
								height: this.animateImage.interpolate({
									inputRange: [0, 1],
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