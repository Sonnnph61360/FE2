import { Table, Button } from "antd";

function List() {

  // Bài 1 - STUDENT
  const studentColumns = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Age", dataIndex: "age" },
    { title: "Major", dataIndex: "major" },
  ];

  const studentData = [
    { key: 1, id: 1, name: "Nam", age: 20, major: "IT" },
    { key: 2, id: 2, name: "Linh", age: 21, major: "Business" },
    { key: 3, id: 3, name: "Ha", age: 19, major: "Design" },
  ];


  // Bài 2 - PRODUCT
  const productColumns = [
    { title: "ID", dataIndex: "id" },
    { title: "Product Name", dataIndex: "name" },
    { title: "Price", dataIndex: "price" },
    { title: "Category", dataIndex: "category" },
  ];

  const productData = [
    { key: 1, id: 1, name: "Laptop", price: 1500, category: "Electronics" },
    { key: 2, id: 2, name: "Phone", price: 800, category: "Electronics" },
    { key: 3, id: 3, name: "Shoes", price: 120, category: "Fashion" },
    { key: 4, id: 4, name: "Backpack", price: 60, category: "Accessories" },
    { key: 5, id: 5, name: "Watch", price: 300, category: "Fashion" },
  ];


  // Bài 3 - USER MANAGEMENT
  const userColumns = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <span style={{ color: status === "active" ? "green" : "red" }}>
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      render: () => (
        <>
          <Button type="primary" style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button danger>Delete</Button>
        </>
      ),
    },
  ];

  const userData = [
    { key: 1, id: 1, name: "Nguyen Van A", email: "a@gmail.com", status: "active" },
    { key: 2, id: 2, name: "Tran Van B", email: "b@gmail.com", status: "inactive" },
    { key: 3, id: 3, name: "Le Van C", email: "c@gmail.com", status: "active" },
  ];



  return (
    <div style={{ padding: 20 }}>
      <h2>Danh sách sinh viên</h2>
      <Table columns={studentColumns} dataSource={studentData} />
      <h2 style={{ marginTop: 40 }}>Danh sách sản phẩm</h2>
      <Table
        columns={productColumns}
        dataSource={productData}
        pagination={{ pageSize: 3 }}
      />
      <h2 style={{ marginTop: 40 }}>Quản lý người dùng</h2>
      <Table columns={userColumns} dataSource={userData} />

    </div>
  );
}

export default List;