import Lottie from "lottie-react";
import deliveryVan from "../assets/van.json"
import deliveryBike from "../assets/bike.json"
import clouds from "../assets/white-clouds.json"

const Banner = () => {
    return (
        <div>
                <div className="md:h-[100px] h-[50px]">
                    <Lottie className=" w-full" animationData={clouds} />
                </div>
                <div className="flex gap-4 items-center justify-around">
                    <Lottie className="md:h-[300px] h-[250px]" animationData={deliveryVan} />
                    <Lottie className="md:h-[280px] h-[250px]" animationData={deliveryBike} />
                </div>
            </div>
    );
};

export default Banner;