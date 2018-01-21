import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const UserRoute = ({isAuthenticated, component: Component, ...rest}) =>(
    <Route className="" {...rest} render={props =>
        isAuthenticated ? <Component {...props}/> : <Redirect to="/"/>} />

);

UserRoute.propTypes={
    component: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.email
    }
}
export default connect(mapStateToProps,null)(UserRoute);
