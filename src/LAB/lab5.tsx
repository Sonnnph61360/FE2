import { Table, Image, Spin, Input, Button } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Story {
    id: number;
    title: string;
    author: string;
    description: string;
    image: string;
    createdAt: string;
}

function Lab5() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery<Story[]>({
        queryKey: ["stories"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3000/stories");
            return res.data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`http://localhost:3000/stories/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["stories"] });
        },
    });

    const filteredData = data?.filter((item) =>
        item.title.toLowerCase().includes(keyword.toLowerCase())
    );

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            render: (url: string) => <Image src={url} width={60} />,
        },
        {
            title: "Tên truyện",
            dataIndex: "title",
        },
        {
            title: "Tác giả",
            dataIndex: "author",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (date: string) =>
                new Date(date).toLocaleDateString("vi-VN"),
        },
        {
            title: "Action",
            render: (_: any, record: Story) => (
                <div style={{ display: "flex", gap: 8 }}>
                    <Button
                        type="primary"
                        onClick={() => navigate(`/edit/${record.id}`)}
                    >
                        Edit
                    </Button>

                    <Button
                        danger
                        onClick={() => deleteMutation.mutate(record.id)}
                    >
                        Xóa
                    </Button>
                </div>
            ),
        },
    ];

    if (isLoading) return <Spin />;

    if (isError) return <p>Lỗi khi tải dữ liệu</p>;

    return (
        <div style={{ padding: 20 }}>
            <h2>Danh sách truyện</h2>

            <Input
                placeholder="Tìm theo tên truyện..."
                style={{ width: 300, marginBottom: 20 }}
                onChange={(e) => setKeyword(e.target.value)}
            />

            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
}

export default Lab5;