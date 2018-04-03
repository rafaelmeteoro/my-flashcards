import React from 'react'
import { View, Platform } from 'react-native'
import AddDeckView from './components/AddDeckView'
import ListDeckView from './components/ListDeckView'
import CustomStatusBar from './components/CustomStatusBar'
import DeckView from './components/DeckView'
import AddCardView from './components/AddCardView'
import QuizView from './components/QuizView'
import { white, green } from './utils/colors'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { MaterialIcons } from '@expo/vector-icons'

const Tabs = TabNavigator({
    ListDeckView: {
        screen: ListDeckView,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <MaterialIcons name='list' size={26} color={tintColor} />
        }
    },
    AddDeckView: {
        screen: AddDeckView,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({ tintColor }) => <MaterialIcons name='add-circle-outline' size={26} color={tintColor} />
        }
    }
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {        
        activeTintColor: Platform.OS === 'ios' ? green : white,
        style: {            
            height: 50,
            backgroundColor: Platform.OS === 'ios' ? white : green,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }        
    }
})

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs
    },
    DeckView: {
        screen: DeckView,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: green
            }
        }
    },
    AddCardView: {
        screen: AddCardView,
        navigationOptions: {
            title: 'Add Card',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: green
            }
        }
    },
    QuizView: {
        screen: QuizView,
        navigationOptions: {
            title: 'Quiz',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: green
            }
        }
    }
})

export default class App extends React.Component {

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{ flex: 1}}>
                    <CustomStatusBar backgroundColor={green} barStyle='light-content' />
                    <MainNavigator />
                </View>
            </Provider>
        )
    }
}
