import { Form, Input, Button, Spin, message } from "antd";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Story {
    id?: number;
    title: string;
    author: string;
    image?: string;
    description?: string;
}

const Lab6 = () => {
    const [form] = Form.useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["story", id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/stories/${id}`);
            return res.data;
        },
        enabled: !!id,
    });


    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
        }
    }, [data]);

    const mutation = useMutation({
        mutationFn: async (values: Story) => {
            return axios.put(`http://localhost:3000/stories/${id}`, values);
        },

        onSuccess: () => {
            message.success("Cập nhật thành công ✅");

            queryClient.invalidateQueries({ queryKey: ["stories"] });

            navigate("/lab5");
        },

        onError: () => {
            message.error("Cập nhật thất bại ❌");
        },
    });

    const onFinish = (values: Story) => {
        mutation.mutate(values);
    };

    if (isLoading) return <Spin />;

    return (
        <div style={{ padding: 20 }}>
            <h2>Cập nhật truyện</h2>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 500 }}
                disabled={isLoading}
            >
                <Form.Item
                    name="title"
                    label="Tên truyện"
                    rules={[{ required: true, message: "Nhập tên truyện" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="author"
                    label="Tác giả"
                    rules={[{ required: true, message: "Nhập tác giả" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="image" label="Ảnh URL">
                    <Input />
                </Form.Item>

                <Form.Item name="description" label="Mô tả">
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Button
                    type="primary"
                    htmlType="submit"
                    loading={mutation.isPending}
                >
                    Cập nhật
                </Button>
            </Form>
        </div>
    );
};

export default Lab6;