import 'react-native-gesture-handler';
import * as React from "react";

import Home from "./pages/Home";
import ViewBookings from "./pages/ViewBookings";
import AddBookings from "./pages/AddBookings";
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
								component={Home}
								options={{ title: "Home" }}
							/>
							<Screen
								name="ViewBookings"
								component={ViewBookings}
								options={{ title: "Bookings" }}
							/>
							<Screen
								name="AddBookings"
								component={AddBookings}
								options={{ title: "Add a Booking" }}
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
