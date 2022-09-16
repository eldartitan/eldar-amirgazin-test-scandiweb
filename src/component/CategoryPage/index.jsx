import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { CATEGORY } from "../../query/queryies";
import s from "../../style/category.module.css";
import Card from "./Card";

export default function Category() {
  const { category } = useParams();
  const { loading, data } = useQuery(CATEGORY, {
    variables: { input: { title: category || "" } },
  });
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      {data ? (
        <div className={s.categoryPage}>
          <div>
            <span className={s.categoryName}>Category {category || "all"}</span>
          </div>
          <div className={s.categoryList}>
            {data.category.products.map((card) => (
              <Card key={card.id} data={card} category={category} />
            ))}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
