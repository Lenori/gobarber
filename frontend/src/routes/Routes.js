import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthLayout from '../pages/@layouts/auth';
import DefaultLayout from '../pages/@layouts/default';

export default function MyRoutes({
    component: Component,
    isPrivate,
    ...rest
}) {
    const signed = false;

    if (!signed && isPrivate) {
        return <Redirect to='/' />;
    }

    if (signed && !isPrivate) {
        return <Redirect to='/dashboard' />;
    }

    const Layout = signed ? DefaultLayout : AuthLayout;

    return <Route {...rest} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )} />
}

MyRoutes.propTypes = {
    isPrivate: PropTypes.bool,
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}

MyRoutes.defaultProps = {
    isPrivate: false
}