/**--- Node Modules ---**/
import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ImagePicker } from 'expo';

/**--- Core ---**/
import { COLORS } from 'App/Core/colors';

/**--- Components ---**/
import Button from 'App/Components/Button';
import SecondaryAction from 'App/Components/SecondaryAction';

export default class ActionRow extends PureComponent {

    async pickImage() {

        let result = await ImagePicker.launchImageLibraryAsync({exif: true});

        if (!result.cancelled) {
            if(!result.exif.GPSLongitude || ! result.exif.GPSLatitude) {
                this.props.setLoading(false);
                alert("We could not detect the position for this image");
            } else {
                this.props.setLoading(true);
                this.props.addMarker(
                    {
                        coordinate: {
                            longitude: result.exif.GPSLongitude,
                            latitude: result.exif.GPSLatitude,
                        },
                        image: result.uri,
                        exif: result.exif
                    }
                );
            }
        }

    }

    render() {
        return (
        	<View style={styles.actionRow} >
    			<View style={styles.secondaryActionWrap} >
                    {this.props.showClearButton && <SecondaryAction onPress={() => this.props.clearMarkers()} icon="ios-close-outline" />}
                </View>
    			<View style={{flex: 1}}>
    			<Button
                    style={styles.pickImageButton}
                    loading={this.props.loading}
                    onPress={() => this.pickImage()}
                >
                    Pick Image
                </Button>
    			</View>
    			<View style={styles.secondaryActionWrap}>
                    <SecondaryAction onPress={() => this.props.openInfoModal()} icon="ios-information-outline" />
    			</View>
        	</View>
        );
    };

}

const styles = StyleSheet.create({
	actionRow: {
		flexDirection: 'row',
		width: '100%',
		bottom: 40,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center'
	},
    secondaryActionWrap: {
        flex: 0.5,
        alignItems: 'center'
    },
    secondaryAction: {
        width: 45,
        height: 45,
        borderRadius: 45,
        backgroundColor: COLORS.MAIN_COLOR_OPACITY
    }
});