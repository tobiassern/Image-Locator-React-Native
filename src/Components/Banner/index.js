/**--- Node Modules ---**/
import React, { Component } from 'react';
import { Button, Image, View } from 'react-native';
import { FacebookAds } from 'expo';

/**--- Core ---**/
import { ENV } from 'App/Core/env';

export default class Banner extends Component {
	render() {
		return (
			<View>
				{ENV.FB_BANNER_PLACEMENT_ID &&
				<FacebookAds.BannerView
	        		placementId={ENV.FB_BANNER_PLACEMENT_ID}
	        		type="standard"
	       			onPress={() => console.log('click')}
	        		onError={(err) => console.log('error', err)}
	    		/>
	    		}
			</View>
		);
	}
}