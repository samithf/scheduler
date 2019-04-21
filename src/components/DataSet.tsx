import React from "react";
import { connect } from "react-redux";
import { fetchNews } from "../actions";

interface IDataSetProps {
  fetchNews: any;
  ditto: any;
}

class DataSet extends React.Component<IDataSetProps, {}> {
  render() {
    return <div>DataSet</div>;
  }

  componentDidMount() {
    this.props.fetchNews();
  }
}

const mapStateToProps = (state: any) => {
  return { ditto: state.ditto };
};

export default connect(
  mapStateToProps,
  { fetchNews }
)(DataSet);
