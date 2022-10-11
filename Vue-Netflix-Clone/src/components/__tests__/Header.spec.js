import Header from "../Header.vue"
import { render } from "@testing-library/vue";
describe("Header", () => {
    it("Should render a navigation button", () => {
        const { getByText } = render(Header);
        const button = getByText("Sign In");
        expect(button).toBeTruthy();
    })
})