import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

function App() {
	return (
		<>
			<Switch>
				<Route path='/login'>
					<Login />
				</Route>
				<Route path='/signup'></Route>
				<Route path='/'>
					<Home />
				</Route>
			</Switch>
		</>
	);
}

export default App;
