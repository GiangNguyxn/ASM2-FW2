import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useAppDispatch } from "../../store/hook";
import { addProduct } from "../../actions/Product";
import { useNavigate } from "react-router";
import { useAddProductMutation } from "../../api/Product";
type Props = {};

const AddProductPage = () => {
  const [add , result] = useAddProductMutation()
  const [urlImage, setUrlImage] = useState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cloud_name = "dbktpvcfz";
  const preset_key = "upload";
  const onFinish = (values: any) => {
    const newProduct = { ...values, image: urlImage };
    if (newProduct.image != undefined) {
      dispatch(add(newProduct));
      navigate("/admin");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onHandleFile = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    setUrlImage(data.secure_url);
  };

  return (
    <>
      <h1 className=" text-4xl font-bold m-4">Thêm sản phẩm</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input your price!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          rules={[{ required: true, message: "Please input your image!" }]}
        >
          <input type="file" onChange={onHandleFile} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProductPage;
