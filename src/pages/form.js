import React, {useRef} from "react";
import {Input} from "@material-ui/core";

export default function Form() {
    function onSubmitHandler(e){
        e.preventDefault();

        const formData = new FormData();

        Array.from(e.target.avatar.files).forEach((file) => {
            formData.append(e.target.avatar.name, file);
        });

        console.log(formData)
    }

    function onChangeHandler(e){
        const formData = new FormData();

        Array.from(e.target.files).forEach((file) => {
            formData.append(e.target.name, file);
        });

        console.log(formData)

        // fetch(process.env.host+'/api/upload', {
        //     method: "POST",
        //     body: formData
        // });
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <Input
                name="avatar"
                multiple={false}
                onChange={onChangeHandler}
                type="file"
                inputProps = {{ multiple: true }}
            />
            <button>
                Upload file
            </button>
        </form>
    )
}


