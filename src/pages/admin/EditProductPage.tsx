import React, { Dispatch, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { addProduct, updateProduct } from "../../actions/Product";
import { useParams, useNavigate } from "react-router";
import { useGetProductByIdQuery, useGetProductsQuery, useUpdateProductMutation } from "../../api/Product";
import { IProduct } from "../../interfaces/product";
type Props = {};

const EditProductPage = (props: Props) => {
  const { id } = useParams();
  const { data:product,error,isLoading } = useGetProductByIdQuery(id)
  const [update, result] = useUpdateProductMutation<any>()
  const [urlImg, setUrlImg] = useState();
  const dispatch = useAppDispatch();
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
      ? dispatch(update({ id: id, ...values, image: product.image }))
      : dispatch(update({ id: id, ...values, image: urlImg }));
    navigate("/admin");
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
      <h1 className=" text-4xl font-bold m-4">Cập nhật sản phẩm</h1>
      <Form
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
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditProductPage;
