import { createContext, useContext, useState } from "react";
import { Avatar, Button } from "antd";

interface User {
    name: string;
    avatar: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

const Header = () => {
    const context = useContext(UserContext);
    if (!context) return null;

    const { user } = context;

    return (
        <div style={{ display: "flex", gap: 10, padding: 20 }}>
            {user ? (
                <>
                    <Avatar src={user.avatar} />
                    <span>{user.name}</span>
                </>
            ) : (
                <span>Chưa đăng nhập</span>
            )}
        </div>
    );
};

const Login = () => {
    const context = useContext(UserContext);
    if (!context) return null;

    const { setUser } = context;

    const handleLogin = () => {
        setUser({
            name: "Son đẹp trai 😎",
            avatar: "https://i.pravatar.cc/150",
        });
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div style={{ padding: 20 }}>
            <Button type="primary" onClick={handleLogin}>
                Login
            </Button>

            <Button danger onClick={handleLogout} style={{ marginLeft: 10 }}>
                Logout
            </Button>
        </div>
    );
};

function Lab7() {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <h2 style={{ padding: 20 }}>Lab 7 - Context API</h2>

            <Header />
            <Login />
        </UserContext.Provider>
    );
}

export default Lab7;