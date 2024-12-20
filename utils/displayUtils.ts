import { format } from 'date-fns-tz';

export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + '...';
}

export function getShortUsername(str: string) {
    return str.length > 20 ? str.substring(0, 15) + '.....' + str.substring(str.length - 5) : str;
}

export function extractTwitterUsername(url: string): string {
    if (!url) return '';

    // Regular expression to match both twitter.com and x.com URLs
    const match = url.match(/^https?:\/\/(www\.)?(twitter\.com|x\.com)\/@?([^\/]+)/);
    return match ? match[3] : ''; // Return the username part
}

export function formatPercentage(value: number): string {
    // Format the percentage based on its value
    if (value < 10) {
        return value.toFixed(2) + '%'; // 0.00% for less than 10
    } else if (value < 100) {
        return value.toFixed(1) + '%'; // 10.0% for 10 to 99
    } else {
        return Math.round(value) + '%'; // 100% for 100 and above
    }
}

// export function getTimeDifference(date: Date): string {
//     const now = new Date();
//     const diff = Math.abs(now.getTime() - date.getTime());

//     const seconds = Math.floor(diff / 1000);
//     if (seconds < 60) {
//         return `${seconds}s`;
//     }

//     const minutes = Math.floor(diff / (1000 * 60));
//     if (minutes < 60) {
//         return `${minutes}m`;
//     }

//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     if (hours < 24) {
//         return `${hours}h`;
//     }

//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     if (days < 30) {
//         return `${days}d`;
//     }

//     const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
//     return `${months}mth`;
// }

export function getTimeDifference(date: Date): { value: number; unit: string } {
    const now = new Date();
    const diff = Math.abs(now.getTime() - date.getTime());
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) {
        return { value: seconds, unit: 's' };
    }
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 60) {
        return { value: minutes, unit: 'm' };
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) {
        return { value: hours, unit: 'h' };
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days < 30) {
        return { value: days, unit: 'd' };
    }
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    return { value: months, unit: 'mth' };
}

// q: want to return a string with two last unit of times, e.g. 1d 2h, 3h 4m, 5m 6s, and finally 7s, how?

export function displayTime(date: Date): string {
    const now = new Date();

    // if (date.getTime() > now.getTime()) {
    //     return '';
    // }

    const diff = Math.abs(now.getTime() - date.getTime());
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) {
        return `${seconds}s`;
    }
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 60) {
        return `${minutes}m ${seconds % 60}s`;
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) {
        return `${hours}h ${minutes % 60}m`;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days}d ${hours % 24}h`;
}

export const formatLargeNumber = (number: number): string => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
    }).format(number);
};

export function formatMarketValue(value: number): string {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    let suffixNum = 0;

    while (value >= 1000) {
        value /= 1000;
        suffixNum++;
    }

    // Limiting to two decimal places
    const truncatedValue = value.toFixed(2);

    return `${truncatedValue}${suffixes[suffixNum]}`;
}

/**
 * Formats a timestamp into the format YYYY/MM/DD HH:mm
 * @param timestamp - The timestamp to format (can be a Date object or a timestamp string)
 * @returns A formatted date string in the format YYYY/MM/DD HH:mm
 */
export const formatTimestamp = (timestamp: string | number | Date): string => {
    // Create a Date object from the timestamp
    const date = new Date(timestamp);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }

    // Format the date
    const formattedDate = date
        .toLocaleString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        })
        .replace(',', '')
        .replace(/\//g, '/')
        .replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3/$1/$2');

    return formattedDate;
};

export const showExplorer = (address: string) => {
    const network = process.env.NEXT_PUBLIC_ENV === 'prod' ? 'mainnet' : 'devnet';
    return `https://explorer.solana.com/address/${address}?cluster=${network}`;
};

export const formatDate = (dateString: string) => {
    // Convert the date string from MongoDB to a Date object
    const date = new Date(dateString);

    // Format the date to "10 Sept 2024"
    const formattedDate = format(date, 'd MMM yyyy');

    // Format the time to "08:00 UTC"
    const formattedTime = format(date, 'HH:mm') + ' UTC';

    return {
        formattedDate,
        formattedTime,
    };
};

export const formatEarnedAmount = (earned: number) => {
    if (earned < 1000 && earned > 500) {
        return '<1k';
    } else if (earned >= 1000) {
        return `${Math.floor(earned / 1000)}k`;
    } else {
        return earned.toString(); // Return the exact number if it's 500 or less
    }
};
