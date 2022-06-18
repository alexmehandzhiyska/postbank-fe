import './Home.css';

const Home = () => {
    return (
        <section className="flex flex-col items-center">
            <img src="./postbank-logo.png" alt="Postbank logo" className="absolute top-72 z-10 w-96" />
            <h2 className="home-subheading absolute text-6xl text-center font-bold italic black z-10">Solutions for your tomorrow.</h2>

            <div className="home"></div>
        </section>
    );
}

export default Home;