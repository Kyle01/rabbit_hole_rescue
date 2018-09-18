import { connect } from "react-redux";
import { registerUser } from "../../util/session_api_util";
import SignUp from "./sign_up";

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.errors.session,
        currentUser: state.session.email
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    registerUser: user => dispatch(registerUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
