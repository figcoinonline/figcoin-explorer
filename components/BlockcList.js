import { useState } from "react";
import { List, Typography, Divider, Row, Col, Tooltip } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import axios from "axios";

const BlockchainList = ({
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
      header={<strong>Latest Blocks</strong>}
      dataSource={blockchain}
      renderItem={(item) => (
        <List.Item>
          <Row justify="space-between" align="middle">
            <Col xl={6} lg={6} md={8} sm={8} xs={8}>
              <Row gutter={[10]}>
                <Col xl={8} lg={0} md={0} sm={0} xs={0}>
                  <Avatar shape="square" style={{ borderRadius: 10 }} size={40}>
                    BK
                  </Avatar>
                </Col>

                <Col xl={14} lg={12} md={14} sm={18} xs={18}>
                  <Row>
                    <Col span={24}>
                      <a href={`/block/${item.hash}`}>{item.index}</a>
                    </Col>
                    <Col span={24}>
                      <small>{moment(item.timestamp * 1000).fromNow()}</small>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xl={14} lg={12} md={12} sm={12} xs={12}>
              <Row>
                <Col span={24}>
                  Hash{" "}
                  <a href={`/block/${item.hash}`}>
                    {item.hash.substring(0, 40)}...
                  </a>
                </Col>
              </Row>
            </Col>
            <Col
              xl={4}
              lg={4}
              md={0}
              sm={4}
              xs={4}
              style={{ textAlign: "right" }}
            >
              Tx Count <br />{" "}
              <span style={{ fontWeight: 700 }}>
                +{!item.data[1] ? 1 : item.data[1].txIns.length}
              </span>
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};

export default BlockchainList;
