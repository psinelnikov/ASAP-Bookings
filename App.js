// import React from "react";

// import Login from "./pages/Login";
// import Home from "./pages/Home";
// //import AuthScreen from "./pages/AuthScreen";

// import { NavigationContainer } from "@react-navigation/native";
// import { Navigator, Screen } from "@react-navigation/stack";

// // const AppNavigator = createStackNavigator({
// // 	Home: HomeScreen,
// // 	Settings: SettingsScreen,
// // });

// // const RootNavigator = createSwitchNavigator({
// // 	Login: LoginScreen,
// // 	App: AppNavigator,
// // });

// export default function App({ navigation }) {
// 	return (
// 		<NavigationContainer>
// 			<Navigator>
// 				{isLoggedIn ? (
// 					<>
// 						<Screen name="Home" component={Home} />
// 					</>
// 				) : (
// 					<Screen name="SignIn" component={Login} />
// 				)}
// 			</Navigator>
// 		</NavigationContainer>
// 	);
// }

import * as React from "react";

import Home from "./pages/Home";
import { userContext } from "./src/userContext";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import AsyncStorage from "@react-native-community/async-storage";

const { Navigator, Screen } = createStackNavigator();

import AuthService from "./src/services/Auth";
import Login from "./pages/Login";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
		};
	}

	componentDidMount() {
		AuthService.subscribeAuthChange((user) => this.setState({ user }));
	}

	render() {
		return (
			// Pass user state as value to context.Provider so it can be consumed by context.Consumer
			<userContext.Provider value={this.state.user}>
				{this.state.user ? (
					<NavigationContainer>
						<Navigator>
							<Screen
								name="Home"
								options={{ title: "Home" }}
								component={Home}
							/>
						</Navigator>
					</NavigationContainer>
				) : (
					<Login />
				)}
			</userContext.Provider>
		);
	}
}

// export default function App({ navigation }) {
// 	const [user, setUser] = useState({});

// 	const token = AuthService.loginWithFacebook();

// 	AuthService.subscribeAuthChange((user) => setUser(user));

// 	return (
// 		<AuthContext.Provider value={user}>
// 			<Stack.Navigator>
// 				{state.userToken == null ? (
// 					<Stack.Screen name="SignIn" component={SignInScreen} />
// 				) : (
// 					<Stack.Screen name="Home" component={HomeScreen} />
// 				)}
// 			</Stack.Navigator>
// 		</AuthContext.Provider>
// 	);
// }
