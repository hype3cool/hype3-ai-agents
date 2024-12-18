// TextAreaField.tsx

import React from 'react';
import { useFormContext, RegisterOptions } from 'react-hook-form';
import { FormControl, FormLabel, Textarea, FormErrorMessage } from '@chakra-ui/react';

interface TextAreaFieldProps {
    label: string;
    name: string;
    registerOptions?: RegisterOptions; // Optional register options for validation
    placeholder?: string; // Optional placeholder prop
    rows?: number; // Optional rows prop for the textarea
    isRequired?: boolean;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, name, registerOptions, placeholder, rows = 10, isRequired }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <FormControl isInvalid={!!errors[name]} mb={4} isRequired={isRequired}>
            <FormLabel htmlFor={name} fontWeight="bold" className="form-label">
                {label}
            </FormLabel>
            <Textarea
                {...register(name, registerOptions)} // Register with validation options
                id={name}
                placeholder={placeholder}
                rows={rows}
                className="input input-secondary p-4 w-full bg-black rounded-[18px] border border-white/20 text-white text-sm font-semibold leading-tight tracking-normal placeholder:text-white/50 active:border-none"
                sx={{
                    height: 'auto',
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

            {errors[name] && typeof errors[name].message === 'string' && <FormErrorMessage className="mt-2 font-semibold text-rose-400">{errors[name]?.message}</FormErrorMessage>}
        </FormControl>
    );
};

export default TextAreaField;

// import React from 'react';
// import { useFormContext, RegisterOptions } from 'react-hook-form';

// interface TextAreaFieldProps {
//     label: string;
//     name: string;
//     registerOptions?: RegisterOptions; // Optional register options for validation
// }

// const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, name, registerOptions }) => {
//     const { register, formState: { errors } } = useFormContext();

//     return (
//         <div className="flex flex-col mb-4">
//             <label className="font-bold" htmlFor={name}>{label}</label>
//             <textarea
//                 {...register(name, registerOptions)} // Register with validation options
//                 id={name}
//                 className={`border p-2 ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors[name] && typeof errors[name].message === 'string' && (
//                 <span className="text-red-500">{errors[name].message}</span>
//             )}
//         </div>
//     );
// };

// export default TextAreaField;
