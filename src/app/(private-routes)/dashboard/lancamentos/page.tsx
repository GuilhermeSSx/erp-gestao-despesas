"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from "framer-motion";
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import TableLancamentos from '@/app/components/ui/table/Lancamentos';
import PopupCriarLancamento from '@/app/components/ui/modal/CriarLancamento';
import PopupEditarLancamento from '@/app/components/ui/modal/EditarLancamento';
import PopupExcluirLancamento from '@/app/components/ui/modal/ExcluirLancamento';

interface Lancamento {
  lancId: number;
  lancData: string;
  lancFavorecidos: string;
  lancCategoria: string;
  lancFormaPagamento: string;
  lancValor: number;
  lancStatus: string;
  lancDetalhes?: () => void;
}

function criarLancamento(data: Omit<Lancamento, 'lancDetalhes'>, onDetalhes: () => void): Lancamento {
  return { ...data, lancDetalhes: onDetalhes };
}

export default function Lancamentos() {
  const [selectedLancamento, setSelectedLancamento] = useState<Lancamento | null>(null);
  const [popupAbertoCriarLancamento, setPopupCriarLancamentoAberto] = useState(false);
  const [popupAbertoEditarLancamento, setPopupEditarLancamentoAberto] = useState(false);
  const [popupAbertoExcluirLancamento, setPopupExcluirLancamentoAberto] = useState(false);
  const [selectedLancamentoId, setSelectedLancamentoId] = useState<number | null>(null);

  const handleLancamentoSelected = (lancamento: Lancamento) => {
    setSelectedLancamento(lancamento);
  };

  const abrirPopupExcluirLancamento = (lancId: number) => {
    setSelectedLancamentoId(lancId);
    setPopupExcluirLancamentoAberto(true);
  };

  const fecharPopupExcluirLancamento = () => setPopupExcluirLancamentoAberto(false);
  const abrirPopupEditarLancamento = (lancId: number) => {
    setSelectedLancamentoId(lancId);
    setPopupEditarLancamentoAberto(true);
  };
  const fecharPopupEditarLancamento = () => setPopupEditarLancamentoAberto(false);
  const abrirPopupCriarLancamento = () => setPopupCriarLancamentoAberto(true);
  const fecharPopupCriarLancamento = () => setPopupCriarLancamentoAberto(false);

  // Criando os lançamentos com lupa clicável
  const lancamentos: Lancamento[] = [
    criarLancamento({
      lancId: 1,
      lancData: '28/08/2025',
      lancFavorecidos: 'Maria Oliveira',
      lancCategoria: 'Hospedagem',
      lancFormaPagamento: 'PIX',
      lancValor: 600,
      lancStatus: 'Recebido'
    }, () => alert('Abrir detalhes do lançamento 1')),

    criarLancamento({
      lancId: 2,
      lancData: '28/08/2025',
      lancFavorecidos: 'João Silva',
      lancCategoria: 'Venda de produtos',
      lancFormaPagamento: 'Dinheiro',
      lancValor: 15,
      lancStatus: 'Recebido'
    }, () => alert('Abrir detalhes do lançamento 2')),

    criarLancamento({
      lancId: 3,
      lancData: '28/08/2025',
      lancFavorecidos: 'CEMIG',
      lancCategoria: 'Conta de energia',
      lancFormaPagamento: 'Débito',
      lancValor: 850,
      lancStatus: 'Pago'
    }, () => alert('Abrir detalhes do lançamento 3')),
  ];

  return (
    <div className="overflow-hidden w-full md-web:min-h-[calc(100dvh-60px)] h-[calc(100dvh-60px)] flex flex-col ">
      {/* Cabeçalho com botões */}
      <motion.div initial={{ opacity: 0, y: -60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className='flex justify-center items-center rounded w-full h-fit'>
        <div className='relative flex justify-end rounded-lg mt-1 p-2 w-full'>
          <Link href={'/dashboard'} title="voltar">
            <div className='absolute top-[4px] z-10 left-[8px] group flex justify-center items-center py-2 px-4 border border-transparent text-base rounded-md hover:bg-slate-200 text-black'>
              <ArrowLeftIcon className="mr-4 h-7 w-5 text-center" aria-hidden="true" />
              <span className='hidden md:block'>Voltar</span>
            </div>
          </Link>

          <button onClick={abrirPopupCriarLancamento} className='group relative items-center w-[110px] flex justify-center py-1 px-2 border border-transparent text-responsive font-medium rounded-md bg-lime-500 hover:bg-lime-400 text-black hover:scale-[1.02] duration-200'>
            Cadastrar
          </button>
          <PopupCriarLancamento open={popupAbertoCriarLancamento} onClose={fecharPopupCriarLancamento} />

          <button onClick={() => selectedLancamento ? abrirPopupEditarLancamento(selectedLancamento.lancId) : alert("Selecione um lançamento na tabela!")}
            className='mx-4 group relative items-center w-[110px] flex justify-center py-2 px-2 border border-transparent text-responsive font-medium rounded-md bg-orange-600 hover:bg-orange-500 text-white hover:scale-[1.02] duration-200'>
            Editar
          </button>
          {selectedLancamento && (
            <PopupEditarLancamento
              open={popupAbertoEditarLancamento}
              onClose={fecharPopupEditarLancamento}
              lancId={selectedLancamento.lancId}
              lancData={selectedLancamento.lancData}
              lancFavorecido={selectedLancamento.lancFavorecidos}
              lancClassificacao={selectedLancamento.lancCategoria}
              lancCentroCusto={selectedLancamento.lancFormaPagamento}
              lancValor={selectedLancamento.lancValor}
              lancStatus={selectedLancamento.lancStatus}
            />
          )}

          <button onClick={() => selectedLancamento ? abrirPopupExcluirLancamento(selectedLancamento.lancId) : alert("Selecione um lançamento na tabela!")}
            className='group relative items-center w-[110px] flex justify-center py-2 px-2 border border-transparent text-responsive font-medium rounded-md bg-red-700 hover:bg-red-400 text-white hover:scale-[1.02] duration-200'>
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

      {/* Tabela de lançamentos */}
      <motion.div initial={{ opacity: 0, y: 600 }} transition={{ duration: 0.3, delay: 0.3 }} animate={{ opacity: 1, y: 0 }} className='h-full p-2 overflow-y-auto'>
        <TableLancamentos lancamentos={lancamentos} onLancamentoSelected={handleLancamentoSelected} />
      </motion.div>
    </div>
  );
}
