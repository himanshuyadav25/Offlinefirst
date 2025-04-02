import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AddBusinessScreen from '../Screens/AddBusinessScreen';
import AddArticleScreen from '../Screens/AddArticleScreen';
import HomeScreen from '../Screens/HomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BusinessScreen" component={AddBusinessScreen} />
      <Stack.Screen name="ArticlesScreen" component={AddArticleScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
