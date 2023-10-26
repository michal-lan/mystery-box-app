import { useSelector, useDispatch } from 'react-redux'
import getThreeRandomFigures from "../api/get-three-random-figures"
import { RootState } from '../redux/store';
import { setCurrentMinifigs } from '../redux/minifigs/minifigs.actions';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentMinifigs} = useSelector((state : RootState) => state.minifigsReducer)

  const handleClick = async () => {
    let allowForStepTwo = false;

    // if redux store has not minifigs stored - try to download it from api, if it has - navigate to step 2
    if ( currentMinifigs === null ) {
      const figures = await getThreeRandomFigures();

      // if figures array is not empty - store data in Redux
      if ( figures.length > 0 ) {
        dispatch(setCurrentMinifigs(figures));
        allowForStepTwo = true;
      } else {
        console.error('error while downloading..')
      }
    } else {
      allowForStepTwo = true;
    }

    // if user is allowed for step 2 - redirect there 
    // if not, navigate to page with api problem information
    if ( allowForStepTwo ) {
      navigate("/choose-figure");
    } else {
      navigate("/website-problem");
    }
  }

  return (
    <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold uppercase font-open-sans">Lego minifigs mystery box</h1>
        <button type="button" onClick={handleClick} className="px-6 py-2 mt-12 text-lg font-bold uppercase transition duration-300 ease-in-out rounded-full hover:bg-btn-hover font-poppins bg-btn-default">Let's go!</button>
    </div>
  )
}