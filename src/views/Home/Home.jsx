import Board from "../../components/Board/board"
import Sidebar from "../../components/Sidebar/Sidebar"
import styles from "./Home.module.css"

const Home = () => {
  return (
    <section className={styles.home} >
    <div className={styles.boardContainer}>
    <Board/>
    </div>

    <Sidebar/>
    </section>
  )
}

export default Home