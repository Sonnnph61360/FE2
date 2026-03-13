import { Form, Input, Button, InputNumber } from "antd";

function Lab3() {

    const onFinish = (values: any) => {
        console.log(values);
    };

    return (
        <div style={{ padding: 20 }}>
            {/* Bài 1 */}
            <h2>Form Login</h2>

            <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 400 }}>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Vui lòng nhập email" },
                        { type: "email", message: "Email không đúng định dạng" }
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: "Vui lòng nhập password" }
                    ]}>
                    <Input.Password />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Login
                </Button>

            </Form>

            {/* BÀI 2 */}

            <h2 style={{ marginTop: 50 }}>Form Register</h2>

            <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 400 }}>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: "Nhập tên" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Nhập email" },
                        { type: "email", message: "Email không hợp lệ" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                        { required: true, message: "Nhập số điện thoại" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: "Nhập password" },
                        { min: 6, message: "Password tối thiểu 6 ký tự" }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirm"
                    rules={[
                        { required: true, message: "Xác nhận password" }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Register
                </Button>

            </Form>



            {/* BÀI 3 */}
            <h2 style={{ marginTop: 50 }}>Add Product</h2>
            <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 400 }}>

                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: "Nhập tên sản phẩm" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: "Nhập giá" }]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    label="Quantity"
                    name="quantity"
                    rules={[{ required: true, message: "Nhập số lượng" }]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Add Product
                </Button>

            </Form>

        </div>
    );
}

export default Lab3;