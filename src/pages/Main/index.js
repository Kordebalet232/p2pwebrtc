import { useState, useEffect, useRef } from "react";
import socket from "../../socket"
import ACTIONS from "../../socket/actions";
import {v4} from 'uuid'
import { useNavigate } from "react-router";

export default function Main() {
    const navigate = useNavigate()
    const [rooms, updateRooms] = useState([]);
    const rootNode = useRef();

    useEffect(() => {
        socket.on(ACTIONS.SHARE_ROOMS, ({rooms = []} = {}) => {
            if (rootNode.current) {
                updateRooms(rooms);
            }
        });
    }, [])
    
    return(
        <div>
            <h1>Available Rooms</h1>

            <ul>
                {rooms.map(roomId => (
                    <li key={roomId}>
                        {roomId}
                        <button onClick={() =>{
                            navigate(`/room/${roomId}`)
                        }}>JOIN ROOM</button>
                    </li>
                ))}
            </ul>

            <button onClick={() => {
                navigate(`/room/${v4()}`)
            }}>Create New Room</button>
        </div>
    )
}