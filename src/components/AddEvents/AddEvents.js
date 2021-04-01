import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddEvents = () => {
  // eslint-disable-next-line
  const { register, handleSubmit, watch, errors } = useForm();
  const [imageURL, setImageURL] = useState(null);
  const onSubmit = (data) => {
    // eslint-disable-next-line
    const eventData = {
      name: data.name,
      imageURL: imageURL,
    };
    const url = `http://localhost:5000/addEvent`;
    // console.log(eventData);
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    }).then((res) => console.log("server side response", res));
  };
  const handleImageUpload = (event) => {
    console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "6ea8026726814f894c45c108a7a24f66");
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue="New exciting Event" ref={register} />
        <br />
        <input
          name="exampleRequired"
          type="file"
          onChange={handleImageUpload}
        />
        {errors.exampleRequired && <span>This field is required</span>}
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddEvents;
