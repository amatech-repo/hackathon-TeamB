import React, { useState } from "react";

const Comment = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    entry_2011066903: "", // コメント
  });

  const NGComments = ["死ね", "バカ", ".exe"];
  const regex = new RegExp(NGComments.join("|"));

  const handleChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    if (formData.entry_2011066903.match(regex)) {
      alert("ERROR: コメントにNGワードが含まれています");
      return false;
    }

    // エスケープ処理
    const escapedData = {
      ...formData,
      entry_2011066903: formData.entry_2011066903.replace(/</g, "&lt;"),
    };

    console.log("送信するデータ:", escapedData);

    setSubmitted(true); // フラグを設定
    // 実際にはここでフォーム送信のロジックを書く

  };

  return (
    <div>
      <form
        action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfVg1ZIQ_9bl8DCTaHTfLDs3hBikF32FrnyoCxWgwIZ32dJCQ/formResponse"
        target="hidden_iframe"
        method="post"
        onSubmit={(e)=>handleSubmit(e)}
      >
        <p>
          <textarea
            name="entry.2011066903"
            placeholder="コメント"
            rows={10}
            cols={40}
            maxLength={400}
            required
            //</p>value={formData.entry_2011066903}
            //onChange={(e)=>handleChange(e)}
          ></textarea>
        </p>
        <input type="submit" id="submitbutton" value="送信" />
      </form>
      <iframe
  onLoad={() => {
    if (submitted) {
      window.location.href = ""; // リロードを行う
    }
  }}
  id="hidden_iframe"
  name="hidden_iframe"
  style={{ display: "none" }}
></iframe>

    </div>
  );
};

export default Comment;
