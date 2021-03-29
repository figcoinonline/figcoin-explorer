import { useEffect, useState } from "react";

import { w3cwebsocket as W3CWebSocket } from "websocket";
import BlockcList from "../components/BlockcList";
import CoinSpecs from "../components/CoinSpecs";
import { Col, Row, Layout, Card, Input } from "antd";
import TransactionList from "../components/TransactionList";
import Title from "antd/lib/skeleton/Title";

import { backend } from "../core/urls";
import AppLayout from "../components/core/AppLayout";
import axios from "axios";
import { useRouter } from "next/router";

const { Content, Header, Footer } = Layout;

const client = new W3CWebSocket(`${process.env.NEXT_PUBLIC_WS_ADDRESS}`);

const history = new Set();
const PAGE = 10;

const Index = ({ data }) => {
  const router = useRouter();

  const [blockchain, setBlockchain] = useState([]);
  const [lastBlock, setLastBlock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { Search } = Input;

  const onPageChange = async (current) => {
    if (!history.has(current)) {
      const { data } = await axios.get(`${backend}blocksOffset`, {
        params: {
          offset: current,
          page: PAGE,
        },
      });

      setBlockchain((prev) => [...prev, ...data.blocks]);
      history.add(current);
    }

    setCurrentPage(current);
  };

  useEffect(() => {
    setBlockchain(data.blocks);
    setLastBlock(data.blocks[0]);
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    setLoading(false);
  }, []);

  client.onmessage = (message) => {
    const wsData = JSON.parse(message.data);

    if (wsData.data) {
      if (wsData.type === 2) {
        setBlockchain((prev) => [...JSON.parse(wsData.data), ...prev]);
        setLastBlock(...JSON.parse(wsData.data));
      }
    }
  };

  const responsive = { xl: 12, lg: 12, md: 24, sm: 24, xs: 24 };

  const carStyle = {
    borderRadius: 10,
    boxShadow: "0 .5rem 1.2rem rgba(189,197,209,.2)",
    wordWrap: "break-word",
    border: "1px solid #e7eaf3",
  };

  const onSearch = async (value) => {
    const txResult = await axios
      .get(`/tx/${value}`)
      .then((result) => router.push(`/tx/${value}`))
      .catch(async (err) => {
        return await axios
          .get(`/address/${value}`)
          .then((result) => router.push(`/address/${value}`))
          .catch(async (err) => {
            return await axios
              .get(`/block/${value}`)
              .then((result) => router.push(`/block/${value}`))
              .catch((err) => console.log(err, "err"));
          });
      });
  };

  const stylingSearch = {
    backgroundImage: `url('/imgs/1.jpg')`,
    width: "100%",
    height: "100%",
    padding: 10,
    marginTop: 10,
  };

  return loading ? (
    "loading"
  ) : (
    <AppLayout>
      <Row justify="center" style={stylingSearch}>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <Search
            placeholder="Search for Wallet / Block / TxId"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: 20 }}>
        <Col span={24}>
          <CoinSpecs lastBlock={lastBlock} />
        </Col>
      </Row>

      <Row justify="center" gutter={[20, 20]}>
        <Col {...responsive}>
          <Card style={carStyle}>
            <BlockcList
              blockchain={blockchain}
              onPageChange={onPageChange}
              currentPage={currentPage}
              totalSize={data.totalBlocksSize}
            />
          </Card>
        </Col>
        <Col {...responsive}>
          <Card style={carStyle}>
            <TransactionList
              blockchain={blockchain}
              onPageChange={onPageChange}
              currentPage={currentPage}
              totalSize={data.totalBlocksSize}
            />
          </Card>
        </Col>
      </Row>
    </AppLayout>
  );
};

export async function getStaticProps(context) {
  const { data } = await axios.get(`${backend}blocksOffset`, {
    params: {
      offset: 1,
      page: PAGE,
    },
  });
  // const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Index;
