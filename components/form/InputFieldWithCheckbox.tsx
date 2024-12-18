import React from 'react';
import { useFormContext, RegisterOptions } from 'react-hook-form';
import { FormControl, FormLabel, Input, FormErrorMessage, Checkbox } from '@chakra-ui/react';

interface InputFieldWithCheckboxProps {
    label: string;
    name: string;
    checkboxName: string; // Name for the checkbox
    type?: string;
    registerOptions?: RegisterOptions; // Optional register options for validation
    placeholder?: string; // Optional placeholder prop
    isRequired?: boolean;
    prefix?: string; // Optional prefix prop
}

const InputFieldWithCheckbox: React.FC<InputFieldWithCheckboxProps> = ({ 
    label, 
    name, 
    checkboxName,
    type = 'text', 
    registerOptions, 
    placeholder, 
    isRequired,
    prefix = '' // Default to an empty string if no prefix is provided
}) => {
    const {
        register,
        setValue,
        formState: { errors },
        watch,
    } = useFormContext();

    const isCheckboxChecked = watch(checkboxName); // Watch the checkbox state

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // Only concatenate prefix if value is not empty and also if prefix has already been added
        if (value && !value.startsWith(prefix.trim())) {
            setValue(name, prefix + value); // Concatenate prefix with input value
        } else {
            setValue(name, value); // Just set value without prefix if it's already prefixed
        }
    };

    return (
        <FormControl isInvalid={!!errors[name]} mb={4} isRequired={isRequired && isCheckboxChecked}>
            <div className="flex items-center">
                <FormLabel htmlFor={name} fontWeight="bold" className="form-label" mb={0}>
                    {label}
                </FormLabel>
                <Checkbox 
                    {...register(checkboxName)} // Register checkbox with react-hook-form
                    className="ml-2"
                >
                    Enable
                </Checkbox>
            </div>
            <Input
                {...register(name, { required: isCheckboxChecked ? true : false })} // Conditionally require based on checkbox
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
                disabled={!isCheckboxChecked} // Disable input if checkbox is not checked
            />
            {errors[name] && typeof errors[name]?.message === 'string' && (
                <FormErrorMessage className="mt-2 font-semibold text-rose-400">
                    {errors[name]?.message}
                </FormErrorMessage>
            )}
        </FormControl>
    );
};

export default InputFieldWithCheckbox;