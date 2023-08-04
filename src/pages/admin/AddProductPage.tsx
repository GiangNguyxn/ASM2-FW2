import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useAppDispatch } from "../../store/hook";
import { useNavigate } from "react-router";
import { useAddProductMutation } from "../../api/Product";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { pause } from "../../utils/pause";
type Props = {};

const AddProductPage = () => {
  const [add , {isLoading:isAddLoading}] = useAddProductMutation()
  const [urlImage, setUrlImage] = useState();
  const navigate = useNavigate();
  const [messageApi , contextHolder] = message.useMessage()
  const [form] = Form.useForm()
  const cloud_name = "dbktpvcfz";
  const preset_key = "upload";
  const onFinish = (values: any) => {
    const newProduct = { ...values, image: urlImage };
    if (newProduct.image != undefined) {
      add(newProduct)
      .unwrap()
      .then(async()=>{
        form.resetFields()
        messageApi.open({
          type:"success",
          content:"Thêm sản phẩm thành công . Chuyển trang sau 3s"
        });
        await pause(3000);
        navigate("/admin");



      })
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
    
    data ? setUrlImage(data.secure_url) : alert("upload failed")
  };

  return (
    <>
     {contextHolder}
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
          <Button htmlType="submit">
          {isAddLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Thêm"
                        )}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddProductPage;
