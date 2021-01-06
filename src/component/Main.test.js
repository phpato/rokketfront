import { render, screen } from '@testing-library/react';
import Main from './Main';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

enzyme.configure({ adapter: new Adapter() });
test('renders button text for creation', () => {
  render(<Main />);
  const linkElement = screen.getByText(/Crear/i);
  expect(linkElement).toBeInTheDocument();
});

describe("Form", () => {
  it("Should test visible form to add a new book", () => {
    const wrapper = shallow(<Main />);
    const firstButton = wrapper.find("button").at(0);
    firstButton.simulate("click");
    expect(wrapper.state().adding).toEqual(true);
  });

  it("Should test validate and show errors when submit form of book ", () => {
    let wrapper = shallow(<Main />);
    const createButton = wrapper.find("button").at(0);
    createButton.simulate("click");
    wrapper.setState({ book: { title: "", author: "", description: "" } })
    const saveButton = wrapper.find("button").at(1);
    saveButton.simulate("click");
    wrapper.instance().formAddBook({ 
      preventDefault: () => {
    }});
    expect(wrapper.state().errors).toEqual(["Debe ingresar un titulo", "Debe ingresar un autor", "Debe ingresar una descripcion"]);
  });

  it("Should test validate and show no erros when submit form of book ", () => {
    let wrapper = shallow(<Main />);
    const createButton = wrapper.find("button").at(0);
    createButton.simulate("click");
    wrapper.setState({ book: { title: "El idiota", author: "Dostoievski", description: "a good book" } })
    const saveButton = wrapper.find("button").at(1);
    saveButton.simulate("click");
    wrapper.instance().formAddBook({ 
      preventDefault: () => {
    }});
    expect(wrapper.state().errors).toEqual([]);
  });

  
});
