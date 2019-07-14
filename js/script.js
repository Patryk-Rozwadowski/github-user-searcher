class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: null,
        }
    }

    onChangeText(e) {
        this.setState({
            searchText: event.target.value
        })
    }
    
    render() {
        return (
            <div className="searcher-container">
                <form>
                    <input
                        type="text"
                        id="searchText"
                        value={this.state.searchText || ''}
                        placeholder="Search username"
                        onChange={e => this.onChangeText(e)} />
                </form>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);