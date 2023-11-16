// "use client"
// import React, { useState, useRef } from 'react';
// import PopupExcluirPerfilAcesso from '@/app/components/popupExclurPerfilAcesso';

// interface PerfilAcesso {
//     id_perfil_acesso: number;
//     nome_perfil_acesso: string;
// }

// interface ButtonRemoverProps {
//     id_perfil_acesso: number;
//     nome_perfil_acesso: string;
//     // Inclua quaisquer outras props necessárias aqui
// }

// export const ButtonRemover = ({ id_perfil_acesso, nome_perfil_acesso }: ButtonRemoverProps) => {

//     const [itemToBeRemoved, setItemToBeRemoved] = useState<PerfilAcesso | null>(null);

//     const abrirPopupExcluirPerfilAcesso = (perfil_acesso: PerfilAcesso) => {
//         setItemToBeRemoved(perfil_acesso);
//     };

//     const fecharPopupExcluirPerfilAcesso = () => {
//         setItemToBeRemoved(null);
//     };

//     return (
//         <>
//             <button
//                 className='w-[48%] h-[38px] flex items-center justify-center border border-transparent text-sm rounded-md bg-red-300 hover-bg-red-400'
//                 onClick={(e) => {
//                     e.stopPropagation();
//                     abrirPopupExcluirPerfilAcesso( { id_perfil_acesso, nome_perfil_acesso } );
//                 }}
//             >
//                 Remover
//             </button>
//             <PopupExcluirPerfilAcesso
//                 open={itemToBeRemoved !== null}
//                 onClose={fecharPopupExcluirPerfilAcesso}
//                 id_perfil_acesso={itemToBeRemoved ? itemToBeRemoved.id_perfil_acesso : 0}
//                 nome_perfil_acesso={itemToBeRemoved ? itemToBeRemoved.nome_perfil_acesso : ''}

//             />
//         </>
//     )
// }