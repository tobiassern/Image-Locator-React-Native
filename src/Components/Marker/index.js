/**--- Node Modules ---**/
import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { MapView } from 'expo';

/**--- Core ---**/
import { CONSTANTS } from 'App/Core/constants';
import { COLORS } from 'App/Core/colors';

export default class Marker extends Component {

    constructor(props) {
        super(props);
        this.animatedMarker = new Animated.Value(0);
    }

    componentDidMount() {
        Animated.timing(
            this.animatedMarker,
            {
                toValue: 1,
                duration: CONSTANTS.MAP_MARKER_ANIMATION,
                easing: Easing.bounce,
                delay: this.props.delay ? CONSTANTS.MAP_ANIMATION_SIZE_DURATION + 350 : CONSTANTS.MAP_VIEW_ANIMATION_DURATION + 350
            }).start(
                this.props.setLoading(false)
            );
    }

    onPressMapMarker() {
        this.refs.mapMarker.measure((ox, oy, width, height, px, py) => {
            let modalMarker = this.props.marker;
            modalMarker.measure = {
                ox: ox,
                oy: oy,
                width: width,
                height: height,
                px: px,
                py: py
            }
            this.props.setModalMarker(modalMarker);
        });
    }

  	render() {
    	return (
            <MapView.Marker
                coordinate={this.props.marker.coordinate}
                centerOffset={{x: 0, y: 0 - CONSTANTS.MARKER_CIRCLE_SIZE + CONSTANTS.MARKER_TRIANGLE_HEIGHT - 5 }}
            >
                <TouchableOpacity
                    onPress={() => this.onPressMapMarker()}
                    ref='mapMarker'
                >
                    <Animated.View
                        style={
                            [
                            styles.marker,
                            {
                                opacity: this.animatedMarker,
                                transform: [
                                    {
                                        scale: this.animatedMarker
                                    },
                                    {
                                        translateY: this.animatedMarker.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [-50, 0]
                                        })
                                    }
                                ]
                            }
                            ]
                        }
                    >
                        <View style={styles.markerCircle}>
                            <View style={styles.markerImageWrap} >
                                <Image
                                    source={{uri: this.props.marker.image}}
                                    style={styles.markerImage}
                                />
                            </View>
                        </View>
                        <View style={styles.markerTriangle} />
                    </Animated.View>
                </TouchableOpacity>
            </MapView.Marker>
    	);
  	}
}

const styles = StyleSheet.create({
    marker: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    markerCircle: {
        width: CONSTANTS.MARKER_CIRCLE_SIZE,
        height: CONSTANTS.MARKER_CIRCLE_SIZE,
        borderRadius: CONSTANTS.MARKER_CIRCLE_SIZE,
        padding: CONSTANTS.MARKER_CIRCLE_PADDING,
        backgroundColor: COLORS.MAP_MARKER_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    markerImageWrap: {
        width: CONSTANTS.MARKER_CIRCLE_SIZE - CONSTANTS.MARKER_CIRCLE_PADDING,
        height: CONSTANTS.MARKER_CIRCLE_SIZE - CONSTANTS.MARKER_CIRCLE_PADDING,
        borderRadius: CONSTANTS.MARKER_CIRCLE_SIZE - CONSTANTS.MARKER_CIRCLE_PADDING,
        overflow: 'hidden'
    },
    markerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    markerTriangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: CONSTANTS.MARKER_TRIANGLE_WIDTH,
        borderRightWidth: CONSTANTS.MARKER_TRIANGLE_WIDTH,
        borderTopWidth: CONSTANTS.MARKER_TRIANGLE_HEIGHT,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: COLORS.MAP_MARKER_COLOR,
        top: -5
    }
});