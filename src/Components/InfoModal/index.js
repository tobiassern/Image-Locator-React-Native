/**--- Node Modules ---**/
import React, { Component } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity } from 'react-native';

/**--- Core ---**/
import { COLORS } from 'App/Core/colors';
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
                    <View style={{flex: 0.25, height: 10}}>
                    </View>
                    <View style={{flex: 0.5, alignItems: 'center'}}>
                        <Text style={{fontSize: 20}}>Information</Text>
                    </View>
                    <View style={{flex: 0.25, alignItems: 'flex-end'}}>
            			<TouchableOpacity
            				onPress={() => this.props.closeInfoModal()}
                            style={styles.infoModalHeaderClose}
            			>
            				<Text style={{fontSize: 18}}>Close</Text>
            			</TouchableOpacity>
                    </View>
        		</View>
        	</Modal>
        );
    };
}

const styles = StyleSheet.create({
	infoModal: {

	},
	infoModalHeader: {
        backgroundColor: COLORS.MAIN_COLOR,
        height: 64,
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
	},
    infoModalHeaderClose: {
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 44
    }
});