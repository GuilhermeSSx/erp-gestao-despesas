"use client"
import TableLancamentos from '@/app/components/tableLancamentos';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import PopupCriarLancamento from '@/app/components/popupCriarLancamento';
import PopupEditarLancamento from '@/app/components/popupEditarLancamento';
import PopupExcluirLancamento from '@/app/components/popupExcluirLancamento';

interface Lancamento {
  lancId: number;
  lancData: string;
  lancClassificacao: string;
  lancPlanoConta: string;
  lancDescricao: string;
  lancStatus: string;
  lancFavorecidos: string;
  lancCentroCusto: string;
  lancValor: number;
  lancVencimento: string;
}

const lancamentos: Lancamento[] = [
  {
    lancId: 1,
    lancData: '01/01/2023',
    lancClassificacao: 'CUSTO MATERIAS',
    lancPlanoConta: 'Fretes e Carretos',
    lancDescricao: 'descrição teste 1',
    lancStatus: 'Em Aberto',
    lancFavorecidos: 'FUN- Guilherme',
    lancCentroCusto: 'UFV TAIUVA',
    lancValor: 1000,
    lancVencimento: '21/01/2023',
  },
  {
    lancId: 2,
    lancData: '02/02/2023',
    lancClassificacao: 'CUSTO 2',
    lancPlanoConta: 'Assesoria de mkt 2',
    lancDescricao: 'descrição teste 2',
    lancStatus: 'Inadimplente 2',
    lancFavorecidos: 'Funcionario teste 2',
    lancCentroCusto: 'UFV TAIUVA 2',
    lancValor: 1200,
    lancVencimento: '22/02/2023',
  },
  {
    lancId: 3,
    lancData: '03/03/2023',
    lancClassificacao: 'CUSTO 3',
    lancPlanoConta: 'Assesoria de mkt 3',
    lancDescricao: 'descrição teste 3',
    lancStatus: 'Inadimplente 3',
    lancFavorecidos: 'Funcionario teste 3',
    lancCentroCusto: 'UFV TAIUVA 3',
    lancValor: 1300,
    lancVencimento: '23/03/2023',
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
    <div className="fixed w-screen h-[calc(100vh-100px)] flex flex-col bg-slate-300">

      {/* Cadastro de lançamento */}
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className='flex justify-center items-center rounded w-full h-fit'>
        <div className='flex justify-between rounded-lg mt-1 p-2 w-full'>
          <button
            onClick={abrirPopupCriarLancamento}
            className='group relative items-center w-[32%] flex justify-center py-1 px-2 border border-transparent text-sm font-medium rounded-md bg-lime-500 hover:bg-lime-400 text-black hover:scale-[1.02] duration-200'
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
            className='group relative items-center w-[32%] flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md bg-orange-600 hover:bg-orange-500 text-white hover:scale-[1.02] duration-200'
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
              lancPlanoConta={selectedLancamento.lancPlanoConta}
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
            className='group relative items-center w-[32%] flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md bg-red-700 hover:bg-red-400 text-white hover:scale-[1.02] duration-200'
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
