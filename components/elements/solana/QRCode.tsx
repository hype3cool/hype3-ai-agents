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
        />
    );
};

export default QRCode;
