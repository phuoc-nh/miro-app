import { Room } from "@/components/Room"
import { Canvas } from "./_components/canvas"
import { Loading } from "./_components/Loading"

interface BoardIdPageProps {
    params: {
        boardId: string
    }
}

const BoardIdPage = ({params}: BoardIdPageProps) => {
    // return <Loading></Loading>
    return (
        <Room roomId={params.boardId} fallback={<Loading></Loading>}>
            <Canvas boardId={params.boardId}></Canvas>
        </Room>
            
    )
}

export default BoardIdPage