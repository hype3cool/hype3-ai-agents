import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

type QRCodeProps = {
    address: string;
};

const QRCode = ({ address }: QRCodeProps) => {
    return (
        <QRCodeCanvas
            value={address}
            title={'Send SOL to this address'}
            size={200}
            bgColor={'#03e1ff'}
            fgColor={'#000000'}
            level={'L'}
            // imageSettings={{
            //     src: 'https://d331cb3ys3pcfc-v3uat.hype3.cool/assets/images/hype3-full-logo.png',
            //     x: undefined,
            //     y: undefined,
            //     height: 50,
            //     width: 50,
            //     opacity: 1,
            //     excavate: true,
            // }}
        />
    );
};

export default QRCode;
