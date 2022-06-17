import './Home.css';

const Home = () => {
    return (
        <section className="flex flex-col items-center">
            <img src="./postbank-logo.png" alt="Postbank logo" className="absolute w-1/4 top-56 z-10" />
            <h2 className="home-subheading absolute text-6xl text-center font-bold italic black z-10">Solutions for your tomorrow.</h2>

            <div className="home bg-red-300"></div>
        </section>
    );
}

export default Home;