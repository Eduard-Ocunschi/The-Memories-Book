import { useForm } from "react-hook-form";
import styles from "./PageForm.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import ReactQuill, { Quill } from "react-quill";
import { useEffect, useState } from "react";
import { savePageData } from "../../../features/db/firestore";
import EditorToolbar, { formats, modules } from "../../editor/EditorToolbar";
import QuillResizeImage from "quill-resize-image";
import "../../editor/stylesEditor.css";
import "react-quill/dist/quill.snow.css";

const schema = z.object({
  title: z.string(),
  place: z.string(),
  date: z.string(),
  poveste: z.string(),
});
Quill.register("modules/resize", QuillResizeImage);

function PageForm() {
  const weatherData = useSelector((state) => state.data.weather);
  const userData = useSelector((state) => state.data.user);
  // console.log(weatherData);
  const [editorContent, setEditorContent] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      place: `${weatherData.city}, ${weatherData.country}`,
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    register("poveste", { required: false });
  }, [register]);

  useEffect(() => {
    setValue("place", `${weatherData.city}, ${weatherData.country}`);
  }, [weatherData.city, weatherData.country, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await savePageData(userData.user.uid, {
        ...data,
        id: Date.now(),
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditorChange = (value) => {
    setEditorContent(value);
    setValue("poveste", value, { shouldValidate: true });
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input_container_title}>
          <label htmlFor="title">Title</label>
          <input
            {...register("title")}
            type="text"
            placeholder="Once Upon a Time..."
          />
        </div>
        <div className={styles.place_and_date}>
          <div className={styles.input_container}>
            <label htmlFor="place">Place:</label>
            <input
              {...register("place")}
              type="text"
              placeholder="Place"
              value={`${weatherData.city}, ${weatherData.country}`}
            />
          </div>
          <div className={styles.input_container}>
            <label htmlFor="date">Date:</label>
            <input {...register("date")} type="date" placeholder="Date" />
          </div>
        </div>
        <div className={styles.text_editor}>
          <EditorToolbar />
          <ReactQuill
            theme="snow"
            value={editorContent}
            onChange={handleEditorChange}
            placeholder="There was a..."
            modules={{
              ...modules,
              resize: {},
            }}
            formats={[...formats, "image"]}
          />
        </div>

        <div className={styles.container_button}>
          <button disabled={isSubmitting} className={styles.submit_btn}>
            {isSubmitting ? "Submiting..." : "Submit"}
          </button>
        </div>
      </form>
      {/* <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: editorContent }}
      /> */}
    </>
  );
}

export default PageForm;
