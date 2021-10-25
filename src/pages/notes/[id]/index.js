import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, CircularProgress} from '@material-ui/core';

const Note = ({ note }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteNote();
        }
    }, [isDeleting])

    const deleteNote = async () => {
        const noteId = router.query.id;
        try {
            const deleted = await fetch(`/api/notes/${noteId}`, {
                method: "Delete"
            });

            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
    }

    return (
        <div className="note-container">
            {isDeleting
                ? <CircularProgress />
                :
                <>
                    <h1>{note.title}</h1>
                    <img src={note.images[0]} width={200} alt=""/>
                    <p>{note.description}</p>
                    <Button onClick={handleDelete}>Delete</Button>
                </>
            }
        </div>
    )
}

Note.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`/api/notes/${id}`);
    const { data } = await res.json();

    return { note: data }
}

export default Note;