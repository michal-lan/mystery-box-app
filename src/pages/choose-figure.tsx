import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import MinifigsChooseList from '../components/MinifigsChooseList';

const ChooseFigurePage = () => {
  const navigate = useNavigate();
  const {currentMinifigs, currentMSelectedMinifig} = useSelector((state : RootState) => state.minifigsReducer)

  // prevent access to this page without redux state from step one
  useEffect(() => {
    if ( currentMinifigs === null ) {
      navigate("/");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // navigate to step three only if minifig is selected
  const handleClick = () => {
    if ( currentMSelectedMinifig !== null ) {
      navigate("/summary");
    }
  }

  return (
    <div className="flex flex-col items-center">
        <h1 className="text-4xl font-extrabold uppercase font-open-sans">Choose your minifig</h1>

        { currentMinifigs && ( <MinifigsChooseList minifigs={currentMinifigs} /> )}

        <button type="button" disabled={currentMSelectedMinifig ? false : true } onClick={handleClick} className="px-6 py-2 mt-12 text-lg font-bold uppercase transition duration-300 ease-in-out rounded-full hover:bg-btn-hover font-poppins bg-btn-default">Proceed to shipment</button>
    </div>
  )
}

export default ChooseFigurePage;