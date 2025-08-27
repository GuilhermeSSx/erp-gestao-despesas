import TableCentroDeCustos from '@/app/components/ui/table/CentroDeCustos';
import CadastrarCentroCusto from './cadastrarCentroCusto';
import { getCentroCustos } from '@/app/lib/cadastrosActions';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gestão - Centro De Custo',
};

export default async function CentroDeCusto() {
    const dataCentroCusto = await getCentroCustos();
    const centro_custo = dataCentroCusto.centro_custo;

    return (
        <div className="w-screen md-web:min-h-[calc(100dvh-60px)] h-[calc(100dvh-60px)] flex flex-col justify-center items-center ">
            <CadastrarCentroCusto>
                <TableCentroDeCustos centroCustos={centro_custo} />
            </CadastrarCentroCusto>

        </div>
    )
}
