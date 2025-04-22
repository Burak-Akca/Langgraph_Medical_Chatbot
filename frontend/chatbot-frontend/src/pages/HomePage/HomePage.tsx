import NavigationBar from "../../components/NavigationBar";
import Main from "../../components/Main";
import HomeDrawer from "../../pages/HomePage/HomeDrawer";

function Home() {
  return (
    <div>
      <NavigationBar />
    <HomeDrawer /> 
      <Main />
    </div>
  );
}

export default Home;
