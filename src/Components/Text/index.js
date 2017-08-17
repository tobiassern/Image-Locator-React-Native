/**--- Node Modules ---**/
import React, { PureComponent } from 'react';
import { StyleSheet, Text as RNText } from 'react-native';

/**--- Components ---**/

export default class Text extends PureComponent {
    render() {
        return (
        	<RNText style={[styles.text, this.props.style]} numberOfLines={this.props.numberOfLines} >{this.props.children}</RNText>
        );
    };
}

const styles = StyleSheet.create({
	text: {

	}
});