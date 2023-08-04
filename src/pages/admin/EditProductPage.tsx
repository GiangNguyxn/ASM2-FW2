import React, { Dispatch, useEffect, useState } from "react";
import { Button, Form, Input, Skeleton, message } from "antd";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { addProduct, updateProduct } from "../../actions[draft]/Product";
import { useParams, useNavigate } from "react-router";
import { useGetProductByIdQuery, useUpdateProductMutation } from "../../api/Product";
import { pause } from "../../utils/pause";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type Props = {};

const EditProductPage = (props: Props) => {
  const { id } = useParams();
  const { data:product,isLoading } = useGetProductByIdQuery(id || "")
  const [update, {isLoading:isEditLoading}] = useUpdateProductMutation<any>()
  const [messageApi , contextHolder] = message.useMessage()
  const [urlImg, setUrlImg] = useState();
  const [form] = Form.useForm();
  const cloud_name = "dbktpvcfz";
  const preset_key = "upload";
  const navigate = useNavigate();
  
  // set giá trị của product lấy đc vào form
  useEffect(() => {
    setFields();
  }, [product]);
  const setFields = () => {
    form.setFieldsValue({
      id: product?.id,
      name: product?.name,
      price: product?.price,
    });
  };

  const onFinish = (values: any) => {
    values.image === undefined
      ? update({ id: id, ...values, image: product.image }).unwrap().then(async()=>{
        messageApi.open({
          type:"success",
          content:"Cập nhật sản phẩm thành công . Chuyển trang sau 2s"
        })
        await pause(2000)
        navigate("/admin");

      })
      : update({ id: id, ...values, image: urlImg }).unwrap().then(async()=>{
        messageApi.open({
          type:"success",
          content:"Cập nhật sản phẩm thành công . Chuyển trang sau 2s"
        })
        await pause(2000)
        navigate("/admin");
      })
  };
  // lấy ảnh từ input và đẩy lên cloudinary
  const onHandleFile = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    setUrlImg(data.secure_url);
  };
  return (
    <>
    {contextHolder}
      <h1 className=" text-4xl font-bold m-4">Cập nhật sản phẩm</h1>
      {isLoading ? <Skeleton/> : <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        onFinish={onFinish}
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
        <Form.Item label="Image" name="image">
          <input type="file" onChange={onHandleFile} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>

          <Button htmlType="submit">{isEditLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Cập nhật"
                        )}</Button>
        </Form.Item>
      </Form>}
     
    </>
  );
};

export default EditProductPage;
