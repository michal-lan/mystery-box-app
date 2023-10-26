import { MinifigPartProps } from "../../types/components/MinifigPart/minifig-part.type"

export default function MinifigPart( {partItem} : MinifigPartProps ) {
    return (
        <>
            { partItem.part ? (
                <div className="grid items-center justify-center grid-cols-12 mb-4 text-center sm:text-left">
                    <div className="col-span-12 sm:col-span-4">
                        <img src={partItem.part?.part_img_url} alt={partItem.part?.name} width="80" height="80" className="inline-block object-contain w-20 h-20 sm:block" />
                    </div>
                    <div className="flex flex-col col-span-12 sm:col-span-8">
                        <span className="text-base font-semibold text-black font-poppins">{partItem.part?.name}</span>
                        <a href={partItem.part?.part_url} target="_blank" rel="noreferrer" className="text-sm font-medium text-link-color font-poppins hover:text-link-color-hover">{partItem.part?.part_num}</a>
                    </div>
                </div>
            ) : ''}
        </>
    )
}