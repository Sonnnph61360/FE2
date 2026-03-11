import { Layout, Menu, Form, Input, Button, Table, Modal } from "antd";
import { useState } from "react";

const { Header, Sider, Content } = Layout;

function App() {
  const [open, setOpen] = useState(false);

  const data = [
    { key: 1, name: "Nguyen Van A", email: "a@gmail.com", role: "Admin" },
    { key: 2, name: "Tran Van B", email: "b@gmail.com", role: "User" },
  ];

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "role" },
  ];
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu
          theme="dark"
          items={[
            { key: "1", label: "Dashboard" },
            { key: "2", label: "Users" },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ color: "white" }}>Dashboard</Header>
        <Content style={{ padding: 20 }}>

          {/* Bài 2: Form đăng ký */}
          <h2>Register</h2>
          <Form onFinish={onFinish} style={{ width: 300 }}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>

            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>

            <Form.Item name="password" label="Password">
              <Input.Password />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>

          <br />
          {/* Bài 4: Button mở modal */}
          <Button type="primary" onClick={() => setOpen(true)}>
            Add User
          </Button>
          {/* Bài 3: Table */}
          <Table
            columns={columns}
            dataSource={data}
            style={{ marginTop: 20 }}
          />

          {/* Modal */}
          <Modal
            title="Add User"
            open={open}
            footer={null}
            onCancel={() => setOpen(false)}
          >
            <Form onFinish={onFinish}>
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>

              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>

              <Form.Item name="role" label="Role">
                <Input />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form>
          </Modal>

        </Content>
      </Layout>
    </Layout>
  );
}

export default App;