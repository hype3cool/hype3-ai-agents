'use client';

// react & next
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// form
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { showMessage } from '@/utils/toast';

import { Button } from '@chakra-ui/react';
import InputField from '../form/InputField';
import TextAreaField from '../form/TextAreaField';
import DateTimePicker from '../form/DateTimePicker';
import DateTimePickerWithCheckbox from '../form/DateTimePickerWithCheckbox';
import BaseDropzone, { IUploadMedia } from './elements/BaseDropzone';

import MileStoneDetails from '@/components/coin/elements/MileStoneDetails';
import CheckboxInput from '../form/CheckboxInput';

// redux & store
import { dispatch, IRootState, useSelector } from '@/store';
import { createCoin, createCoinReset } from '@/store/slices/coin';

const schema = yup.object().shape({
    imageUri: yup.string(),
    name: yup.string().required('Project Name is required'),
    symbol: yup.string().required('Ticker is required'),
    description: yup.string().required('Description is required'), // textarea
    website: yup.string().url(),
    twitter: yup.string().url(),
    telegram: yup.string().url(),
    discord: yup.string().url(),
    // milestoneShortDescription: yup.string().required('1st Milestone - Short Description is required'),
    // milestoneLongDescription: yup.string().required('1st Milestone - Long Description is required'),
    presaleEndAt: yup.string().required('Presale End Time is required'), // datepicker
    enablePresaleStartAt: yup.boolean(),
    presaleStartAt: yup.string().when('enablePresaleStartAt', ([enablePresaleStartAt], schema) => {
        return enablePresaleStartAt ? schema.required('Presale Start Time is required') : schema.notRequired();
    }),
    hasMilestone: yup.boolean(),
});

const CoinCreateFormWithMilestones = () => {
    const { createCoinStatus } = useSelector((state: IRootState) => state.coin);

    const router = useRouter();
    const { authUser } = useSelector((state: IRootState) => state.auth);

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            symbol: '',
            description: '',
            website: '',
            twitter: '',
            telegram: '',
            discord: '',
            // milestoneShortDescription: '',
            // milestoneLongDescription: '',
            presaleEndAt: '',
            presaleStartAt: '',
            enablePresaleStartAt: false,
            hasMilestone: false,
        },
    }); 

    const onSubmit = async (formData: any) => {
        if (authUser) {
            // if (!authUser?.twitter || !authUser?.twitter?.username) {
            //     showMessage('Please verified your personal twitter account before submission', 'error');
            //     return;
            // }

            // check if image is uploaded if not , show error
            if (!formData.imageUri) {
                showMessage('Image is required', 'error');
                return;
            }

            formData.presaleEndAt = new Date(formData.presaleEndAt).toISOString();
            if (formData.enablePresaleStartAt) {
                formData.presaleStartAt = new Date(formData.presaleStartAt).toISOString();
            } else {
                formData.presaleStartAt = new Date().toISOString();
            }

            delete formData.enablePresaleStartAt;
            delete formData.hasMilestone;

            await dispatch(createCoin(formData));
        }
    };

    const [uploadMedia, setUploadMedia] = useState<IUploadMedia>({});
    useEffect(() => {
        if (uploadMedia?.url) {
            methods.setValue('imageUri', uploadMedia.url);
            showMessage('Image uploaded successfully', 'success');
        }
    }, [uploadMedia, methods]);

    useEffect(() => {
        if (createCoinStatus === 'success') {
            showMessage('Coin created successfully', 'success');
            dispatch(createCoinReset());
            methods.reset();
            router.push('/');
            // router.refresh();
        } else if (createCoinStatus === 'failure') {
            showMessage('Coin creation failed', 'error');
        }
    });

    const hasMilestone = methods.watch('hasMilestone');

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="form" noValidate>
                <div className="max-w-[1024px] mx-auto relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 gap-x-[64px]">
                        <div className="left-form-input ">
                            <div className="mb-6">
                                <div className="form-label py-3">Ticker Icon</div>
                                <div className="flex gap-5 justify-between mt-2 mb-3 text-sm font-semibold tracking-normal leading-5 whitespace-nowrap text-white/50 ">
                                    <BaseDropzone path="uploads" mediaUri={{}} setMediaUri={setUploadMedia} width={100} height={100} />
                                </div>
                            </div>
                            <div className="relative mb-6">
                                <InputField label="Project Name" name="name" placeholder="" isRequired />
                            </div>
                            <div className="relative mb-6">
                                <InputField label="Ticker" name="symbol" placeholder="" isRequired />
                            </div>

                            <div className="relative mb-6">
                                <TextAreaField label="Description" name="description" isRequired />
                            </div>

                            <div className="relative mb-6">
                                <InputField label="Website (Optional)" name="website" placeholder="https://" prefix="https://" />
                            </div>

                            <div className="relative mb-6">
                                <InputField label="Twitter (Optional)" name="twitter" placeholder="https://" prefix="https://" />
                            </div>

                            <div className="relative mb-6">
                                <InputField label="Telegram (Optional)" name="telegram" placeholder="https://" prefix="https://" />
                            </div>

                            <div className="relative mb-6">
                                <InputField label="Discord (Optional)" name="discord" placeholder="https://" prefix="https://" />
                            </div>

                            <div className="relative mb-6">
                                <DateTimePicker label="Presale End Time" name="presaleEndAt" />
                            </div>
                            <div className="relative mb-6">
                                <DateTimePickerWithCheckbox label="Presale Has Start Time?" name="presaleStartAt" checkboxName="enablePresaleStartAt" />
                            </div>
                        </div>
                        <div className="right-form-input">
                            <div className="relative mb-6">
                                <CheckboxInput label="Do you want to set milestones for your tokenomics?" name="hasMilestone" />
                            </div>
                            {hasMilestone && (
                                <Fragment>
                                    <div className="relative mb-6">
                                        <InputField label="1st Milestone - Short Description" name="milestoneShortDescription" placeholder="I will" prefix="I will " />
                                    </div>
                                    <div className="relative mb-6">
                                        <TextAreaField label="1st Milestone - Long Description" name="milestoneLongDescription" />
                                    </div>

                                    <div className="flex justify-between items-center mb-2">
                                        <label htmlFor="howwork" className="flex items-center form-label">
                                            How does milestones work? &nbsp;<span className="underline">(Read more)</span>
                                        </label>
                                    </div>
                                    <MileStoneDetails />
                                </Fragment>
                            )}

                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <label htmlFor="howwork" className="flex items-center form-label">
                                        Payout Estimate
                                    </label>
                                </div>

                                <div className="base-white text-sm font-semibold">
                                    <span className="underline">From milestones:</span>
                                    <br />
                                    {hasMilestone ? `10% fund raised + 5% token airdrop (over 20 weeks)` : `2% fund raised`}
                                </div>

                                <div className="base-white text-sm font-semibold mt-4">
                                    <span className="underline">From LP fees:</span>
                                    <br />
                                    {hasMilestone ? `50% of the fees earned will be split to you` : `50% of the fees earned will be split to you`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-5 py-4">
                    <Button
                        type="submit"
                        className="hype3-btn-secondary hype3-bg-light-to-teal w-fit"
                        isDisabled={createCoinStatus === 'loading'}
                        sx={{
                            cursor: 'not-allowed',
                            '&:disabled': {
                                bg: 'gray.400',
                                color: '.100',
                            },
                        }}
                    >
                        Create
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};

export default CoinCreateFormWithMilestones;
