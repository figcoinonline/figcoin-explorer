import { Card, Col, Row, List } from "antd";
import AppLayout from "../../components/core/AppLayout";
import { backend } from "../../core/urls";
import axios from "axios";

const TransactionDetails = ({ data, notFound }) => {
  const responsiveTx = { xl: 10, lg: 24, md: 24, sm: 24, xs: 24 };

  const carStyle = {
    borderRadius: 10,
    boxShadow: "0 .5rem 1.2rem rgba(189,197,209,.2)",
    wordWrap: "break-word",
    border: "1px solid #e7eaf3",
  };

  const renderTxIns = (txData) => {
    return (
      <List
        size="default"
        itemLayout="vertical"
        header={<strong>TxIns</strong>}
        dataSource={txData.txIns}
        renderItem={(item) => {
          return (
            <List.Item>
              <Row gutter={[20]} justify="start">
                <Col span={20}>
                  {item.txOutId == "" ? (
                    "Coinbase Transactions"
                  ) : (
                    <>
                      <a href={`/tx/${item.txOutId}`}>{item.txOutId}</a>
                      <br />
                      Signature
                      <br />
                      <span style={{ fontWeight: 700 }}>
                        {item.signature}{" "}
                      </span>{" "}
                    </>
                  )}
                </Col>
              </Row>
            </List.Item>
          );
        }}
      />
    );
  };

  const renderTxOuts = (txData) => {
    return txData.txOuts.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <Col span={14}>
            <a href={`/address/${item.address}`}>{item.address}</a>
          </Col>
          <Col
            span={10}
            style={{ textAlign: "right", fontSize: 20, fontWeight: 700 }}
          >
            {item.amount}{" "}
            <img
              src="https://cdn.financialintelligencecoin.com/coins/fig.png"
              width={25}
            />
          </Col>
        </React.Fragment>
      );
    });
  };

  return (
    <AppLayout>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Card style={carStyle}>
            <h1>
              Tx Details - <small> {data.id}</small>
            </h1>
            <Row justify="space-between" gutter={[20, 20]}>
              <Col xl={11} lg={11} md={24} sm={24} xs={24}>
                {renderTxIns(data)}
              </Col>
              <Col xl={11} lg={11} md={24} sm={24} xs={24}>
                <Row align="middle">
                  <Col span={24}>
                    <h1>Amounts</h1>
                  </Col>

                  {renderTxOuts(data)}
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </AppLayout>
  );
};

TransactionDetails.getInitialProps = async ({ query }) => {
  const { txId } = query;
  const { data } = await axios.get(`${backend}transaction/${txId}`);

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    data,
  };
};

export default TransactionDetails;
