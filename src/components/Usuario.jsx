import React, { useEffect, useState } from 'react';
import '../App.css';

function Usuario() {
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        const formDataJSON = localStorage.getItem('formData');
        const formDataObj  = JSON.parse(formDataJSON);
        setFormData(formDataObj);
    }, []);

    return (
        <div className = 'divUsuario'>
            {formData && (
                <div className = 'container-home'>
                     <div className = 'container-dadosp'>
                        <h1>Usuário</h1>
                        <p>{formData.nome}</p>
                        <p>{formData.dataNascimento}</p>
                        <p>{formData.email}</p>
                        <p>{formData.telefone}</p>
                    </div>
                  <div className='container-endereço'>
                        <div className='tituloEndereço'>
                            <h3>Informações de endereço:</h3>
                        </div>
                        <div className='dadosEndereço'>
                            <div className='coluna'>
                                <ul>
                                    <li>Logradouro:</li>
                                    <li>N° da residência:</li>
                                    <li>Bairro:</li>
                                    <li>Cidade:</li>
                                </ul>
                            </div>
                            <div className='coluna'>
                                <ul>
                                    <li>{formData.logradouro}</li>
                                    <li>{formData.nResidencia}</li>
                                    <li>{formData.bairro}</li>
                                    <li>{formData.cidade}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Usuario;