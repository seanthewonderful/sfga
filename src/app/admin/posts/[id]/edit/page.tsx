import EditPostClient from './EditPostClient';

export default function EditPost({ params }: { params: { id: string } }) {
    return <EditPostClient id={params.id} />;
} 