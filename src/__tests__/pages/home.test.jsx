import { render, screen } from '../../test.utils';
import HomePage from '../../pages/home';

describe("Basic Tests", () => {
  it("should render main headline", () => {
    render(<HomePage />);
    expect(screen.getByText(/Lego minifigs mystery box/i)).toBeInTheDocument()
  })

  it("should render lets go button", () => {
    render(<HomePage />);
    const button = screen.getByText(/Let's go!/i);
    expect(button).toBeInTheDocument();
  })
})