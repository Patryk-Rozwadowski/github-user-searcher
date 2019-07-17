class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: '',
            users: [],
            placeholder: 'Search username!'
        }
    }

    onChangeText(event) {
        this.setState({
            searchText: event.target.value
        })
        if (this.state.searchText.length > 3) {
            this.onSubmit();
        }
    }
    onClick() {
        this.setState({
            placeholder: ''
        })
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
                <label className="searcher-element" for="searchText">Find users on github!</label>
                <form onSubmit={event => this.onSubmit(event)}>
                    <input
                        type="text"
                        id="searchText"
                        value={this.state.searchText || ''}
                        placeholder={this.state.placeholder}
                        className="searcher-element"
                        onClick={() => this.onClick()}
                        onChange={e => this.onChangeText(e)} />
                </form>
                <UsersList users={this.state.users} />
            </div>
        )
    }
}

class UsersList extends React.Component {
    get users() {
        if (typeof this.props.users !== 'undefined')
            return this.props.users.map(user => <User key={user.id} user={user} />)
        else if (typeof this.props.users == 'undefined') return <UserNotFound />
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

class UserNotFound extends React.Component {
    render() {
        return (
            <div className="user-container-notFound">
                <p>User not found!</p>
            </div>
        )
    }
}



ReactDOM.render(
    <App />,
    document.getElementById('root')
);