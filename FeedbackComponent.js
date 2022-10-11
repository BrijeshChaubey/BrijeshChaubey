import React from 'react';
import { StyleSheet,View,Text } from 'react-native';


export class FeedbackComponent extends React.Component {

    render() {
    
    return (
    
    <View style={Feedbackstyle.container}>
    
    <View style={Feedbackstyle.feedbackHead}>
    
    <Text style={Feedbackstyle.feedbackHeadText}>Feedbacks</Text>
    
    </View>
    
    <Text style={Feedbackstyle.feedbackHeadTime}>6hour</Text>
    
    <View style={Feedbackstyle. feedbackReceived}>
    
    <Text>{this.props. feadback}</Text>
    </View>
    <View style={Feedbackstyle.feedbackPosted} >

     <Text>Sent By: {this.props.SentBy}</Text> 
     <Text>Posted on: {this.props.postedon}</Text> 
     </View>
    </View>
    );
    }
}
const Feedbackstyle = StyleSheet.create({
 container: {
    
    height: 260,
    
    width: 330,
    
    borderWidth: 1,
    
    borderColor: 'black',
    
    margin: 20,
    
    position: 'relative',
    
    },


    feedbackHead: {

        height: 50, 
        backgroundColor:  'purple',
        
        margin: 8,
        position: 'relative',
    },
    feedbackHeadText: {
        display: 'flex',
        FlexDirection: "row", 
        alignself: 'flex-start',
         position: 'relative',
          padding: 5,
    },
    feedbackHeadTime: { 
        display: 'flex',
        flexDirection: 'row',
         alignself: 'flex-end',
          position: 'absolute',
          padding: 5,
          marginLeft:190, 
    },
    feedbackReceived: {

        height: 100,
        
        backgroundColor: 'grey',
         position: 'relative',
        
        margin: 8,
        justifyContent: 'flex-start',
        
        padding: 20,
        
        }, feedbackPosted: {
            height: 60,
            backgroundColor: 'grey', 
            margin: 8, 
             padding: 5, 
        },
    });

        
