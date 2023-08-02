import React  from "react";
import { Button, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../store/hook";
import { getProducts, removeProduct } from "../../actions/Product";
import { useGetProductsQuery, useRemoveProductMutation } from "../../api/Product";
type Props = {};
interface DataType {
  key: string;
  name: string;
  price: number;
  image: string;
}

const ListProductPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const {data:products , error,isLoading} = useGetProductsQuery()
  const [remove, result] = useRemoveProductMutation()
  

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
      render: (_, record) => (
        <Space size="middle">
          <Button>
            <Link to={`/admin/products/${record.key}/edit`}>Edit</Link>
          </Button>
          <Button danger onClick={() => dispatch(remove(record.key))}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const dataConfig: DataType[] = products?.map((product) => {
    return {
      key: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    };
  });
  return (
    <>
      <Button>
        <Link to={"/admin/products/add"}>Add New Product</Link>
      </Button>
      <Table columns={columns} dataSource={dataConfig}  />;
    </>
  );
};

export default ListProductPage;
