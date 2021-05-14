import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import LoadMore from "../components/LoadMore";
import { client } from "../libs/contenfulClient";
import { useState } from "react";
import Loading from "../components/Loading";

export async function getStaticProps(context) {
  const { items } = await client.getEntries({
    content_type: "cuisine",
    limit: 4,
  });
  const cuisines = items.map((item) => {
    return { ...item.fields, id: item.sys.id };
  });
  return {
    props: { cuisines }, // will be passed to the page component as props
  };
}

export default function Home({ cuisines }) {
  const [dishes, setDishes] = useState(cuisines);
  // console.log(cuisines);
  return (
    <div>
      <Head>
        <title>Vietnamese Cuisine | Homepage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        {dishes.map((dish) => (
          <div className={styles.post} key={dish.id}>
            <Link href={`/${dish.slug}`}>
              <a>
                <Image
                  src={"https:" + dish.cover.fields.file.url}
                  width={1000}
                  height={600}
                />

                <h2 className={styles.title}>{dish.title}</h2>
              </a>
            </Link>
          </div>
        ))}
      </div>
      <LoadMore dishes={dishes} setDishes={setDishes} />
    </div>
  );
}
