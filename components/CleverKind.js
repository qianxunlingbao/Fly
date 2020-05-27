import React, { Component } from 'react'
import { StyleSheet, View, Text ,Image ,SectionList,Dimensions, TouchableOpacity, ScrollView, FlatList} from 'react-native'
const {width,height} = Dimensions.get('window');

class CleverKind extends Component {

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                showsVerticalScrollIndicator={false} 
                >
                    <View style = {{width:width * 0.85}}>
                    <SectionList
                    renderItem={({ item, index, section }) => 
                        <View style={{width:width * 0.85,height:height * 0.1,flexDirection:'row'}}>
                            <ScrollView
                            horizontal = {true}
                            >
                            </ScrollView>
                        </View>
            }
                renderSectionHeader={({ section: { title } }) => (
                <Text style={{ marginTop:20,fontWeight: "bold",fontSize:20,width:width * 0.85,height:height * 0.05}}>{title}</Text>
                )}
                sections={[
                    { title: "奇妙的时间漩涡", data: ["item1"] },
                    { title: "你喜欢的歌手与作曲", data: ["item3"] },
                    { title: "流派", data: ["item5"] },
                    { title: "主题", data: ["item6"] },
                    { title: "今日心情如何", data: ["item7"] },
                    { title: "语言", data: ["item8"] }
                ]}
                    keyExtractor={(item, index) => item + index}
/>

                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default CleverKind