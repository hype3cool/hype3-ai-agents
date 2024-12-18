// 'use client';

import React, { PropsWithChildren } from 'react';

const BaseContainer = ({ children }: { children: React.ReactNode }) => {
    return <div className="px-0.5 sm:pl-1 sm:pr-2 md:pl-2 md:pr-3 mx-2">{children}</div>;
};

export default BaseContainer;
