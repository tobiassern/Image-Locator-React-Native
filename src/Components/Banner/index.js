/**--- Node Modules ---**/
import React, { PureComponent } from 'react';
import { Button, Image, View, Animated, Easing } from 'react-native';
import { FacebookAds } from 'expo';

/**--- Core ---**/
import { ENV } from 'App/Core/env';
import { COLORS } from 'App/Core/colors';

FacebookAds.AdSettings.addTestDevice(FacebookAds.AdSettings.currentDeviceHash);

export default class Banner extends PureComponent {
	constructor(props) {
		super(props);
		this.animateBanner = new Animated.Value(70);
	}
	componentDidMount() {
		Animated.timing(
			this.animateBanner,
			{
				toValue: 0,
				duration: 1000,
				delay: 1000,
				easing: Easing.ease
			}).start();
	}

	render() {
		return (
			<Animated.View
				style={{
					backgroundColor: COLORS.APP_BACKGROUND_COLOR,
					height: 70,
					justifyContent: 'flex-start'
				}}
			>
				{ENV.FB_BANNER_PLACEMENT_ID &&
				<FacebookAds.BannerView
	        		placementId={ENV.FB_BANNER_PLACEMENT_ID}
	        		type="standard"
	       			onPress={() => console.log('click')}
	        		onError={(err) => console.log('error', err)}
	    		/>
	    		}
			</Animated.View>
		);
	}
}