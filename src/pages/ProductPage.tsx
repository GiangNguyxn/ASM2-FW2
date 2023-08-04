import { Button } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { Link } from "react-router-dom";
import { add } from "../slices/Cart";
import { getProducts } from "../actions[draft]/Product";
import { useGetProductsQuery } from "../api/Product";

type Props = {};

const ProductPage = (props: Props) => {
  const {data:products,error,isLoading} = useGetProductsQuery()
  const dispatch = useAppDispatch();
  return (
    <div className="max-w-[1200px] mx-auto mt-4">
      <div className="grid grid-cols-3 gap-4">
        {products?.map((product) => (
          <div key={product?.id} className="p-2 bg-slate-400 rounded-md">
            <Link to={`/products/${product?.id}`}>
              <img className="" src={product?.image} alt="" />
            </Link>
            <div className="text-lg font-bold">
              <p>{product?.name}</p>
            </div>
            <div>
              <p>{product?.price}$</p>
            </div>
            <Button onClick={() => dispatch(add({ ...product, quantity: 1 }))}>
              ADD TO CART
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
