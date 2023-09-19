import { useParams } from "react-router"
import useWebRTC, { LOCAL_VIDEO } from "../../hooks/useWebRTC";

function layout(clientsNumber = 1) {
    const pairs = Array.from({length: clientsNumber})
    .reduce((acc, next, index, arr) => {
        if (index % 2 === 0) {
            acc.push(arr.slice(index, index+2));
        }

        return acc;
    }, [])

    const rowsNumber = pairs.length;
    const height = `${100/ rowsNumber}%`;

    return pairs.map((row, index, arr) => {
        if (index == arr.length - 1 && row.length === 1) {
            return [{
                width: '100%',
                height,
            }]
        }
        return row.map(() => ({
            width: '50%',
            height,
        }));
    }).flat();
}

export default function Room() {
    const {id: roomId} = useParams();
    const {clients, provideMediaRef} = useWebRTC(roomId);
    const videoLayout = layout(clients.length);

    return(
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            height: '100vh',
        }}>
            {clients.map((clientId, index) => {
                return(
                <div key={clientId} style={videoLayout[index]}>
                    <video
                        height='100%'
                        width='100%'
                        ref={instance =>{
                            provideMediaRef(clientId, instance);
                        }}
                        autoPlay
                        playsInline
                        muted={clientId === LOCAL_VIDEO}
                    />
                </div>
                )
            })}
        </div>
    )
}