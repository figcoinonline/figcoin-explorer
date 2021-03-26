import { Row, Col, Card } from "antd";
import CoinIndex from "./coin/CoinIndex";
import Difficulty from "./coin/Difficulty";

const CoinSpecs = ({ lastBlock }) => {
  const responsive = { xl: 4, lg: 6, md: 12, sm: 24, xs: 24 };

  const carStyle = {
    borderRadius: 10,
    boxShadow: "0 .5rem 1.2rem rgba(189,197,209,.2)",
    wordWrap: "break-word",
    border: "1px solid #e7eaf3",
    textAlign: "center",
  };

  return (
    <Row justify="center" gutter={[20, 20]} align="middle">
      <Col {...responsive}>
        <Card style={carStyle}>
          <h3>Difficulty</h3>
          <span style={{ fontSize: 20, fontWeight: 700 }}>
            {lastBlock.difficulty}
          </span>
        </Card>
      </Col>

      <Col {...responsive}>
        <Card style={carStyle}>
          <h3>Last Block Height</h3>
          <span style={{ fontSize: 20, fontWeight: 700 }}>
            {lastBlock.index}
          </span>
        </Card>
      </Col>
      <Col {...responsive}>
        <Card style={carStyle}>
          <h3>Total Coin Supply</h3>
          <span style={{ fontSize: 20, fontWeight: 700 }}>81.000.000 FIG</span>
        </Card>
      </Col>
      <Col {...responsive}>
        <Card style={carStyle}>
          <h3>Current Price</h3>
          <span style={{ fontSize: 20, fontWeight: 700 }}>0.12 USD</span>
        </Card>
      </Col>
      <Col {...responsive}>
        <Card style={carStyle}>
          <h3>Last Timestamp</h3>
          <span style={{ fontSize: 20, fontWeight: 700 }}>
            {lastBlock.timestamp}
          </span>
        </Card>
      </Col>
    </Row>
  );
};

export default CoinSpecs;
