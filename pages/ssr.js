import styles from '../styles/Home.module.css'

export default function Home({ goods, goodsFromServer }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>SSR PAGE</h1>
        <div className={styles.grid}>
          {goodsFromServer && goodsFromServer.map(good => {
            return (<div key={good.id} className={styles.card}>
              <h2>{good.name}</h2>
              <p>{good.price}元/KG</p>
            </div>)
          })}
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`https://7b7c0854-0c55-40e9-8ad4-19ecd18fef77.mock.pstmn.io/goods`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { goodsFromServer: data }, // will be passed to the page component as props
  }
}