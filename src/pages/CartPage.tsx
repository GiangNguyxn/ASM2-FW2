import React from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { decrease, increase } from "../slices/Cart";
type Props = {};
interface DataType {
  key: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage = (props: Props) => {
  const { carts } = useAppSelector((state: any) => state.carts);
  const dispacth = useAppDispatch();

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
      render: (record) => <img className="w-40" src={record} alt="" />,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => dispacth(increase(record.key))}>
            Increase
          </Button>
          <Button onClick={() => dispacth(decrease(record.key))} danger>
            Decrease
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = carts?.map((cart: any) => {
    return {
      key: cart?.id,
      name: cart?.name,
      price: cart?.price,
      image: cart?.image,
      quantity: cart?.quantity,
    };
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div>
        <Table columns={columns} dataSource={data} />
        <p className="text-2xl font-bold">
          Total:
          {carts.reduce((sum: any, item: any) => {
            return sum + item.price * item.quantity;
          }, 0)}
          $
        </p>
      </div>
    </div>
  );
};

export default CartPage;
