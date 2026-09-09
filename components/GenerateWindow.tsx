type GenerateWindowProps = {
    currentNum: string
    generateHandler: () => void
}

export default function GenerateWindow({currentNum, generateHandler}: GenerateWindowProps) {
    return (
        <div className="flex flex-col text-center">
            <h1 className="text-center font-title text-heading text-5xl mb-5">{currentNum}</h1>
            <button className="btn btn-primary btn-xl" onClick={generateHandler}>Generate!</button>
        </div>
    );
}