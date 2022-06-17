const Footer = () => {
    return (
        <footer className="min-w-full h-16 flex flex-col justify-center bg-slate-400">
            <nav className="px-20 flex text-lg justify-between items-center">
                <img src="./postbank-logo.png" alt="logo" className="w-44" />

                <ul className="w-1/3 flex justify-evenly">
                    <li>Facebok</li>
                    <li>Instagram</li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;