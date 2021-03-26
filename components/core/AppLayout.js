import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import Title from "antd/lib/skeleton/Title";
import Link from "next/link";

const AppLayout = ({ children }) => {
  const year = new Date().getFullYear();
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo">
          <Link href="/">
            <a>LOGO</a>
          </Link>
        </div>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 30px", marginTop: 50 }}
      >
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
