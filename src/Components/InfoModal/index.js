/**--- Node Modules ---**/
import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity } from 'react-native';

/**--- Components ---**/
import Text from 'App/Components/Text';

export default class InfoModal extends Component {

	constructor(props) {
		super(props);
	}

    render() {
        return (
        	<Modal
        		visible={this.props.showInfoModal}
        		animationType={"slide"}
        	>
        		<View style={styles.infoModalHeader}>
        			<TouchableOpacity
        				onPress={() => this.props.closeInfoModal()}
                        style={styles.infoModalHeaderClose}
        			>
        				<Text style={{fontSize: 18}}>Close</Text>
        			</TouchableOpacity>
        		</View>
        	</Modal>
        );
    };
}

const styles = StyleSheet.create({
	infoModal: {

	},
	infoModalHeader: {
		height: 64,
		paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
	},
    infoModalHeaderClose: {
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 44
    }
});