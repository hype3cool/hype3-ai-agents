// declare module '*.css' {
//     interface IClassNames {
//       [className: string]: string;
//     }
//     const classNames: IClassNames;
//     export = classNames;
//   }
  

// src/types/phantom.d.ts
interface PhantomSolana {
    isPhantom: boolean;
    // Add other properties and methods you may need from the Phantom wallet
    connect: () => Promise<any>;
    disconnect: () => Promise<void>;
    // Add any other methods or properties that you expect to use
    on: (event: string, callback: (args: any) => void) => void;
}

interface Window {
    phantom?: {
        solana?: PhantomSolana;
    };
}