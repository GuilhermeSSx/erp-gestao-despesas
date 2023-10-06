import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PopupProps {
    open: boolean;
    onClose: () => void;
    onAnimationComplete: () => void;
    success: boolean;
    failed: boolean;
}

const AlertLogin: React.FC<PopupProps> = ({ open, onClose, success, failed, onAnimationComplete }) => {

    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        if (open) {
            const timeout = setTimeout(() => {
                if(animationComplete) {
                    onAnimationComplete
                    onClose();
                }
                
            }, 2200);

            return () => {
                clearTimeout(timeout);
            };
        }

        return
    }, [open, onClose]);

    return (
        <AnimatePresence onExitComplete={() => setAnimationComplete(true)}>
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -150 }}
                    animate={{ opacity: 1, y: -25 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.4
                    }}
                    exit={{ opacity: 0, y: -150 }}
                    className="fixed w-fit rounded-lg flex bottom-6 left-6 z-50"
                >

                    {
                        success ? (
                            <div className="bg-green-600 py-4 px-6 rounded-l-lg flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-white fill-current" viewBox="0 0 16 16" width="20" height="20">
                                    <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                                </svg>
                            </div>
                        ) : failed ? (
                            <div className="bg-red-600 py-4 px-6 rounded-l-lg flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="fill-current text-white" width="20" height="20">
                                    <path fillRule="evenodd" d="M4.47.22A.75.75 0 015 0h6a.75.75 0 01.53.22l4.25 4.25c.141.14.22.331.22.53v6a.75.75 0 01-.22.53l-4.25 4.25A.75.75 0 0111 16H5a.75.75 0 01-.53-.22L.22 11.53A.75.75 0 010 11V5a.75.75 0 01.22-.53L4.47.22zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5H5.31zM8 4a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 4zm0 8a1 1 0 100-2 1 1 0 000 2z" />
                                </svg>
                            </div>
                        ) : ''
                    }


                    <div className="px-4 py-4 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200 select-none">
                        {
                            success ? (
                                'Cadastrado realizado com sucesso !'
                            ) : failed ? (
                                'Erro em realizar o cadastro !'
                            ) : ''
                        }

                        <button
                            onClick={onClose}
                            className="hover:bg-slate-200 flex items-center justify-center mx-4 select-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-gray-700" viewBox="0 0 16 16" width="23" height="23">
                                <path fillRule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
                            </svg>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default AlertLogin;
