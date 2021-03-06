'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {
            searchText: '',
            users: [],
            placeholder: 'Search username!'
        };
        return _this;
    }

    _createClass(App, [{
        key: 'onChangeText',
        value: function onChangeText(event) {
            this.setState({
                searchText: event.target.value
            });
            if (this.state.searchText.length > 3) {
                this.onSubmit();
            }
        }
    }, {
        key: 'onClick',
        value: function onClick() {
            this.setState({
                placeholder: ''
            });
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit() {
            var _this2 = this;

            event.preventDefault();
            var url = 'https://api.github.com/search/users?q=' + this.state.searchText;
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (responseJson) {
                return _this2.setState({ users: responseJson.items });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'div',
                { className: 'searcher-container' },
                React.createElement(
                    'label',
                    { className: 'searcher-element', 'for': 'searchText' },
                    'Find users on github!'
                ),
                React.createElement(
                    'form',
                    { onSubmit: function onSubmit(event) {
                            return _this3.onSubmit(event);
                        } },
                    React.createElement('input', {
                        type: 'text',
                        id: 'searchText',
                        value: this.state.searchText || '',
                        placeholder: this.state.placeholder,
                        className: 'searcher-element',
                        onClick: function onClick() {
                            return _this3.onClick();
                        },
                        onChange: function onChange(e) {
                            return _this3.onChangeText(e);
                        } })
                ),
                React.createElement(UsersList, { users: this.state.users })
            );
        }
    }]);

    return App;
}(React.Component);

var UsersList = function (_React$Component2) {
    _inherits(UsersList, _React$Component2);

    function UsersList() {
        _classCallCheck(this, UsersList);

        return _possibleConstructorReturn(this, (UsersList.__proto__ || Object.getPrototypeOf(UsersList)).apply(this, arguments));
    }

    _createClass(UsersList, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'users-container' },
                this.users
            );
        }
    }, {
        key: 'users',
        get: function get() {
            if (typeof this.props.users !== 'undefined') return this.props.users.map(function (user) {
                return React.createElement(User, { key: user.id, user: user });
            });else if (typeof this.props.users == 'undefined') return React.createElement(UserNotFound, null);
        }
    }]);

    return UsersList;
}(React.Component);

var User = function (_React$Component3) {
    _inherits(User, _React$Component3);

    function User() {
        _classCallCheck(this, User);

        return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
    }

    _createClass(User, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'user-container' },
                React.createElement(
                    'a',
                    { href: this.props.user.html_url, target: '_blank' },
                    React.createElement('img', { src: this.props.user.avatar_url })
                ),
                React.createElement(
                    'a',
                    { href: this.props.user.html_url, target: '_blank' },
                    this.props.user.login
                ),
                React.createElement(
                    'p',
                    null,
                    'Account type: ',
                    this.props.user.type
                )
            );
        }
    }]);

    return User;
}(React.Component);

var UserNotFound = function (_React$Component4) {
    _inherits(UserNotFound, _React$Component4);

    function UserNotFound() {
        _classCallCheck(this, UserNotFound);

        return _possibleConstructorReturn(this, (UserNotFound.__proto__ || Object.getPrototypeOf(UserNotFound)).apply(this, arguments));
    }

    _createClass(UserNotFound, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'user-container-notFound' },
                React.createElement(
                    'p',
                    null,
                    'User not found!'
                )
            );
        }
    }]);

    return UserNotFound;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
