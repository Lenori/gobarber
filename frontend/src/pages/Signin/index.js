import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import logo from '../../assets/logo.svg';

class Signin extends Component {
    render() {
        return(
            <>
                <img src={logo} alt="GoBarber"/>

                <form>
                    <input type="email" placeholder="E-mail" />
                    <input type="password" placeholder="Sua senha" />

                    <button type="submit">Acessar</button>
                    <Link to="/register">Criar uma conta</Link>
                </form>
            </>
        )
    }
}

export default Signin;