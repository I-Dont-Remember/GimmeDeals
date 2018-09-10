import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Result from './result';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Profile from '../routes/profile';

export default class App extends Component {
    // componentDidMount() {
	// 	fetch(`//api.github.com/search/repositories?q=js`),
	// 		json = await res.json(),
	// 		results = json && json.items || [];
	// 	this.setState({ results });
    // }

    componentDidMount() {
        const that = this;
        console.log("did mount")
		fetch(`//api.github.com/search/repositories?q=js`)
			.then( (resp) => resp.json())
	 		.then(function(data) {
                let results = data && data.items || [];
                console.log(results)
				that.setState({ results });
			})
		}
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render({}, { results=[]}) {
		return (
			<div id="app">
				<Header />
				{/* <Router onChange={this.handleRoute}>
					<Home path="/" />
					<Profile path="/profile/" user="me" />
					<Profile path="/profile/:user" />
				</Router> */}
                <div class="list">
					{ results.map( result => (
						<Result result={result} />
					)) }
				</div>
			</div>
		);
	}
}
