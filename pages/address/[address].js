import { List, Row, Col, Card } from "antd";
import AppLayout from "../../components/core/AppLayout";
import { backend } from "../../core/urls";
import moment from "moment";
import axios from "axios";
import * as _ from "lodash";

const WalletDetails = ({ data, balance, address, grouped }) => {
  const responsive = { xl: 12, lg: 14, md: 24, sm: 24, xs: 24 };

  const carStyle = {
    borderRadius: 10,
    boxShadow: "0 .5rem 1.2rem rgba(189,197,209,.2)",
    wordWrap: "break-word",
    border: "1px solid #e7eaf3",
  };

  const renderUnspentTxOuts = (wallet) => {
    return (
      <List
        size="default"
        itemLayout="vertical"
        header={
          <strong>
            Unspent TxOuts - {balance && balance.balance} FIG Coin
          </strong>
        }
        dataSource={wallet.unspentTxOuts}
        renderItem={(item) =>
          item.amount > 0 && (
            <List.Item>
              <Row gutter={[20]} justify="space-around">
                <Col span={18}>
                  <a href={`/tx/${item.txOutId}`}>{item.txOutId}</a>
                </Col>

                <Col span={6} style={{ textAlign: "right" }}>
                  <span style={{ fontWeight: 700 }}>
                    {item.amount}{" "}
                    <img
                      src="https://cdn.financialintelligencecoin.com/coins/fig.png"
                      width={25}
                    />
                  </span>
                </Col>
              </Row>
            </List.Item>
          )
        }
      />
    );
  };
  console.log(grouped, "grouped");
  return (
    <AppLayout>
      <Row style={{ marginBottom: 20 }}></Row>

      <Row gutter={[20, 20]}>
        <Col {...responsive}>
          <Card style={carStyle}>
            <h3>
              Address : <span style={{ fontWeight: 700 }}>{address}</span>
            </h3>
            {renderUnspentTxOuts(data)}
          </Card>
        </Col>
      </Row>
    </AppLayout>
  );
};

WalletDetails.getInitialProps = async ({ query }) => {
  const { address } = query;
  const { data } = await axios.get(`${backend}address/${address}`);

  //grup datası görünecek
  var grouped = _.mapValues(_.groupBy(data.unspentTxOuts, "amount"), (clist) =>
    clist.map((txOut) => _.omit(txOut, "amount"))
  );

  if (!data) {
    return {
      notFound: true,
    };
  }

  const balanceres = await fetch(`${backend}balance/${address}`);
  const balance = await balanceres.json();

  return {
    data,
    balance,
    address,
    grouped,
  };
};

export default WalletDetails;
