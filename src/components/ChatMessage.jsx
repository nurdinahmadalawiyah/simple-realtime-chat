import {Card, CardBody} from "@nextui-org/react";

export default function ChatMessage({username, message, isOwnMessage, timestamp}) {
    const formattedTime = new Date(timestamp).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    return (
        <div className={`${isOwnMessage ? 'flex justify-end' : 'flex justify-start'} m-2`}>
            <Card className={`${isOwnMessage ? 'bg-blue-600' : 'bg-black'}`}>
                <CardBody>
                    {!isOwnMessage && <p className="text-small text-blue-500">{username}</p>}
                    <div className="flex flex-row justify-between items-end">
                        <p className="text-medium">{message}</p>
                        <p className="text-xs text-gray-400 pl-2">{formattedTime}</p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
