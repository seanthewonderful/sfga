'use client';

import { useParams } from 'next/navigation';
import EditPostClient from './EditPostClient';

export default function EditPost() {
    const params = useParams();
    return <EditPostClient id={params.id as string} />;
} 