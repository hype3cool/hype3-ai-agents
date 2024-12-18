import React from 'react';
import { useFormContext, RegisterOptions } from 'react-hook-form';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

interface CheckboxInputProps {
    label: string;
    name: string;
    registerOptions?: RegisterOptions; // Optional register options for validation
    isRequired?: boolean;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, name, registerOptions, isRequired }) => {
    const {
        register,
        formState: { errors },
        watch, // Use watch to get the current value of the checkbox
    } = useFormContext();

    // Watch the checkbox value
    const checked = watch(name); // This will give you the current checked state

    return (
        <FormControl isInvalid={!!errors[name]} mb={4} isRequired={isRequired} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
            <FormLabel htmlFor={name} fontWeight="bold" className="form-label">
                {label}
            </FormLabel>
            <input
                type="checkbox"
                {...register(name, registerOptions)}
                id={name}
                className={`w-4 h-4 border border-blue-200 flex items-center justify-center ${checked ? 'accent-blue-200' : 'accent-dark'}`}
            />
            {errors[name] && typeof errors[name]?.message === 'string' && <FormErrorMessage className="mt-2 font-semibold text-rose-400">{errors[name]?.message}</FormErrorMessage>}
        </FormControl>
    );
};

export default CheckboxInput;
