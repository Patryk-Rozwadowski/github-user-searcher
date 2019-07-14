class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: null,
            users: []
        }
    }

    onChangeText(event) {
        this.setState({
            searchText: event.target.value
        })
    }

    onSubmit(e) {
        event.preventDefault();
        const url = `https://api.github.com/search/users?q=${this.state.searchText}`
        fetch(url)
            .then(response => response.json())
            .then(responseJson => this.setState({ users: responseJson.items }))

    }

    render() {
        return (
            <div className="searcher-container">
                <form onSubmit={event => this.onSubmit(event)}>
                    <input
                        type="text"
                        id="searchText"
                        value={this.state.searchText || ''}
                        placeholder="Search username"
                        onChange={e => this.onChangeText(e)} />
                </form>
                <UsersList users={this.state.users} />
            </div>
        )
    }
}

class UsersList extends React.Component {
    get users() {
        return this.props.users.map(user => <User key={user.id} user={user} />)
    }

    render() {
        return (
            <div>
                {this.users}
            </div>
        )
    }
}

class User extends React.Component {
    render() {
        return (
            <div>
                <img src={this.props.user.avatar_url} />
                <a href={this.props.user.url}>{this.props.user.login}</a>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);