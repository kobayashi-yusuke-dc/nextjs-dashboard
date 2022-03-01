import dynamic from "next/dynamic";
import Layout from '../components/Layout'


// SSR対応するためにdynamic importしてる
const Chart = dynamic(
    () => import("../components/GanttChart"),
    { ssr: false }
);
const Home: React.FC = () => {
  return (
    <Layout title="Home">
      < Chart />
    </Layout>
  )
}
export default Home
