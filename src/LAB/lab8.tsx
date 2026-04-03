import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Form, Input, Button, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
interface AuthState {
    user: any;
    token: string | null;

    setUser: (data: { user: any; token: string }) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,

            setUser: ({ user, token }) => {
                set({ user, token });
            },

            logout: () => {
                set({ user: null, token: null });
            },
        }),
        {
            name: "auth-storage",
        }
    )
);
const Header = () => {
    const { user, logout } = useAuthStore();

    return (
        <div style={{ padding: 20, borderBottom: "1px solid #ccc" }}>
            {user ? (
                <>
                    <span>Đã đăng nhập: {user.email}</span>
                    <Button danger onClick={logout} style={{ marginLeft: 10 }}>
                        Logout
                    </Button>
                </>
            ) : (
                <span>Chưa đăng nhập</span>
            )}
        </div>
    );
};
const Login = () => {
    const { setUser } = useAuthStore();

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: any) => {
            return await axios.post("http://localhost:3000/login", values);
        },

        onSuccess: ({ data }) => {
            setUser({
                user: data.user,
                token: data.accessToken,
            });

            message.success("Login thành công");
        },

        onError: () => {
            message.error("Sai tài khoản");
        },
    });

    const onFinish = (values: any) => {
        mutate(values);
    };

    return (
        <Form onFinish={onFinish} layout="vertical" style={{ maxWidth: 400 }}>
            <h3>Login</h3>

            <Form.Item name="email" rules={[{ required: true }]}>
                <Input placeholder="Email" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true }]}>
                <Input.Password placeholder="Password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={isPending} block>
                Login
            </Button>
        </Form>
    );
};

const Register = () => {
    const { setUser } = useAuthStore();

    const { mutate, isPending } = useMutation({
        mutationFn: async (values: any) => {
            return await axios.post("http://localhost:3000/register", values);
        },

        onSuccess: async () => {
            message.success("Đăng ký thành công");

            // tự login luôn
            const res = await axios.post("http://localhost:3000/login", {
                email: form.getFieldValue("email"),
                password: form.getFieldValue("password"),
            });

            setUser({
                user: res.data.user,
                token: res.data.accessToken,
            });
        },
    });

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        mutate(values);
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            style={{ maxWidth: 400 }}
        >
            <h3>Register</h3>

            <Form.Item name="username" rules={[{ required: true }]}>
                <Input placeholder="Username" />
            </Form.Item>

            <Form.Item name="email" rules={[{ required: true }]}>
                <Input placeholder="Email" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true }]}>
                <Input.Password placeholder="Password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={isPending} block>
                Register
            </Button>
        </Form>
    );
};
function Lab8() {
    return (
        <div style={{ padding: 20 }}>
            <h2>Lab 8 - Zustand Auth</h2>

            <Header />

            <div style={{ display: "flex", gap: 50, marginTop: 20 }}>
                <Login />
                <Register />
            </div>
        </div>
    );
}

export default Lab8;