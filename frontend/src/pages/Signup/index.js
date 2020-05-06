import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import logo from '../../assets/logo.svg';

class Signup extends Component {
    render() {
        return(
            <>
                <img src={logo} alt="GoBarber"/>

                <form>
                    <input type="text" placeholder="Nome completo" />
                    <input type="email" placeholder="E-mail" />
                    <input type="password" placeholder="Sua senha" />

                    <button type="submit">Criar conta</button>
                    <Link to="/">Já tenho uma conta</Link>
                </form>
            </>
        )
    }
}

export default Signup;