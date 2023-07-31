import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { add } from "../slices/Cart";

type Props = {};

const ProductDetailPage = (props: Props) => {
  const { id } = useParams();
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<any>({});
  useEffect(() => {
    const data = products.find((item) => item.id == id);
    setProduct(data);
  }, [products]);
  return (
    <div className="max-w-[1000px] mx-auto mt-4">
      <div className="flex gap-4">
        <div>
          <h1 className="text-2xl font-bold p-2">{product?.name}</h1>
          <p className="font-bold p-2">{product?.price}</p>
          <Button onClick={() => dispatch(add({ ...product, quantity: 1 }))}>
            ADD TO CART
          </Button>
        </div>
        <img className="w-[500px]" src={product?.image} alt="" />
      </div>
    </div>
  );
};

export default ProductDetailPage;
