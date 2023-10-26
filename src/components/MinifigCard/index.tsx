import { MinifigCardProps, MinifigProps } from "../../types/components/MinifigCard/minifig-card.type"
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store';
import { setSelectedMinifig } from '../../redux/minifigs/minifigs.actions';

export default function MinifigCard( {minifig} : MinifigCardProps ) {
    const dispatch = useDispatch();
    const {currentMinifigs, currentMSelectedMinifig} = useSelector((state : RootState) => state.minifigsReducer);

    const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
        const getFigureID = e.currentTarget.getAttribute("data-id");

        if ( typeof getFigureID === 'string' && Array.isArray(currentMinifigs) && currentMinifigs.length ) {
            const selectedFigureObject = currentMinifigs.filter((fig : MinifigProps) => fig.set_num === getFigureID)[0];
            dispatch(setSelectedMinifig(selectedFigureObject));
        }
    }

    const isSelected = ( minifigNum : string | undefined ) => {
        if ( minifigNum && currentMSelectedMinifig && currentMSelectedMinifig.hasOwnProperty('set_num') && minifigNum === currentMSelectedMinifig.set_num ) return true;
        return false;
    }

    return (
        <>
            { minifig ? (
                <div className={`bg-white h-full rounded-2xl text-black px-4 py-6 text-center col-span-12 lg:col-span-4 flex flex-col justify-center items-center hover:cursor-pointer border-4 ${isSelected(minifig.set_num) ? 'border-btn-default shadow-xl shadow-btn-default' : 'border-transparent hover:shadow-gray-800 hover:shadow-xl' }`} data-id={minifig.set_num} onClick={handleClick}>
                    <img src={minifig.set_img_url} alt={minifig.name} width="96" height="96" className="object-contain w-24 h-24" />
                    <span className="mt-4 mb-6 text-base font-semibold font-poppins">{minifig.name}</span>
                    <a href={minifig.set_url} target="_blank" rel="noreferrer" className="text-sm font-medium text-link-color font-poppins hover:text-link-color-hover">Show details</a>
                </div>
            ) : ''}
        </>
    )
}