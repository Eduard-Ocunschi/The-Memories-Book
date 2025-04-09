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
  latitude: z.string(),
  longitude: z.string(),
  poveste: z.string(),
});

Quill.register("modules/resize", QuillResizeImage);

function PageForm() {
  const weatherData = useSelector((state) => state.data.weather);
  const userData = useSelector((state) => state.data.user);
  console.log(weatherData);
  const [editorContent, setEditorContent] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      place: `${weatherData.city}, ${weatherData.country}`,
      latitude: `${weatherData.latitude}`,
      longitude: `${weatherData.longitude}`,
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    register("poveste", { required: false });
  }, [register]);

  useEffect(() => {
    setValue("place", `${weatherData.city}, ${weatherData.country}`);
  }, [weatherData.city, weatherData.country, setValue]);

  useEffect(() => {
    setValue("latitude", String(weatherData.latitude));
    setValue("longitude", String(weatherData.longitude));
  }, [weatherData.latitude, weatherData.longitude, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await savePageData(userData.user.uid, {
        ...data,
        id: Date.now(),
        colorNr: Math.floor(Math.random() * 4) + 1,
        tiltNr: Math.floor(Math.random() * 4) + 1,
      });
      console.log(res);

      reset({
        title: "",
        place: "",
        date: "",
        latitude: "",
        longitude: "",
        poveste: "",
      });

      setEditorContent("");
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

        <input {...register("latitude")} type="hidden" name="latitude"></input>
        <input
          {...register("longitude")}
          type="hidden"
          name="longitude"
        ></input>
        <div className={styles.place_and_date}>
          <div className={styles.input_container}>
            <label htmlFor="place">Place:</label>
            <input {...register("place")} type="text" placeholder="Place" />
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
    </>
  );
}

export default PageForm;
