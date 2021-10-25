import React, { useState } from 'react';
import { Button, Input, CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        margin: theme.spacing(1),
    },
}));

const NewNote = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const classes = useStyles();



    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();

        formData.append(e.target.title.name, e.target.title.value);
        formData.append(e.target.description.name, e.target.description.value);

        if(e.target.images.files){
            Array.from(e.target.images.files).forEach((file, index) => {
                formData.append("image " + index, file);
            });
        }

        fetch(process.env.host+'/api/notes', {
            method: 'POST',
            body: formData
        }).then(r => r.json()).then(res => {alert(res.success); router.push("/");})
    }

    return (
        <div className="form-container">
            <h1>Create Note</h1>
            <div>
                {
                    isSubmitting
                        ? <CircularProgress/>
                        : <form id="form" className={classes.form} onSubmit={handleSubmit} encType="multipart/form-data">
                            <Input
                                label='Заголовок'
                                placeholder='Заголовок'
                                name='title'
                                className={classes.input}
                            />
                            <Input
                                label='Описание'
                                placeholder='Описание'
                                name='description'
                                multiline={true}
                                className={classes.input}
                            />
                            <Input
                                label='Изображение'
                                placeholder='Изображение'
                                name="images"
                                type="file"
                                className={classes.input}
                                inputProps = {{ multiple: true }}
                            />
                            <Button className={classes.input} type='submit'>Create</Button>
                        </form>
                }
            </div>
        </div>
    )
}

export default NewNote;