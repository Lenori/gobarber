import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {toast} from 'react-toastify';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

class Signup extends Component {

    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            password: ''
        };        

        this.schema = Yup.object().shape({
            name: Yup.string().min(1, 'Preencha seu nome completo.').required(),
            email: Yup.string().min(1, 'Preencha seu e-mail.').email('Insira um e-mail válido').required(),
            password: Yup.string().min(4, 'Sua senha deve conter ao menos 4 caracteres.').required()
        });

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();

        try {            
            await this.schema.validate(this.state);
            toast.success('Cadastro efetuado com sucesso.');
        } catch(err) {
            console.tron.log(err);
            err.errors.map(error => toast.error(error));
        }
    }

    render() {
        return(
            <>
                <img src={logo} alt="GoBarber"/>

                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.name} onChange={e => this.setState({name: e.target.value})} placeholder="Nome completo" />
                    <input type="text" value={this.state.email} onChange={e => this.setState({email: e.target.value})} placeholder="E-mail" />
                    <input type="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} placeholder="Sua senha" />

                    <button type="submit">Criar conta</button>
                    <Link to="/">Já tenho uma conta</Link>
                </form>
            </>
        )
    }
}

export default Signup;