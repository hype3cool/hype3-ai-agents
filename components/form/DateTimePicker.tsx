// DateTimePicker.tsx
import React from 'react';
import { useFormContext, RegisterOptions } from 'react-hook-form';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { setHours, setMinutes, setSeconds } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

interface DateTimePickerProps {
    label: string;
    name: string;
    registerOptions?: RegisterOptions; // Optional register options for validation
    isRequired?: boolean;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ label, name, registerOptions, isRequired }) => {
    const {
        register,
        setValue,
        formState: { errors },
    } = useFormContext();

    // Default date state
    const defaultDate = setHours(setMinutes(new Date(), 30), 16);
    const watchedValue = useFormContext().watch(name, defaultDate);

    return (
        <FormControl isInvalid={!!errors[name]} mb={4} isRequired={isRequired}>
            <FormLabel htmlFor={name} fontWeight="bold" className="form-label">
                {label}
            </FormLabel>
          <div className="custom-datepicker-wrapper">
                <DatePicker
                    id={name}
                    selected={watchedValue} // Use default date if no value
                    onChange={(date) => {
                        if (date) {
                            setValue(name, date); // Update value in form state
                        }
                    }}
                    showTimeSelect
                    timeFormat="HH:mm:ss"
                    injectTimes={[setHours(setMinutes(setSeconds(new Date(), 10), 1), 0), setHours(setMinutes(new Date(), 5), 12), setHours(setMinutes(new Date(), 59), 23)]}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="input input-secondary w-full bg-black rounded-[18px] border border-white/20 text-white text-sm font-semibold leading-tight tracking-normal placeholder:text-white/50 active:border-none"
                    sx={{
                        width: '100%',
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
            </div>
            {errors[name] && typeof errors[name]?.message === 'string' && <FormErrorMessage className="mt-2 font-semibold text-rose-400">{errors[name]?.message}</FormErrorMessage>}
        </FormControl>
    );
};

export default DateTimePicker;