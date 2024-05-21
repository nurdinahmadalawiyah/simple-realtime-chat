import {useEffect, useState} from 'react';
import useSocket from '../hooks/useSocket';
import {
    Avatar, AvatarIcon,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Input,
} from "@nextui-org/react";
import ChatMessage from "@/components/ChatMessage";

export default function Home() {
    const [username, setUsername] = useState('');
    const [isUsernameSet, setIsUsernameSet] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socket = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on('message', (msg) => {
                console.log('Received message:', msg);
                setMessages((prevMessages) => [...prevMessages, msg]);
            });
        }
    }, [socket]);

    const handleSetUsername = () => {
        if (username.trim()) {
            setIsUsernameSet(true);
        }
    };

    const sendMessage = () => {
        if (message && socket) {
            console.log('Sending message:', {username, message});
            const timestamp = new Date().toISOString();
            socket.emit('message', {username, message, timestamp});
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 h-screen">
            {!isUsernameSet ? (
                <Card className="min-w-96">
                    <CardHeader className="flex gap-3">
                        <h4 className="font-bold text-large">Enter Your Username</h4>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                    <Input
                        type="text"
                        size="lg"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </CardBody>
                    <CardFooter>
                        <Button color="primary" onClick={handleSetUsername} fullWidth>
                            <p className="font-bold">Join Chat</p>
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <Card className="min-w-full min-h-full">
                    <CardHeader className="flex gap-3">
                        <Avatar isBordered icon={<AvatarIcon/>} />
                        <h4 className="font-bold text-large">Group Chat</h4>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        {messages.map((msg, index) => (
                            <ChatMessage
                                key={index}
                                username={msg.username}
                                message={msg.message}
                                timestamp={msg.timestamp}
                                isOwnMessage={msg.username === username}
                            />
                        ))}
                    </CardBody>
                    <CardFooter className="flex gap-3">
                        <Input
                            type="text"
                            size="lg"
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button onClick={sendMessage} color="primary" radius="full" size="md">
                            Send
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}