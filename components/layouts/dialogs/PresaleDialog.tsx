'use client';

// import BaseDialog from './BaseDialog';
import PresaleForm from '@/components/coin/PresaleForm';

import { IRootState, useSelector } from '@/store';

import React, { useCallback, useEffect, useState } from 'react';
import { Coin } from '@/types/types';
import { useRouter } from 'next/navigation';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useCoinData } from '@/components/coin/CoinDataProvider';
import PresaleTimer from '@/components/elements/PresaleTimer';
import PriceButton from '@/components/elements/buttons/PriceButton';
import WalletAddressChip from '@/components/elements/chips/WalletAddressChip';

// import ConfirmDialog from '../elements/dialogs/ConfirmDialog';
import { MINIMUM_WEB2_BALANCE } from '@/constants/constants';
import { useSession } from 'next-auth/react';
import ConfirmDialog from '@/components/elements/dialogs/ConfirmDialog';

const schema = yup.object().shape({
    amount: yup.number().typeError('Amount must be a number').positive('Amount must be positive').required('Amount is required'),
});

type PresaleDialogProps = {
    coin: Coin;
    // open: any;
    // setOpen: React.Dispatch<any>;
};
// { coin, open, setOpen }: PresaleDialogProps

const PresaleDialog = ({ coin }: PresaleDialogProps) => {
    // const { createPresaleTransactionStatus } = useSelector((state: IRootState) => state.coin);

    // // action after success of presale transaction
    // useEffect(() => {
    //     if (createPresaleTransactionStatus === 'success') {
    //         // reset(); // reset the form value after success
    //         setOpen(false);
    //     }
    // }, [createPresaleTransactionStatus]);

    const router = useRouter();
    const { data: session, status } = useSession();

    // const { getUserInfo, getBalance } = useAuth();
    const { buyPresale, sendingSOL } = useCoinData();
    const isPresaleEnded = coin?.presaleEndAt && new Date(coin?.presaleEndAt) < new Date();

    const {
        handleSubmit,
        setValue,
        register,
        watch,
        setFocus,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            amount: 0,
        },
    });

    useEffect(() => {
        setFocus('amount');
    }, [setFocus]);

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<any>(null);

    const onSubmit = async (data: any) => {
        // const userInfo = await getUserInfo();
        // const balance = await getBalance();
        // if (userInfo && userInfo.typeOfLogin == 'google') {
        //     if (balance < MINIMUM_WEB2_BALANCE) {
        //         showMessage('Please go to your profile page and deposit at least 0.1 SOL to activate your account before you can start trading or withdrawing.', 'error');
        //         setTimeout(() => {
        //             router.push(`/user/${session?.user?.username}`);
        //         }, 2000);
        //         return;
        //     }
        // }
        // if (balance < data.amount) {
        //     showMessage('Insufficient balance', 'error');
        //     setTimeout(() => {
        //         router.push(`/user/${session?.user?.username}`);
        //     }, 2000);
        //     return;
        // }
        // setFormData(data);
        // setIsOpen(true); // Open the confirmation dialog
    };

    const confirmSubmission = async () => {
        if (coin && coin?._id) {
            await buyPresale(coin?._id.toString(), formData.amount);
        }

        reset(); // Reset the form after submission
        setIsOpen(false); // Close the dialog
    };

    console.log({ coin });

    return (
        <div className="w-full pl-7 pr-6 pt-9 pb-6 bg-black rounded-lg shadow border border-blue-200/10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6">
                    <div className="flex flex-col justify-between">
                        <div className="flex justify-between border-b border-dashed border-white/10">
                            <div className="flex items-start">
                                <img className="w-12 h-12 rounded-[5px]" loading="lazy" src={coin?.imageUri || '/assets/images/token-default-avatar.jpeg'} alt={coin?.name} />
                                <div className="ml-3.5 flex flex-col justify-between">
                                    <div className="base text-white/90 font-semibold text-lg lg:text-[22px] mr-1 mb-1.5">{coin?.symbol}</div>
                                    <div className="flex flex-row justify-start flex-wrap gap-2.5">
                                        <WalletAddressChip address={`${coin?.mint}`} prefix="CA:" />
                                        <WalletAddressChip address={`${coin?.solCollectionWallet}`} prefix="FUND:" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative my-6">
                            <input
                                {...register('amount')}
                                className="h-[80px] py-3 px-4 pr-28 block w-full border-none shadow-none rounded-lg !text-blue-200 text-[46px] disabled:opacity-50 disabled:pointer-events-none placeholder:text-blue-200/20 bg-blue-200/5"
                                placeholder="0.00"
                                type="text"
                                pattern="^\d+(\.\d{0,6})?$" // Updated pattern to allow up to 6 decimal places
                                onKeyDown={(e) => {
                                    // Allow Backspace and Delete keys
                                    if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
                                        return; // Allow these keys
                                    }

                                    if (e.key === 'Enter') {
                                        e.preventDefault(); // Prevent default form submission
                                        handleSubmit(onSubmit)(); // Manually submit the form
                                    }

                                    // Prevent input if it is not a number or a decimal point
                                    if (!/[0-9]/.test(e.key) && e.key !== '.') {
                                        e.preventDefault();
                                    }

                                    // Prevent multiple decimal points
                                    const currentValue = (e.target as HTMLInputElement)?.value;
                                    if (e.key === '.' && currentValue.includes('.')) {
                                        e.preventDefault();
                                    }

                                    // Prevent entering more than 6 decimal places
                                    if (currentValue.includes('.')) {
                                        const decimalPart = currentValue.split('.')[1];
                                        if (decimalPart.length >= 6 && !/[0-9]/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }
                                }}
                            />

                            <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4 text-blue-200 text-2xl font-medium font-figtree leading-snug space-x-2">
                                <div>SOL</div>
                                <span className="icon-solana" />
                            </div>
                        </div>

                        <div className="button-group flex flex-row items-center gap-x-2">
                            {['Reset', '1 SOL', '5 SOL', '10 SOL', '100 SOL'].map((label) => (
                                <PriceButton
                                    key={label}
                                    label={label}
                                    onClick={() => {
                                        if (label === 'Reset') {
                                            setValue('amount', 0);
                                        } else {
                                            const value = parseFloat(label.split(' ')[0]);
                                            setValue('amount', value);
                                        }
                                    }}
                                />
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="w-full h-[50px] bg-[#03e1ff] rounded-[10px] mt-5 disabled:opacity-50 disabled:pointer-events-none"
                            disabled={isPresaleEnded || watch('amount') <= 0 || sendingSOL}
                        >
                            {coin?.presaleEndAt && (
                                <PresaleTimer presaleEndAt={coin?.presaleEndAt} className="text-center text-black text-base font-bold font-figtree" wrapText={`Buy Presale (Ends in %) ⏳`} />
                            )}
                        </button>
                    </div>
                </div>
                <ConfirmDialog message="Confirm payment?" open={isOpen} setOpen={setIsOpen} callback={confirmSubmission} />
                {/* {confirmDialog('Confirm payment?', confirmationModal, setConfirmationModal, handleOpenConfirmationModal)} */}
            </form>
        </div>
    );
};

export default PresaleDialog;
