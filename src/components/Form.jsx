import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Form() {
    const [formState, setFormState] = useState({
        nome: "",
        email: "",
        telefone: "",
        dataNascimento: "",
        CEP: "",
        logradouro: "",
        nResidencia: "",
        bairro: "",
        cidade: "",
    });

    const enviarForm = (event, key) => {
        setFormState({ ...formState, [key]: event.target.value });
    };


    // função para formatar a data enquanto o usuário digita
    const formatarData = (value) => {
        const cleaned = ('' + value).replace(/\D/g, '');
        
        const match = cleaned.match(/^(\d{2})(\d{2})(\d{4})$/);
        if (match) {
            return match[1] + '/' + match[2] + '/' + match[3];
        }
        return value;
    };

    const handleInputChange = (event, key) => {
        const formattedValue = formatarData(event.target.value);
        setFormState({ ...formState, [key]: formattedValue });
    };

    
    const navigate = useNavigate();
    const mostrarForm = (event) => {
        event.preventDefault();
        const formDataJSON = JSON.stringify(formState);
        localStorage.setItem('formData', formDataJSON);
        navigate('/home');
        console.log(formState);
    };

    
    // Função com API para verificar o CEP e preencher automaticamente o endereço
    const checkCEP = (event) => {
        const cep = event.target.value.replace(/\D/g, '');
        if (cep.length === 8 && !isNaN(cep)) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(res => res.json())
                .then(data => {
                    if (data.cep) {
                        setFormState({
                            ...formState,
                            CEP       : data.cep,
                            logradouro: data.logradouro,
                            bairro    : data.bairro,
                            cidade    : data.localidade
                        });
                    }
                });
        }
    };

    return (
        <div className='fundo-page'>
            <div className= 'form-box'>
        <form className='form' onSubmit={mostrarForm}>
            <div className='titulo-form'>
            <h1>Cadastro</h1>
            </div>

            <input 
            type="text" 
            placeholder = "Nome completo" 
            name='completo'
            required
            minLength={3}
            pattern="^([A-Za-z]+ [A-Za-z]+)|([A-Za-z]+)$"
            value={formState.nome}
            onChange={(event) => enviarForm(event, 'nome')}
            />

            <input 
            type="email" 
            placeholder = "E-mail"
            name='completo'
            value={formState.email}
            required
            minLength={9}
            onChange={(event) => enviarForm(event, 'email')}
            />
            
            <input 
            type="tel" 
            placeholder = "Telefone" 
            name='cortado'
            required
            minLength={10}
            maxLength={11}
            value={formState.telefone}
            onChange={(event) => enviarForm(event, 'telefone')}
            />
            
            <input 
            type="text" 
            placeholder = "Nascimento" 
            name='cortado'
            minLength={8}
            maxLength={11}
            required
            value={formState.dataNascimento}
            onChange={(event) => handleInputChange(event, 'dataNascimento')}
            />

            <div class="endereco-container">
                <p>Endereço</p>
            </div>

            <input 
            type="text" 
            placeholder = "CEP" 
            name='completo'
            minLength={8}
            maxLength={8}
            required
            value={formState.CEP}
            onBlur={checkCEP}
            onChange={(event) => enviarForm(event, 'CEP')}
            />

            <input 
            type="text" 
            placeholder = "Logradouro" 
            name='cortado'
            required
            minLength={3}
            value={formState.logradouro}
            onChange={(event) => enviarForm(event, 'logradouro')}
            />

            <input 
            type="text" 
            placeholder = "N° da residência" 
            name='cortado'
            required
            minLength={2}
            pattern="[0-9]*"
            value={formState.nResidencia}
            onChange={(event) => enviarForm(event, 'nResidencia')}
            />

            <input 
            type="text"
            placeholder = "Bairro" 
            name='cortado'
            required
            minLength={3}
            value={formState.bairro}
            onChange={(event) => enviarForm(event, 'bairro')}
            />

            <input 
            type="text" 
            placeholder = "Cidade" 
            name='cortado'
            required
            minLength={3}
            value={formState.cidade}
            onChange={(event) => enviarForm(event, 'cidade')}
            />

            <button
            type='submit'>
            Concluir
            </button>
        </form>
        </div>
    </div>
    )
}

export default Form;