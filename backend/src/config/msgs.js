export default {
    session: {
        create: {
            error: {
                err_request_format_invalid: 'Formato da requisição inválido.',
                err_email_not_found: 'E-mail não encontrado.',
                err_password_invalid: 'Senha incorreta.'
            }
        }
    },
    auth: {
        error: {
            err_token_not_sent: 'Token não enviado.',
            err_token_invalid: 'Token inválido.'
        }
    },
    user: {
        create: {
            error: {
                err_request_format_invalid: 'Formato da requisição inválido.',
                err_email_already_used: 'E-mail já cadastrado.'
            }
        },
        update: {
            error: {
                err_request_format_invalid: 'Formato da requisição inválido.',
                err_email_already_used: 'E-mail já cadastrado.',
                err_password_invalid: 'Senha incorreta.'
            },
            success: 'Dados alterados com sucesso.'
        }
    }
}