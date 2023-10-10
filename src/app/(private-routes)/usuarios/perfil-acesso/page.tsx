"use client"
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

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
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', marginTop: '20px' }}>
            <Box sx={{ borderBottom: 2, borderColor: 'divider', display: 'flex', width: '100%', justifyContent: 'space-around' }}>

                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Cadastro Perfil de Acesso" {...a11yProps(0)} />
                    <Tab label="Modulos" {...a11yProps(1)} />
                    <Tab label="Funcionalidades" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <PerfilAcesso value={value} index={0}>
                <div className='w-full h-full flex justify-center items-center bg-slate-100 rounded-lg'>
                    <div>
                        <h1 className='text-2xl font-bold'>Tela de Cadastro de Perfil de Acesso</h1>
                    </div>
                </div>

            </PerfilAcesso>
            <PerfilAcesso value={value} index={1}>
                <div className='w-full h-full flex justify-center items-center bg-slate-100 rounded-lg'>
                    <div>
                        <h1 className='text-2xl font-bold'>Acesso aos modulos</h1>
                    </div>
                </div>
            </PerfilAcesso>
            <PerfilAcesso value={value} index={2}>
                <div className='w-full h-full flex justify-center items-center bg-slate-100 rounded-lg'>
                    <div>
                        <h1 className='text-2xl font-bold'>Acesso funcionalidades</h1>
                    </div>
                </div>
            </PerfilAcesso>
        </Box>
    );
}