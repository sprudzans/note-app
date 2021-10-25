import {UiFileInputButton} from "../component/UiFileInputButton";
import axios from "axios";

export default function Upload (props) {

    const onChange = async (formData) => {
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: (event) => {
                console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
            },
        };

        const response = await axios.post(process.env.host+'/api/upload', formData, config);

        console.log('response', response.data);
    };

    return (
        <UiFileInputButton
            label="Upload Single File"
            uploadFileName="theFiles"
            onChange={onChange}
        />
    );
};