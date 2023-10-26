import ChooseFigurePage from "../pages/choose-figure";
import ErrorPage from "../pages/error"
import HomePage from "../pages/home"
import SummaryPage from "../pages/summary";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/choose-figure",
    element: <ChooseFigurePage />,
  },
  {
    path: "/summary",
    element: <SummaryPage />,
  },
  {
    path: "/website-problem",
    element: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];