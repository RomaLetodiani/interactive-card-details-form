import { ChangeEvent, useState } from "react";

const ImageToBase64Converter = ({
  handleChange,
  initialBase64String = "",
}: {
  handleChange: (base64String: string) => void;
  initialBase64String?: string;
}) => {
  const [base64String, setBase64String] = useState<string>(initialBase64String);
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Once the file is loaded, convert it to a base64 string
      const result = reader.result;
      if (typeof result === "string") {
        setBase64String(result);
        const base64 = result.split(",")[1];
        handleChange(base64);
      }
    };

    if (file) {
      // Read the file as a data URL, which will result in a base64 string
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      {base64String && <img src={base64String} alt="Uploaded" />}
    </div>
  );
};

export default ImageToBase64Converter;
