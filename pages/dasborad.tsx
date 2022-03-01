import dynamic from "next/dynamic";
import Layout from '../components/Layout'


// SSR対応するためにdynamic importしてる
const Chart = dynamic(
    () => import("../components/GanttChart"),
    { ssr: false }
);

const dashboard: React.FC = () => {
  return (
    <Layout title="Dasboard">
      <Chart />
    </Layout>
  )
}
export default dashboard
