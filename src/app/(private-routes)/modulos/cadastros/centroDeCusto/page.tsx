import TableCentroDeCustos from '@/app/components/tableCentroDeCustos';
import CadastrarCentroCusto from './cadastrarCentroCusto';
import { getCentroCustos } from '@/app/lib/cadastrosActions';

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
