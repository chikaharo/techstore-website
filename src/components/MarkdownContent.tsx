import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// const ReactMarkdown = require("react-markdown/with-html");
interface Props {
	content: string;
}

const MarkdownContent = ({ content }: Props) => {
	console.log("markdown content: ", content);
	return (
		<div className="w-full bg-white p-4">
			<div></div>
			<div
				className="ql-editor"
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</div>
	);
};

export default MarkdownContent;
