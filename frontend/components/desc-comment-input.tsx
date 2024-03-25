import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "bullet" }, { list: "ordered" }],
    [{ script: "sub" }, { script: "super" }],
    [{ color: [] }],
    ["link", "image"],
    ["code-block"],
  ],
};

const DescCommentInput = ({
  state,
  handleChange,
}: {
  state: string;
  handleChange: (value: string) => void;
}) => {
  return (
    <QuillEditor
      className="max-h-56 overflow-auto"
      theme="snow"
      modules={modules}
      value={state}
      onChange={(value) => handleChange(value)}
    />
  );
};

export default DescCommentInput;
