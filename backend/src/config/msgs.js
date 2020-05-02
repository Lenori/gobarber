export default {
    session: {
        create: {
            error: {
                err_request_format_invalid: 'Formato da requisição inválido.',
                err_email_not_found: 'E-mail não encontrado.',
                err_password_invalid: 'Senha incorreta.'
            },
            success: 'Login efetuado com sucesso.'
        }
    },
    auth: {
        error: {
            err_token_not_sent: 'Token não enviado.',
            err_token_invalid: 'Token inválido.'
        }
    },
    file: {
        create: {
            error: {

            },
            success: 'Arquivo salvo com sucesso.'
        }
    },
    user: {
        create: {
            error: {
                err_request_format_invalid: 'Formato da requisição inválido.',
                err_email_already_used: 'E-mail já cadastrado.'
            },
            success: 'Usuário criado com sucesso.'
        },
        update: {
            error: {
                err_request_format_invalid: 'Formato da requisição inválido.',
                err_email_already_used: 'E-mail já cadastrado.',
                err_password_invalid: 'Senha incorreta.'
            },
            success: 'Dados alterados com sucesso.'
        }
    },
    appointment: {
        create: {
            error: {
                err_request_format_invalid: 'Formato da requisição inválido.',
                err_user_same_as_provider: 'Usuário e prestador não podem possuir a mesma ID.',
                err_user_not_found: 'Prestador informado não encontrado.',
                err_user_not_provider: 'Usuário informado não é um prestador de serviços.',
                err_date_past: 'É necessário selecionar uma data futura.',
                err_date_not_available: 'Dia e horário não disponíveis para este prestador.'
            },
            success: 'Agendamento criado com sucesso.'
        },
        index: {
            error: {
                err_request_format_invalid: 'Formato da requisição inválido.',
            }
        },
        delete: {
            error: {
                err_appointment_not_found: 'Agendamento não encontrado.',
                err_appintment_already_cancelled: 'Este agendamento já foi cancelado.',
                err_user_not_owner: 'Usuário não autorizado a editar agendamento.',
                err_appointment_too_soon: 'Agendamento muito próximo para ser cancelado.'
            },
            success: 'Agendamento cancelado com sucesso.'
        }
    },
    schedule: {
        index: {
            error: {
                err_user_not_provider: 'Usuário não é um prestador de serviços.',
            }
        }
    },
    notification: {
        index: {
            error: {
                err_user_not_provider: 'Usuário não é um prestador de serviços.',
            }
        },
        update: {
            error: {
                err_user_not_provider: 'Usuário não é um prestador de serviços.',
                err_notification_not_found: 'Nofificação inexistente.'
            },
            success: 'Notificação lida com sucesso.'
        }
    }
            
}