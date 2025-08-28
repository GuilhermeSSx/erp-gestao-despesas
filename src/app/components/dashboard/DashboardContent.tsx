"use client";
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
    const data = {
        labels: ['TESTE 1', 'TESTE 2', 'TESTE 3', 'TESTE 4', 'TESTE 5', 'TESTE 6'],
        datasets: [
            {
                label: 'Vendas',
                data: [300, 500, 200, 100, 154, 3453],
                backgroundColor: ['#3B82F6', '#F59E0B', '#6B7280', '#10B981', '#EF4444', '#8B5CF6'],
                borderColor: ['#000000'],
                borderWidth: 3,
                cutout: '60%',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <Doughnut data={data} options={options} />
        </div>
    );
};

function DashboardContent() {
    return (
        <div className="flex flex-col gap-4 w-full h-full">
            {/* Cabeçalho com filtros, que fica fixo */}
            <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg bg-gray-600 shadow-md flex-shrink-0">
                <h1 className="text-lg md:text-xl font-bold text-white whitespace-nowrap">Filtro de Vendas</h1>
                <div className="flex flex-col sm:flex-row items-center gap-4 ml-auto w-full md:w-auto">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <span className="text-gray-300 whitespace-nowrap">Data inicial</span>
                        <input type="date" className="p-2 rounded-md bg-gray-700 text-white w-full" defaultValue="2024-08-01" />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <span className="text-gray-300 whitespace-nowrap">Data final</span>
                        <input type="date" className="p-2 rounded-md bg-gray-700 text-white w-full" defaultValue="2024-08-31" />
                    </div>
                    <button className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-md w-full sm:w-auto" aria-label="Filtrar dados">
                        Filtrar
                    </button>
                </div>
            </div>

            {/* Container que agrupa os cards de gráfico e tabela */}
            <div className="flex flex-col lg:flex-row gap-4 flex-1 overflow-y-auto">
                {/* Gráfico de Vendas por Produtos */}
                <div className="bg-gray-600 p-3 rounded-lg shadow-md flex flex-col justify-between lg:w-1/2 overflow-y-auto">
                    <h2 className="text-lg md:text-xl font-bold text-white text-center">Vendas por produtos</h2>
                    <div className="w-full flex-grow flex items-center justify-center md:min-h-[150px] h-full p-2">
                        <div className="w-full h-full max-w-[400px]">
                            <DoughnutChart />
                        </div>
                    </div>
                    <div className="text-sm text-gray-400 flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                            TESTE 1
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                            TESTE 2
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-gray-600 rounded-full"></span>
                            TESTE 3
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-[#10B981] rounded-full"></span>
                            TESTE 4
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-[#EF4444] rounded-full"></span>
                            TESTE 5
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-[#8B5CF6] rounded-full"></span>
                            TESTE 6
                        </div>
                    </div>
                </div>

                {/* Card da Tabela: Últimas vendas */}
                {/* Removi o overflow-y-auto deste container */}
                <div className="bg-gray-600 p-3 rounded-lg shadow-md flex flex-col lg:w-1/2">
                    <h2 className="text-lg md:text-xl font-bold text-white mb-4">Últimas Vendas</h2>
                    {/* Apenas este div, que envolve a tabela, agora tem rolagem */}
                    <div className="overflow-x-auto overflow-y-auto flex-1">
                        <table className="min-w-full text-left text-sm text-gray-400">
                            <thead className="sticky top-0 bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Produto</th>
                                    <th scope="col" className="px-6 py-3">Valor</th>
                                    <th scope="col" className="px-6 py-3">Data</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-600 border-b border-gray-700 hover:bg-gray-700">
                                    <td className="px-6 py-4">TESTE 1</td>
                                    <td className="px-6 py-4">R$ 300,00</td>
                                    <td className="px-6 py-4">25/08/2024</td>
                                    <td className="px-6 py-4 text-green-400">Concluído</td>
                                </tr>
                                <tr className="bg-gray-600 border-b border-gray-700 hover:bg-gray-700">
                                    <td className="px-6 py-4">TESTE 2</td>
                                    <td className="px-6 py-4">R$ 500,00</td>
                                    <td className="px-6 py-4">24/08/2024</td>
                                    <td className="px-6 py-4 text-green-400">Concluído</td>
                                </tr>
                                <tr className="bg-gray-600 border-b border-gray-700 hover:bg-gray-700">
                                    <td className="px-6 py-4">TESTE 3</td>
                                    <td className="px-6 py-4">R$ 200,00</td>
                                    <td className="px-6 py-4">23/08/2024</td>
                                    <td className="px-6 py-4 text-red-400">Cancelado</td>
                                </tr>
                                <tr className="bg-gray-600 border-b border-gray-700 hover:bg-gray-700">
                                    <td className="px-6 py-4">TESTE 4</td>
                                    <td className="px-6 py-4">R$ 100,00</td>
                                    <td className="px-6 py-4">23/08/2024</td>
                                    <td className="px-6 py-4 text-red-400">Cancelado</td>
                                </tr>
                                <tr className="bg-gray-600 border-b border-gray-700 hover:bg-gray-700">
                                    <td className="px-6 py-4">TESTE 5</td>
                                    <td className="px-6 py-4">R$ 154,00</td>
                                    <td className="px-6 py-4">23/08/2024</td>
                                    <td className="px-6 py-4 text-green-400">Concluído</td>
                                </tr>
                                <tr className="bg-gray-600 border-b border-gray-700 hover:bg-gray-700">
                                    <td className="px-6 py-4">TESTE 6</td>
                                    <td className="px-6 py-4">R$ 3453,00</td>
                                    <td className="px-6 py-4">23/08/2024</td>
                                    <td className="px-6 py-4 text-green-400">Concluído</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardContent;