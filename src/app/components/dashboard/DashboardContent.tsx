"use client";
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ['TESTE 1', 'TESTE 2', 'TESTE 3'],
    datasets: [
      {
        label: 'Vendas',
        data: [300, 500, 200],
        backgroundColor: ['#3B82F6', '#F59E0B', '#6B7280'],
        borderColor: ['#1F2937'],
        borderWidth: 5,
        cutout: '70%',
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
    <div className="w-full h-full p-4 flex items-center justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
};

function DashboardContent() {
  return (
    <div className="flex flex-col gap-6 w-full p-6">
      {/* Cabeçalho com filtros */}
      <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg bg-gray-800 shadow-md">
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



      {/* Seção principal de Cards e Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">


        {/* Cards de Vendas e Contas */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1 flex flex-col gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Quantidade de vendas</p>
              <h2 className="text-3xl font-bold text-white mt-1">18</h2>
            </div>
            <span className="text-green-500 text-2xl font-bold">↑</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Valor das vendas</p>
              <h2 className="text-3xl font-bold text-white mt-1">R$ 1.024,00</h2>
            </div>
            <span className="text-blue-500 text-2xl font-bold">$</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Vendas canceladas</p>
              <h2 className="text-3xl font-bold text-white mt-1">R$ 330,00</h2>
            </div>
            <span className="text-red-500 font-bold">🚫</span>
          </div>
          {/* Card de Contas de entrada/saída */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Contas de entrada</p>
              <h2 className="text-3xl font-bold text-white mt-1">R$ 10.000,00</h2>
            </div>
            <span className="text-green-500 text-2xl font-bold">↑</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Contas de saída</p>
              <h2 className="text-3xl font-bold text-white mt-1">R$ 100,00</h2>
            </div>
            <span className="text-red-500 text-2xl font-bold">↓</span>
          </div>
        </div>

        {/* Gráfico de Vendas por Produtos */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-gray-800 p-3 rounded-lg shadow-md flex flex-col justify-between">
          <h2 className="text-lg md:text-xl font-bold text-white text-center">Vendas por produtos</h2>
          <div className="w-full flex-grow flex items-center justify-center">
            <div className="w-full max-w-[300px] h-fit">
              <DoughnutChart />
            </div>
          </div>
          <div className="mb-4 text-sm text-gray-400 flex flex-col items-start gap-2 w-full">
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
          </div>

          {/* Novo Card: Últimas vendas */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gray-800 rounded-lg shadow-md flex flex-col">
            <h2 className="text-lg md:text-xl font-bold text-white mb-4">Últimas Vendas</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-gray-400">
                <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">Produto</th>
                    <th scope="col" className="px-6 py-3">Valor</th>
                    <th scope="col" className="px-6 py-3">Data</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
                    <td className="px-6 py-4">TESTE 1</td>
                    <td className="px-6 py-4">R$ 300,00</td>
                    <td className="px-6 py-4">25/08/2024</td>
                    <td className="px-6 py-4 text-green-400">Concluído</td>
                  </tr>
                  <tr className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
                    <td className="px-6 py-4">TESTE 2</td>
                    <td className="px-6 py-4">R$ 500,00</td>
                    <td className="px-6 py-4">24/08/2024</td>
                    <td className="px-6 py-4 text-green-400">Concluído</td>
                  </tr>
                  <tr className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
                    <td className="px-6 py-4">TESTE 3</td>
                    <td className="px-6 py-4">R$ 200,00</td>
                    <td className="px-6 py-4">23/08/2024</td>
                    <td className="px-6 py-4 text-red-400">Cancelado</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardContent;