import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Wrapper} from './styles';

class DefaultLayout extends Component {
    render() {
        return(
            <Wrapper>{this.props.children}</Wrapper>
        )
    }
}

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired
}

export default DefaultLayout;