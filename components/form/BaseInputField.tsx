import React from 'react';
import { useFormContext, RegisterOptions } from 'react-hook-form';
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';

interface BaseInputFieldProps {
    label: string;
    name: string;
    type?: string;
    registerOptions?: RegisterOptions; // Optional register options for validation
    placeholder?: string; // Optional placeholder prop
    isRequired?: boolean;
}

const BaseInputField: React.FC<BaseInputFieldProps> = ({ label, name, type = 'text', registerOptions, placeholder, isRequired }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <FormControl isInvalid={!!errors[name]} mb={4} isRequired={isRequired}>
            <FormLabel htmlFor={name} fontWeight="bold" className="form-label">
                {label}
            </FormLabel>
            <Input
                {...register(name)} // Register with validation options
                type={type}
                id={name}
                placeholder={placeholder}
                className="input active:border-none input-secondary w-full bg-black rounded-[18px] border-white/20 text-white text-sm font-semibold leading-tight tracking-normal placeholder:text-white/50"
                sx={{
                    borderWidth: '2px',
                    '&:hover': {
                        borderWidth: '2px',
                    },
                    '&:focus': {
                        borderWidth: '2px',
                    },
                    '&:active': {
                        borderWidth: '2px',
                    },
                    '&:focus-visible': {
                        borderWidth: '2px',
                    },
                }}
            />
            {errors[name] && typeof errors[name]?.message === 'string' && <FormErrorMessage className="mt-2 font-semibold text-rose-400">{errors[name]?.message}</FormErrorMessage>}
        </FormControl>
    );
};

export default BaseInputField;
