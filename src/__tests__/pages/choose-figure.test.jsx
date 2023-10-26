import { render, screen, waitFor } from '../../test.utils';
import { createMemoryHistory } from "history"
import ChooseFigurePage from '../../pages/choose-figure';

describe("Second Step Tests", () => {
  it("should render main headline", () => {
    render(<ChooseFigurePage />);
    expect(screen.getByText(/Choose your minifig/i)).toBeInTheDocument()
  })

  it("prevent access - should redirect to homePage, lack of data", async () => {
    const history = createMemoryHistory();
    render(<ChooseFigurePage />);

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/');
    }, {
      timeout: 2000,
    });
  })
})