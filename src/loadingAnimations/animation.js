import Lottie from "react-lottie";
import animationData from './96439-loading-bank.json';

const LottieAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRation: 'xMidYMid slice'
    }
  };
  
  return (
    <Lottie
      options={defaultOptions}
      height={400}
      width={400}
    ></Lottie>
  );
}

export default LottieAnimation;