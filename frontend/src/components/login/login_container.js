import { connect } from 'react-redux';
import { loginUser } from "../../util/session_api_util";
import Login from './login';

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.errors.session,
        currentUser: state.session.currentUser
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    login: user => dispatch(loginUser(user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);