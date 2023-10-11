"use client"
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableModulos from '@/app/components/tableModulos';
import TableFuncionalidades from '@/app/components/tableFuncionalidades';

import { useSearchParams } from 'next/navigation'


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface Modulo {
    id: number;
    name: string;
}

const modulos: Modulo[] = [
    { id: 1, name: 'Cadastro' },
    { id: 2, name: 'Lançamentos' },
    { id: 3, name: 'Buscar CAR' },
];

interface Funcionalidade {
    id: number;
    name: string;
}

const funcionalidades: Funcionalidade[] = [
    { id: 101, name: 'Entrada' },
    { id: 102, name: 'Despesas' },
    { id: 103, name: 'Grupos' },
    { id: 104, name: 'Centro De Custos' },
    { id: 105, name: 'Favorecidos' },
];

const PerfilAcesso = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography className='flex w-full h-[calc(100vh-130px)] p-8'>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [selectedModulo, setSelectedModulo] = useState<Modulo | null>(null);
    const [selectedFuncionalidade, setSelectedFuncionalidade] = useState<Funcionalidade | null>(null);

    const usuarioParams = useSearchParams();
    const id = usuarioParams.get('id')
    const handleModuloSelected = (modulo: Modulo) => {
        setSelectedModulo(modulo);
    };

    const handleFuncionalidadeSelected = (funcionalidade: Funcionalidade) => {
        setSelectedFuncionalidade(funcionalidade);
    };

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', marginTop: '20px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', width: '100%', justifyContent: 'space-around' }}>

                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Perfil de Acesso" {...a11yProps(0)} />
                    <Tab label="Modulos" {...a11yProps(1)} />
                    <Tab label="Funcionalidades" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <PerfilAcesso value={value} index={0}>
                <div className='w-full h-full flex flex-rol justify-center bg-slate-50 rounded-lg p-28'>
                    <h1 className='text-4xl'>{id}</h1>
                </div>

            </PerfilAcesso>
            <PerfilAcesso value={value} index={1}>
                <div className='w-full h-full flex justify-center items-center bg-white rounded-lg'>
                    <div className='w-full h-full p-2'>

                        <TableModulos modulos={modulos} onModuloSelected={handleModuloSelected} />

                    </div>
                </div>
            </PerfilAcesso>
            <PerfilAcesso value={value} index={2}>
                <div className='w-full h-full flex justify-center items-center bg-white rounded-lg'>
                    <div className='w-full h-full p-2'>
                        <TableFuncionalidades funcionalidades={funcionalidades} onFuncionalidadeSelected={handleFuncionalidadeSelected} />
                    </div>
                </div>
            </PerfilAcesso>
        </Box>
    );
}