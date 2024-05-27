import TableSaida from '@/app/components/tableSaidas';
import CadastrarClassSaida from './cadastrarClassSaida';
import { getClassSaida } from '@/app/lib/cadastrosActions';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Classificação de Saidas',
};

export default async function Saidas() {

    const dataClassSaida = await getClassSaida();
    const class_saida = dataClassSaida.class_saida;

    return (
        <div className="w-screen md-web:min-h-[calc(100dvh-60px)] h-[calc(100dvh-60px)] flex flex-col justify-center items-center">

            <CadastrarClassSaida>
                <div className='w-full h-full flex p-1'>
                    <TableSaida saidas={class_saida} />
                </div>
            </CadastrarClassSaida>

        </div>
    );
}
