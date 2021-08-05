import { Radar } from "react-chartjs-2";

const TasteChart = (props) => {
  return <Radar data={props.data} options={props.options} />;
};

export default TasteChart;
