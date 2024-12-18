'use client';
import React from 'react';

import UserProfilePicUploadSection from '@/components/auth/layouts/UserProfilePicUploadSection';

const UploadImageDialog = () => {
    return (
        <div className="w-full bg-black rounded-lg shadow border border-blue-200/10">
            <UserProfilePicUploadSection />
        </div>
    );
};

export default UploadImageDialog;
