import React, { useState } from "react";
import { client } from "../libs/contenfulClient";
import Loading from "./Loading";

export default function LoadMore({ setDishes, dishes }) {
  const [pageNumber, setPageNumber] = useState({ count: 1 });
  const [isAll, setIsAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const pageSize = 4;
  const onClickHandle = async () => {
    setLoading(true);
    const { items } = await client.getEntries({
      content_type: "cuisine",
      limit: pageSize,
      skip: pageNumber.count * pageSize,
    });
    if (items.length === 0) {
      setIsAll(true);
      setLoading(false);
      return;
    }
    const data = items.map((item) => {
      return { ...item.fields, id: item.sys.id };
    });
    // console.log(data);
    setDishes([...dishes, ...data]);
    setPageNumber({ count: pageNumber.count + 1 });
    setLoading(false);
  };
  return (
    <div className="load-more">
      {loading ? (
        <Loading />
      ) : isAll ? (
        "---END---"
      ) : (
        <button className="btn" onClick={onClickHandle}>
          Load More
        </button>
      )}

      <style jsx>
        {`
          .load-more {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 3rem;
          }
        `}
      </style>
    </div>
  );
}
