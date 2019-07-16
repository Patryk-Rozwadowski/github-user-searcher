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
        if (this.state.searchText.length > 2) {
            this.onSubmit();
        }
    }

    onSubmit() {
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
                <UsersList users={this.state.users}/>
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
            <div className="users-container">
                {this.users}
            </div>
        )
    }
}

class User extends React.Component {
    render() {
        return (
            <div className="user-container">
                <a href={this.props.user.html_url} target="_blank"><img src={this.props.user.avatar_url} /></a>
                <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
                <p>Account type: {this.props.user.type}</p>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);