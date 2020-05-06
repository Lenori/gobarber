import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Wrapper, Content} from './styles';

class AuthLayout extends Component {
    render() {
        return(
            <Wrapper>
                <Content>
                    {this.props.children}
                </Content>
            </Wrapper>
        )
    }
}

AuthLayout.propTypes = {
    children: PropTypes.element.isRequired
}

export default AuthLayout;