import { use } from 'react';
import EditPostClient from './EditPostClient';

export default function EditPost({ params }: { params: { id: string } }) {
    const id = use(Promise.resolve(params.id));
    return <EditPostClient id={id} />;
} 