import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import Title from "antd/lib/skeleton/Title";
import Link from "next/link";
import { Row, Col } from "antd";

const AppLayout = ({ children }) => {
  const year = new Date().getFullYear();
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <Row justify="space-between" align="middle">
          <Col xl={8} lg={10} md={10} sm={10} xs={10}>
            <Link href="/">
              <img src="/imgs/explorer.png" height="50px" />
            </Link>
          </Col>
          <Col xl={8} lg={0} md={0} sm={0} xs={0} align="center">
            <h2 style={{ color: "white" }}>
              Blockchain Solution for Game Payments
            </h2>
          </Col>
          <Col xl={8} lg={10} md={0} sm={0} xs={0} align="right">
            <Link href="/">
              <img src="/imgs/gumus.png" height="50px" />
            </Link>
          </Col>
        </Row>
      </Header>
      <Content className="site-layout" style={{ marginTop: 50 }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 600 }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        © FigCoin Explorer {year}{" "}
      </Footer>
    </Layout>
  );
};

export default AppLayout;
