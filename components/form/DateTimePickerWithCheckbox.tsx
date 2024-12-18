import React from 'react';
import { useFormContext, RegisterOptions } from 'react-hook-form';
import { FormControl, FormLabel, FormErrorMessage, Checkbox } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { setHours, setMinutes, setSeconds } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

interface DateTimePickerWithCheckboxProps {
    label: string;
    name: string;
    checkboxName: string; // Name for the checkbox
    registerOptions?: RegisterOptions; // Optional register options for validation
    isRequired?: boolean;
}

const DateTimePickerWithCheckbox: React.FC<DateTimePickerWithCheckboxProps> = ({ label, name, checkboxName, registerOptions, isRequired }) => {
    const {
        register,
        setValue,
        formState: { errors },
        watch,
    } = useFormContext();

    // Default date state
    const defaultDate = setHours(setMinutes(new Date(), 30), 16);
    const watchedValue = watch(name, defaultDate);
    const isCheckboxChecked = watch(checkboxName); // Watch the checkbox state

    return (
        <FormControl isInvalid={!!errors[name]} mb={4} isRequired={isRequired && isCheckboxChecked}>
            <div className="flex items-center justify-between mb-1.5">
                <FormLabel htmlFor={name} fontWeight="bold" className="form-label" mb={0}>
                    {label}
                </FormLabel>

                {/* <input
                    type="checkbox"
                    value=""
                    className="w-4 h-4 mb-1 text-blue-200 bg-gray-100 border-gray-300 rounded focus:ring-blue-200 dark:focus:ring-blue-200 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    {...register(checkboxName)}
                    id={checkboxName}
                /> */}
                <input
                    type="checkbox"
                    {...register(checkboxName)}
                    id={checkboxName}
                    className={`w-4 h-4 border border-blue-200 flex items-center justify-center ${watchedValue ? 'accent-blue-200' : 'accent-blue-200/0'}`}
                />
            </div>
            <div className="custom-datepicker-wrapper">
                <DatePicker
                    id={name}
                    selected={isCheckboxChecked ? watchedValue : null} // Use watched value if checkbox is checked
                    onChange={(date) => {
                        if (date) {
                            setValue(name, date); // Update value in form state
                        }
                    }}
                    showTimeSelect
                    timeFormat="HH:mm:ss"
                    injectTimes={[setHours(setMinutes(setSeconds(new Date(), 10), 1), 0), setHours(setMinutes(new Date(), 5), 12), setHours(setMinutes(new Date(), 59), 23)]}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="input input-secondary w-full bg-black rounded-[18px] border border-white/20 text-white text-sm font-semibold leading-tight tracking-normal placeholder:text-white/50 active:border-none disabled:bg-gray-800"
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
                    disabled={!isCheckboxChecked} // Disable date picker if checkbox is not checked
                />
            </div>
            {errors[name] && typeof errors[name]?.message === 'string' && <FormErrorMessage className="mt-2 font-semibold text-rose-400">{errors[name]?.message}</FormErrorMessage>}
        </FormControl>
    );
};

export default DateTimePickerWithCheckbox;
