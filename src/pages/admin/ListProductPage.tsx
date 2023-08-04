import React  from "react";
import { Button, Popconfirm, Skeleton, Space, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hook";
import { getProducts, removeProduct } from "../../actions[draft]/Product";
import { useGetProductsQuery, useRemoveProductMutation } from "../../api/Product";
type Props = {};
interface DataType {
  key: string;
  name: string;
  price: string;
  image: string;
}

const ListProductPage = (props: Props) => {
  const {data:products ,isLoading:isProductLoading} = useGetProductsQuery()
  const [messageApi , contextHolder] = message.useMessage()
  const [remove] = useRemoveProductMutation()
  

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img className="w-40" src={image} alt="" />,
    },
    {
      title: "Action",
      key: "action",
      render: ({key:id}:{key:number|string}) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/products/${id}/edit`}>Edit</Link>
          </Button>
          <div>
            <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có chắc chắn muốn xóa sản phẩm"
            onConfirm={()=>{
              remove(id).unwrap().then(()=>{
                messageApi.open({
                  type:"success",
                  content:"Xóa sản phẩm thành công"
                })
              })

            }}
            okText="Có"
            cancelText="Không"
            >
            <Button danger >
            Delete
          </Button>

            </Popconfirm>
          </div>

          
        </Space>
      ),
    },
  ];

  const dataConfig = products?.map((product) => {
    return {
      key: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    };
  });
  return (
    <>
    {contextHolder}
      <Button>
        <Link to={"/admin/products/add"}>Add New Product</Link>
      </Button>
      {isProductLoading? <Skeleton/> :<Table columns={columns} dataSource={dataConfig}  />}
      
    </>
  );
};

export default ListProductPage;
