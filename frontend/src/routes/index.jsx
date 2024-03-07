import {
  Route,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Root from "../components/Root";
import Posts from "../components/Posts";
import Signup from "../components/Signup";

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<Signup />} />
      <Route path="posts" element={<Posts />} />
    </Route>
  )
);

export default router;
