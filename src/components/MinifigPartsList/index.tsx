import { MinifigPartsListProps } from "../../types/components/MinifigPartsList/minifig-parts-list.type"
import MinifigPart from "../MinifigPart"

export default function MinifigPartsList( {parts} : MinifigPartsListProps ) {
    return (
        <>
            { parts.length && (
                <div className="mb-8 text-base font-semibold text-black font-poppins">There are {parts.length} parts in minifig:</div>
            )}

            <div className="flex flex-col gap-8 lg:gap-2">
                { parts.length ? (
                    parts.map((part) => (<MinifigPart key={part.id} partItem={part} />))
                ) : 
                    '<p>Due to an unexpected error we cannot show minifigs</p>'
                }
            </div>
        </>
    )
}