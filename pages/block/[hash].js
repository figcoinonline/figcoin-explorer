import { Card, Col, Row } from "antd";
import AppLayout from "../../components/core/AppLayout";
import { backend } from "../../core/urls";
import axios from "axios";

import moment from "moment";

const BlockDetails = ({ data, lastBlockIndex }) => {
  console.log(data);
  const responsive = { xl: 12, lg: 14, md: 24, sm: 24, xs: 24 };

  const carStyle = {
    borderRadius: 10,
    boxShadow: "0 .5rem 1.2rem rgba(189,197,209,.2)",
    wordWrap: "break-word",
    border: "1px solid #e7eaf3",
  };

  return (
    <AppLayout>
      <Row style={{ marginBottom: 20 }}></Row>
      <Row gutter={[10, 20]}>
        <Col {...responsive}>
          <Card style={carStyle}>
            <Col span={20}>
              <h1>Block Details - {data.index}</h1>
              <p>Hash - {data.hash}</p>
            </Col>

            <Col span={24}>
              <Row>
                <Col span={6}>
                  <p>Height</p>
                </Col>
                <Col span={18}>
                  <p>{data.index}</p>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <p>Difficulty</p>
                </Col>
                <Col span={18}>
                  <p>{data.difficulty}</p>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <p>Confirmations</p>
                </Col>
                <Col span={18}>
                  <p>{data.index}</p>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <p>Timestamp</p>
                </Col>
                <Col span={18}>
                  {data.timestamp} -{" "}
                  <small>{moment(data.timestamp).toLocaleString()}</small>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <p>Previous Hash</p>
                </Col>
                <Col span={18}>
                  <p>
                    <a href={`/block/${data.previousHash}`}>
                      {data.previousHash}
                    </a>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <p>Balance</p>
                </Col>
                <Col span={18}>
                  <p>{data.figerBalance}</p>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <p>TxIds</p>
                </Col>
                <Col span={18}>
                  <p>
                    {data.data.map((item, index) => {
                      return (
                        <a href={`/tx/${item.id}`} key={index}>
                          {item.id}
                          <br />
                        </a>
                      );
                    })}
                  </p>
                </Col>
              </Row>
            </Col>
          </Card>
        </Col>
      </Row>
    </AppLayout>
  );
};

BlockDetails.getInitialProps = async ({ query }) => {
  const { hash } = query;
  const { data } = await axios.get(`${backend}block/${hash}`);

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    data,
  };
};

export default BlockDetails;
