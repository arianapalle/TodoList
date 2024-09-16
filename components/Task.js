import React from 'react';
import {View, Text, Stylesheet, TouchableOpacity} from 'react-native';


const Task = (props) => {
    return (
        <View style={styles.items}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={StyleSheet.circle}></TouchableOpacity>
                <Text style={styles.itemText}>{props.text} </Text>

            </View>
            <View style={styles.circular}></View>
        </View>
    );   
};

const styles = Stylesheet.create({
    items: {},

    itemLeft: {},

    circle: {},

    itemText: {},

    circular: {},
});

export default Task;