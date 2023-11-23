import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const excluirPerfilAcesso = async (id_perfil_acesso: number, ) => {

    try {
        
        const response = await fetch('https://jpnr-gestao-sqlserver.vercel.app/user/excluir-perfil-acesso', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_perfil_acesso }),

            
        });
        
        
        if (response.ok) {

            
            toast.success('Perfil de acesso ID: ' + id_perfil_acesso + ' deletado com sucesso!', {
                position: "bottom-left",
                autoClose: 3800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            
        } else {
            toast.error('Erro ao deletar o perfil de acesso!', {
                position: "bottom-left",
                autoClose: 3800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            // Handle error if necessary
        }

    } catch (error) {
        console.error('Erro:', error);
        toast.error('Erro ao deletar o perfil de acesso!', {
            position: "bottom-left",
            autoClose: 4200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        // Handle error if necessary
    }

};

export const carregarSelecaoPerfilAcesso = async () => {

    try {
        const response = await fetch('https://jpnr-gestao-sqlserver.vercel.app/user/get-perfil-acessos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();

            // console.log(data);
            return data.perfil_acessos;

        }

    } catch (error) {
        console.error('Erro:', error);
    }
};

