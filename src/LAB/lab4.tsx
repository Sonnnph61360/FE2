import { Form, Input, Button, Checkbox, Table } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

function Lab4() {

    const { data, refetch } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3000/categories");
            return res.data;
        }
    });

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const res = await axios.post(
                "http://localhost:3000/categories",
                data
            );
            return res.data;
        },

        onSuccess: () => {
            toast.success("Thêm danh mục thành công");
            refetch();
        },

        onError: () => {
            toast.error("Có lỗi xảy ra");
        }
    });

    const onFinish = (values: any) => {
        mutation.mutate(values);
    };


    const columns = [
        { title: "ID", dataIndex: "id" },
        { title: "Title", dataIndex: "title" },
        { title: "Description", dataIndex: "description" },
        {
            title: "Active",
            dataIndex: "active",
            render: (value: boolean) => (value ? "✔️ Active" : "❌ Inactive")
        }
    ];

    return (
        <div style={{ padding: 20 }}>

            <h2>Thêm danh mục</h2>

            <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 500 }}>

                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: "Nhập title" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name="active"
                    valuePropName="checked"
                >
                    <Checkbox>Active</Checkbox>
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={mutation.isPending}
                >
                    Thêm
                </Button>

            </Form>

            <h2 style={{ marginTop: 40 }}>Danh sách danh mục</h2>

            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
            />

        </div>
    );
}

export default Lab4;