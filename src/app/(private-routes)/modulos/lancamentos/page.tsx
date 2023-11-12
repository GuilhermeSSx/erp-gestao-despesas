"use client"
import TableLancamentos from '@/app/components/tableLancamentos';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import PopupCriarLancamento from '@/app/components/popupCriarLancamento';
import PopupEditarLancamento from '@/app/components/popupEditarLancamento';
import PopupExcluirLancamento from '@/app/components/popupExcluirLancamento';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';

interface Lancamento {
  lancId: number;
  lancVencimento: string;
  lancData: string;
  lancClassificacao: string;
  lancDescricao: string;
  lancAutorizacao: string;
  lancStatus: string;
  lancFavorecidos: string;
  lancCentroCusto: string;
  lancValor: number;

}

const lancamentos: Lancamento[] = [
  {
    lancId: 1,
    lancData: '01/01/2023',
    lancVencimento: '21/01/2023',
    lancClassificacao: 'CUSTO MATERIAS',
    lancDescricao: '200 Unidades de Materiais',
    lancAutorizacao: 'Sim',
    lancStatus: 'Pago',
    lancFavorecidos: 'FUN- Guilherme',
    lancCentroCusto: 'UFV TAIUVA 1',
    lancValor: 1000
  },
  {
    lancId: 2,
    lancData: '02/02/2023',
    lancVencimento: '22/02/2023',
    lancClassificacao: 'POSTES',
    lancDescricao: '100 Unidades de Postes',
    lancAutorizacao: 'Aguardando',
    lancStatus: 'Em Aberto',
    lancFavorecidos: 'FOR- Matheus',
    lancCentroCusto: 'UFV TAIUVA 2',
    lancValor: 1200
  },
  {
    lancId: 3,
    lancData: '03/03/2023',
    lancVencimento: '23/03/2023',
    lancClassificacao: 'CUSTO 3',
    lancDescricao: 'descrição teste 3',
    lancAutorizacao: 'Não',
    lancStatus: 'Inadimplente',
    lancFavorecidos: 'Funcionario teste 3',
    lancCentroCusto: 'UFV TAIUVA 3',
    lancValor: 1300,
  },

  // Adicione mais lançamentos conforme necessário
];

export default function Lancamentos() {

  const [selectedLancamento, setSelectedLancamento] = useState<Lancamento | null>(null);

  const [popupAbertoCriarLancamento, setPopupCriarLancamentoAberto] = useState(false);
  const [popupAbertoEditarLancamento, setPopupEditarLancamentoAberto] = useState(false);
  const [popupAbertoExcluirLancamento, setPopupExcluirLancamentoAberto] = useState(false);


  const [selectedLancamentoId, setSelectedLancamentoId] = useState<number | null>(null);

  // Atualize a seleção do lançamento
  const handleLancamentoSelected = (lancamento: Lancamento) => {
    setSelectedLancamento(lancamento);
  };

  const abrirPopupExcluirLancamento = (lancId: number) => {
    setSelectedLancamentoId(lancId);
    setPopupExcluirLancamentoAberto(true);
  };

  const fecharPopupExcluirLancamento = () => {
    setPopupExcluirLancamentoAberto(false);
  };

  const abrirPopupEditarLancamento = (lancId: number) => {
    setSelectedLancamentoId(lancId);
    setPopupEditarLancamentoAberto(true);
  };

  const fecharPopupEditarLancamento = () => {
    setPopupEditarLancamentoAberto(false);
  };

  const abrirPopupCriarLancamento = () => {
    setPopupCriarLancamentoAberto(true);
  };

  const fecharPopupCriarLancamento = () => {
    setPopupCriarLancamentoAberto(false);
  };

  return (
    <div className="fixed w-screen h-[calc(100vh-60px)] flex flex-col bg-white">



      {/* Cadastro de lançamento */}
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className='flex justify-center items-center rounded w-full h-fit'>
        <div className='relative flex justify-end rounded-lg mt-1 p-2 w-full'>

          <Link href={'/modulos'} title="voltar">
            <div className='absolute top-[4px] z-10 left-[8px] group flex justify-center items-center py-2 px-4 border border-transparent text-base rounded-md hover:bg-slate-200 text-black'>
              <ArrowLeftIcon className="mr-4 h-7 w-5 text-center" aria-hidden="true" />
              <span className='hidden md:block'>Voltar</span>
            </div>
          </Link>

          <button
            onClick={abrirPopupCriarLancamento}
            className=' group relative items-center w-[25%] flex justify-center py-1 px-2 border border-transparent text-sm font-medium rounded-md bg-lime-500 hover:bg-lime-400 text-black hover:scale-[1.02] duration-200'
          >
            Cadastrar
          </button>

          <PopupCriarLancamento open={popupAbertoCriarLancamento} onClose={fecharPopupCriarLancamento} />

          <button
            onClick={() => {
              if (selectedLancamento) {
                abrirPopupEditarLancamento(selectedLancamento.lancId);
              } else {
                alert("Selecione um lançamento na tabela!")
              }
            }
            }
            className='mx-4 group relative items-center w-[25%] flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md bg-orange-600 hover:bg-orange-500 text-white hover:scale-[1.02] duration-200'
          >
            Editar
          </button>
          {selectedLancamento && (
            <PopupEditarLancamento
              open={popupAbertoEditarLancamento}
              onClose={fecharPopupEditarLancamento}
              lancId={selectedLancamento.lancId}
              lancData={selectedLancamento.lancData}
              lancClassificacao={selectedLancamento.lancClassificacao}
              lancDescricao={selectedLancamento.lancDescricao}
              lancStatus={selectedLancamento.lancStatus}
              lancFavorecido={selectedLancamento.lancFavorecidos}
              lancCentroCusto={selectedLancamento.lancCentroCusto}
              lancValor={selectedLancamento.lancValor}
              lancVencimento={selectedLancamento.lancVencimento}
            />
          )}
          <button
            onClick={() => {
              if (selectedLancamento) {
                abrirPopupExcluirLancamento(selectedLancamento.lancId);
              } else {
                alert("Selecione um lançamento na tabela!")
              }
            }
            }
            className='group relative items-center w-[25%] flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md bg-red-700 hover:bg-red-400 text-white hover:scale-[1.02] duration-200'
          >
            Excluir
          </button>
          {selectedLancamento && (
            <PopupExcluirLancamento
              open={popupAbertoExcluirLancamento}
              onClose={fecharPopupExcluirLancamento}
              lancId={selectedLancamento.lancId}
            />
          )}
        </div>

      </motion.div>

      {/* Tabela De Lançamento */}
      <motion.div
        initial={{ opacity: 0, y: 600 }}
        transition={{
          duration: 0.3,
          delay: 0.3
        }}
        animate={{ opacity: 1, y: 0 }}
        className='h-full p-2 overflow-y-auto'>
        <TableLancamentos lancamentos={lancamentos} onLancamentoSelected={handleLancamentoSelected} />
      </motion.div>


    </div>
  )
}
