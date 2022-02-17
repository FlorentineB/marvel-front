import gif from "../static/loading.gif";

const Loading = () => (
  <div className="loading-wrapper">
    <img src={gif} className="loading" alt="Loading..." />
  </div>
);

export default Loading;
