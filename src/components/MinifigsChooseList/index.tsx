import { MinifigsChooseListProps } from "../../types/components/MinifigsChooseList/minifigs-choose-list.type"
import MinifigCard from "../MinifigCard"

export default function MinifigsChooseList( {minifigs} : MinifigsChooseListProps ) {  
    return (
        <div className="grid items-center justify-center grid-cols-12 mt-12 gap-y-10 lg:gap-x-6">
            { minifigs.length ? (
                minifigs.map((minifig) => (<MinifigCard key={minifig.set_num} minifig={minifig} />))
            ) : 
                '<p className="col-span-12">Due to an unexpected error we cannot show minifigs</p>'
            }
        </div>
    )
}