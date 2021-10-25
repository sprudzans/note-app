import dbConnect from '../../../dbConnect';
import Note from '../../../models/Note';
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const notes = await Note.find({});

                res.status(200).json({ success: true, data: notes })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {

                const form = new formidable.IncomingForm();
                form.uploadDir = "./public/uploads";
                form.keepExtensions = true;
                form.parse(req, async (err, fields, files) => {
                    // console.log(files);
                    let gallery = [];
                    for (let img in files){
                        let path = files[img].path.replace(/\\/g, '/');
                        gallery.push(path.replace('public', ''));
                    }
                    Note.create({
                        title: fields.title,
                        description: fields.description,
                        images: gallery
                    });
                });

                res.status(201).json({ success: true, data: "OK" })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}