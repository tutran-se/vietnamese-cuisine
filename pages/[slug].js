import React from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { client } from "../libs/contenfulClient";
import { BLOCKS } from "@contentful/rich-text-types";
import Head from "next/head";
export async function getStaticProps(context) {
  const { slug } = context.params;
  const { items } = await client.getEntries({
    content_type: "cuisine",
    "fields.slug": slug,
    limit: 2,
  });
  if (items.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { cuisine: items[0].fields }, // will be passed to the page component as props
  };
}
export async function getStaticPaths() {
  const { items } = await client.getEntries({
    content_type: "cuisine",
  });
  const paths = items.map((item) => {
    return { params: { slug: item.fields.slug } };
  });
  return {
    paths,
    fallback: true,
  };
}
export default function Detail({ cuisine }) {
  // console.log(items);
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { target } = node.data;
        return (
          <Image
            src={"https:" + target.fields.file.url}
            width={target.fields.file.details.image.width}
            height={target.fields.file.details.image.height}
          />
        );
      },
    },
  };
  console.log(cuisine);
  return (
    <>
      <Head>
        <title>Vietnamese Cuisine | {cuisine.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {!cuisine ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {" "}
            <Image
              src={"https:" + cuisine.cover.fields.file.url}
              width={1000}
              height={600}
            />
            <h2>{cuisine.title}</h2>
            <div className="post-content">
              {documentToReactComponents(cuisine.content, options)}
            </div>
          </>
        )}
      </div>
    </>
  );
}
