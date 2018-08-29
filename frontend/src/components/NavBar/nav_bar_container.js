import { connect } from "react-redux";
import { logoutUser } from "../../util/session_api_util";
import NavbarFeatures from "./nav_bar";

const mapStateToProps = ({ session }) => {
    return {
        currentUser: session.email
    };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavbarFeatures);
