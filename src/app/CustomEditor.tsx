import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import Editor from "./ckeditor5";

function uploadAdapter(loader) {
  return {
    upload: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const file = await loader.file;
          const response = await axios.request({
            method: "POST",
            // TODO: 서버 주소 변경
            url: `/upload_files`,
            data: {
              files: file,
            },
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          resolve({
            // TODO: 서버 주소 변경

            default: `/${response.data.filename}`,
          });
        } catch (error) {
          console.log("에러입니다");
          console.log(error);
          reject("error");
        }
      });
    },
    abort: () => {},
  };
}

function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",
    "outdent",
    "indent",
    "|",
    "imageUpload",
    "blockQuote",
    "insertTable",
    "mediaEmbed",
    "undo",
    "redo",
  ],
  extraPlugins: [uploadPlugin],
  removePlugins: ["MediaEmbedToolbar"],
};

function CustomEditor(props: { initialData: string }) {
  return (
    <CKEditor
      editor={Editor}
      config={editorConfiguration}
      data={props.initialData}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
    />
  );
}

export default CustomEditor;
