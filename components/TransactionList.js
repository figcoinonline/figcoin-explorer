import {
  List,
  Typography,
  Divider,
  Row,
  Col,
  Tooltip,
  Badge,
  Statistic,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";

const findFromUser = (block) => {
  let user = "Coinbase";

  if (block.data.length !== 2) {
    return user;
  } else {
    return block.data[1].txOuts[1]?.address;
  }
};

const findToUser = (block) => {
  let data = block.data[0].txOuts[0];

  if (block.data.length === 1) {
    return {
      toUser: data.address,
      amount: data.amount,
    };
  } else {
    return {
      toUser: block.data[1].txOuts[0].address,
      amount: block.data[1].txOuts[0].amount,
    };
  }
};

const TransactionList = ({
  blockchain,
  onPageChange,
  currentPage,
  totalSize,
}) => {
  return (
    <List
      size="default"
      itemLayout="vertical"
      pagination={{
        defaultCurrent: 1,
        current: currentPage,
        onChange: onPageChange,
        total: totalSize,
      }}
      header={<strong>Latest Transactions</strong>}
      // footer={<div>Footer</div>}
      dataSource={blockchain}
      renderItem={(item) => {
        let fromUser = findFromUser(item);
        let toUser = findToUser(item);
        return (
          <List.Item>
            <Row justify="space-between" align="middle" gutter={[10, 10]}>
              <Col xl={6} lg={4} md={4} sm={18} xs={18}>
                <Row gutter={[10]}>
                  <Col xl={8} lg={0}>
                    <Avatar
                      shape="square"
                      style={{ borderRadius: 10 }}
                      size={40}
                    >
                      TS
                    </Avatar>
                  </Col>
                  <Col span={16}>
                    <Row>
                      <Col span={24}>
                        {fromUser == "Coinbase" ? (
                          "Coinbase"
                        ) : (
                          <Tooltip title={item.data[0].id}>
                            <a href={`/tx/${item.data[0].id}`}>
                              {item.data[0].id.substring(0, 10)}...
                            </a>
                          </Tooltip>
                        )}
                      </Col>
                      <Col span={24}>
                        <small>{moment(item.timestamp * 1000).fromNow()}</small>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col xl={14} lg={12} md={14} sm={18} xs={18}>
                <Row>
                  <Col span={24}>
                    From :{" "}
                    {fromUser == "Coinbase" ? (
                      "Coinbase"
                    ) : (
                      <Tooltip title={fromUser}>
                        <a href={`/address/${fromUser}`}>
                          <span style={{ fontWeight: 700 }}>{fromUser}...</span>
                        </a>
                      </Tooltip>
                    )}
                  </Col>
                  <Col span={24}>
                    To :{" "}
                    <Tooltip title={toUser.toUser}>
                      <a href={`/address/${toUser.toUser}`}>
                        <span style={{ fontWeight: 700 }}>
                          {toUser.toUser.substring(0, 30)}...
                        </span>
                      </a>
                    </Tooltip>
                  </Col>
                </Row>
              </Col>
              <Col
                xl={4}
                lg={4}
                md={4}
                sm={6}
                xs={6}
                style={{ textAlign: "right" }}
              >
                <span style={{ fontWeight: 700 }}>{toUser.amount}</span>{" "}
                <img
                  src="https://cdn.financialintelligencecoin.com/coins/fig.png"
                  width={25}
                />
              </Col>
            </Row>
          </List.Item>
        );
      }}
    />
  );
};

export default TransactionList;
