import "./CreatePostContainer.scss";
import {
  ProfileOutlined,
  FileImageOutlined,
  LinkedinOutlined,
  AudioOutlined,
  ProfileFilled,
  FileImageFilled,
} from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ValidationCreatePost } from "../../components/Validate";
import { createPost } from "../../services/HandleData";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

export const CreatePostContainer = () => {
  const [itemActive, setItemActive] = useState("post");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(ValidationCreatePost),
  });
  const onNavItem = (type) => {
    if (type === "post") {
      setIsActive(false);
      setItemActive(type);
    }
    if (type === "img") {
      setIsActive(true);
      setItemActive(type);
    }
    setItemActive(type);
  };
  const onSubmit = async (data) => {
    const { title, content, categoryId, hashtag } = data;
    const covertHashtag = hashtag?.split(" ");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("categoryId", categoryId);
    covertHashtag.forEach((element) => formData.append("hashtags", element));
    try {
      const path = "/post/create";
      const response = await createPost(path, formData);
      if (response.data.statusCode === 201) {
        reset();
        navigate("/");
      }
    } catch (error) {
      alert(error.response.message);
    }
  };
  return (
    <div className="createPostContainer">
      <div className="cpcHeader">
        <p className="cpcTitle">Let's create a really good post</p>
      </div>
      <div className="cpcBody">
        <div className="cpcPost">
          <div className="cpcNavigation">
            <button
              className="navItem"
              onClick={() => onNavItem("post")}
              style={{
                color: isActive ? "#000" : "#0079D3",
                fontWeight: isActive ? "500" : "700",
              }}
            >
              {isActive ? <ProfileOutlined /> : <ProfileFilled />}
              Post
            </button>
            <button
              className="navItem"
              onClick={() => onNavItem("img")}
              style={{
                color: isActive ? "#0079D3" : "#000",
                fontWeight: isActive ? "700" : "500",
              }}
            >
              {isActive ? <FileImageFilled /> : <FileImageOutlined />}
              Image & Video
            </button>
            <button className="navItem" disabled={true}>
              <LinkedinOutlined />
              Link
            </button>
            <button className="navItem" disabled={true}>
              <AudioOutlined />
              Talk
            </button>
          </div>
          <div className="cpcWrapCreatePost">
            <Form onFinish={handleSubmit(onSubmit)}>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    className="cpcInput selectCategory"
                    placeholder="please choose category"
                    {...field}
                    options={[
                      { value: 1, label: "Sport" },
                      { value: 2, label: "IT" },
                      { value: 3, label: "Football" },
                      { value: 4, label: "LoveStory" },
                      { value: 5, label: "ErorrCode" },
                      { value: 6, label: "FrontEnd" },
                      { value: 7, label: "BackEnd" },
                      { value: 8, label: "Game" },
                    ]}
                  />
                )}
              />
              <Controller
                control={control}
                name="title"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter title"
                    className="cpcInput"
                    status={errors.email && "error"}
                  />
                )}
              />
              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <TextArea
                    {...field}
                    rows={8}
                    placeholder="Enter content"
                    className="cpcInput inputArea"
                    status={errors.email && "error"}
                  />
                )}
              />
              <Controller
                control={control}
                name="hashtag"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter hashtag"
                    className="cpcInput"
                    status={errors.email && "error"}
                  />
                )}
              />
              <div className="cpcWrapButton">
                <Button
                  className="cpcBtnPost"
                  type="primary"
                  danger
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
                <Button className="cpcBtnPost" type="dashed" disabled={true}>
                  Save Draft
                </Button>
                <Button htmlType="submit" className="cpcBtnPost" type="primary">
                  Post
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <div className="cpcBanner">
          <div className="cpcTable">
            <p className="bannerTitle">
              <img
                src="/image/cpcBanner.jpg"
                alt="icon-banner"
                width="30px"
                height="30px"
              />
              <span>Rules when posting here</span>
            </p>
            <p className="bannerItem">1.Remember the human</p>
            <p className="bannerItem">2.Behave like you would in real life</p>
            <p className="bannerItem">
              3.Look for the original source of content
            </p>
            <p className="bannerItem">4.Search for duplicates before posting</p>
            <p className="bannerItem">5.Read the community’s rules</p>
            <p className="bannerItem">
              6. Don't post toxic or objectionable content
            </p>
          </div>
          <p className="bannerSuggest">
            Please be mindful of Q&A's content
            <br /> policy and practice good reddiquette.
          </p>
        </div>
      </div>
    </div>
  );
};
