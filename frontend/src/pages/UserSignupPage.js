import React from "react";

export class UserSignupPage extends React.Component {

    state = {
        displayName: '',
        username: '',
        password: '',
        passwordRepeat: ''
    }

    onChangeDisplayName = (event) => {
        const value = event.target.value;
        this.setState({ displayName: value });
    }

    onChangeUsername = (event) => {
        const value = event.target.value;
        this.setState({ username: value });
    }

    onChangePassword = (event) => {
        const value = event.target.value;
        this.setState({ password: value });
    }

    onChangePasswordRepeat = (event) => {
        const value = event.target.value;
        this.setState({ passwordRepeat: value });
    }

    onClickSignup = () => {
        const user = {
            username: this.state.username,
            displayName: this.state.displayName,
            password: this.state.password
        }
        this.props.actions.postSignup(user);
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center">Sign up</h1>
                <label>Display name</label>
                <div className="col-12 mb-3">
                    <input
                        className="form-control"
                        placeholder="Your display name"
                        value={this.state.displayName}
                        onChange={this.onChangeDisplayName} />
                </div>
                <label>Username</label>
                <div className="col-12 mb-3">
                    <input
                        className="form-control"
                        placeholder="Your username"
                        value={this.state.username}
                        onChange={this.onChangeUsername} />
                </div>
                <label>Password</label>
                <div className="col-12 mb-3">
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Your password"
                        value={this.state.password}
                        onChange={this.onChangePassword} />
                </div>
                <label>Repeat password</label>
                <div className="col-12 mb-3">
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Repeat your password"
                        value={this.state.passwordRepeat}
                        onChange={this.onChangePasswordRepeat} />
                </div>
                <div className="text-center">
                    <button className="btn btn-primary"
                        onClick={this.onClickSignup}>
                        Sign up
                    </button>
                </div>
            </div>
        )
    }
}

UserSignupPage.defaultProps = {
    actions: {
        postSignup: () => new Promise((resolve, reject) => {
            resolve({})
        })
    }
}
export default UserSignupPage;