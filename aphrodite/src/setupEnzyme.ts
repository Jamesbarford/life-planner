import { configure } from "enzyme";
import * as EnzymeAdapter from "enzyme-adapter-react-16";
/**
 * This sets up React with Enymze and TypeScript.
 */
configure({ adapter: new EnzymeAdapter() });
