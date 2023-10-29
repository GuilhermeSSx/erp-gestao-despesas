"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import TableFuncionalidades from '@/app/components/tableFuncionalidades';
import TableModulos from '@/app/components/tableModulos';
import { motion } from 'framer-motion';
import CriarSelecionarPerfilAcesso from '@/app/components/criarSelecionarPerfilAcesso';

interface Modulo {
    id_modulo: number;
    nome_modulo: string;
    acesso: string;
}

interface Funcionalidade {
    id_funcionalidade: number;
    nome_funcionalidade: string;
    acesso: string;
}

export default function BasicTabs() {
    const usuarioParams = useSearchParams();
    const id_perfil_acesso = usuarioParams.get('id');

    const [value, setValue] = useState(0);
    const [selectedModulo, setSelectedModulo] = useState<Modulo | null>(null);
    const [selectedFuncionalidade, setSelectedFuncionalidade] = useState<Funcionalidade | null>();

    // Adicione um estado para controlar se a solicitação já foi feita
    const [acessoDataFetched, setAcessoDataFetched] = useState(false);

    const handleModuloSelected = (modulos: Modulo[]) => {
        setSelectedModulo(modulos[0]);
        setModulosAcessoData(modulos); // Atualize o estado modulosAcessoData com os módulos selecionados
        setValue(1);
    };

    const handleFuncionalidadeSelected = (funcionalidade: Funcionalidade[]) => {
        setSelectedFuncionalidade(funcionalidade[0]);
        setFuncionalidadesAcessoData(funcionalidade);
        setValue(2);
    };

    const buttonVariants = {
        initial: { borderBottom: '2px solid transparent' },
        animate: { borderBottom: '2px solid blue' },
    };

    const [modulosAcessoData, setModulosAcessoData] = useState<Modulo[]>([]);
    const [funcionalidadesAcessoData, setFuncionalidadesAcessoData] = useState<Funcionalidade[]>([]);

    const getAcessos = async () => {
        try {
            const response = await fetch('https://jpnr-gestao-sqlserver.vercel.app/user/get-perfil-acesso', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_perfil_acesso: id_perfil_acesso })
            });

            if (response.ok) {
                const data = await response.json();
                setModulosAcessoData(data.modulos_acessos);
                setFuncionalidadesAcessoData(data.funcionalidades_acessos);
            } else {
                throw new Error('Erro em carregar o perfil de acesso!');
            }
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            // Marque que a solicitação foi feita
            setAcessoDataFetched(true);
        }
    };

    useEffect(() => {
        getAcessos();
    }, [value]);

    return (
        <div className="w-full mt-4">
            <div className="border-b border-gray-300 flex w-full justify-center box-content md-web:text-sm text-[10px] font-extrabold select-none">
                <motion.button
                    onClick={() => setValue(0)}
                    className={`tab-button p-4 hover-bg-slate-100 ${value === 0 ? 'active' : ''}`}
                    initial="initial"
                    animate={value === 0 ? "animate" : "initial"}
                    variants={buttonVariants}
                    transition={{ duration: 0.2 }}
                >
                    PERFIL DE ACESSO
                </motion.button>
                <motion.button
                    onClick={() => setValue(1)}
                    className={`tab-button p-4 hover-bg-slate-100 ${value === 1 ? 'active' : ''}`}
                    initial="initial"
                    animate={value === 1 ? "animate" : "initial"}
                    variants={buttonVariants}
                    transition={{ duration: 0.2 }}
                >
                    MODULOS
                </motion.button>
                <motion.button
                    onClick={() => setValue(2)}
                    className={`tab-button p-4 hover-bg-slate-100 ${value === 2 ? 'active' : ''}`}
                    initial="initial"
                    animate={value === 2 ? "animate" : "initial"}
                    variants={buttonVariants}
                    transition={{ duration: 0.2 }}
                >
                    FUNCIONALIDADES
                </motion.button>
            </div>
            {value === 0 && (
                <div className="fixed w-full h-[calc(100vh-136px)] flex justify-center items-center bg-slate-50 rounded-lg">
                    <CriarSelecionarPerfilAcesso />
                </div>
            )}
            {value === 1 && (
                <div className="fixed w-full h-[calc(100vh-136px)] flex justify-center items-center bg-slate-50 rounded-lg">
                    <div className="w-full h-full md-1190:mx-[22rem] mx-1 py-8">
                        
                        <TableModulos modulos={modulosAcessoData} onModuloSelected={handleModuloSelected} />
                    </div>
                </div>
            )}
            {value === 2 && (
                <div className="fixed w-full h-[calc(100vh-136px)] flex justify-center items-center bg-slate-50 rounded-lg">
                    <div className="w-full h-full md-1190:mx-[22rem] mx-1 py-8">
                        <TableFuncionalidades funcionalidades={funcionalidadesAcessoData} onFuncionalidadeSelected={handleFuncionalidadeSelected} />
                    </div>
                </div>
            )}
        </div>
    );
}
