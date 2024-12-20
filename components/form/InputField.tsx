import React from 'react';
import { useFormContext, RegisterOptions } from 'react-hook-form';
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';

interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    registerOptions?: RegisterOptions; // Optional register options for validation
    placeholder?: string; // Optional placeholder prop
    isRequired?: boolean;
    labelClassName?: string; // Optional label class name prop
    prefix?: string; // Optional prefix prop
}

const InputField: React.FC<InputFieldProps> = ({ 
    label,
    name,
    type = 'text',
    registerOptions,
    placeholder,
    isRequired,
    labelClassName = '',
    prefix = '',
}) => {
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // only concatenate prefix if value is not empty and also if prefix has already been added, not prefixing the value again
        if (value && !value.startsWith(prefix.trim())) 
            setValue(name, prefix + value); // Concatenate prefix with input value
    };

    return (
        <FormControl isInvalid={!!errors[name]} mb={4} isRequired={isRequired}>
            <FormLabel htmlFor={name} className={`form-label ${labelClassName}`}>
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
                onChange={handleChange} // Handle change event to set value with prefix
            />
            {errors[name] && typeof errors[name]?.message === 'string' && (
                <FormErrorMessage className="mt-2 font-semibold text-rose-400">
                    {errors[name]?.message}
                </FormErrorMessage>
            )}
        </FormControl>
    );
}

export default InputField;
